// app/api/views/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Veri dosyası yolu
const DATA_DIR = path.join(process.cwd(), 'data');
const VIEWS_FILE = path.join(DATA_DIR, 'views.json');

// Veri yapısı
interface ViewsStore {
  [blogId: string]: {
    count: number;
    ips: string[];
  };
}

// Dosya yazılabilir mi kontrol et ve oluştur
function ensureFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(VIEWS_FILE)) {
      fs.writeFileSync(VIEWS_FILE, JSON.stringify({}), 'utf8');
    }
    return true;
  } catch (error) {
    return false;
  }
}

// Verileri oku
function getViewsData(): ViewsStore {
  try {
    ensureFileExists();
    const data = fs.readFileSync(VIEWS_FILE, 'utf8');
    return JSON.parse(data || '{}');
  } catch (error) {
    return {};
  }
}

// Verileri kaydet
function saveViewsData(data: ViewsStore) {
  try {
    ensureFileExists();
    fs.writeFileSync(VIEWS_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    return false;
  }
}

// IP adresini al
function getClientIP(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Development ortamında test için sabit IP
  return '127.0.0.1'; // Geliştirme için test IP'si
}

export async function POST(request: NextRequest) {
  try {
    // IP adresi
    const ip = getClientIP(request);

    // Request body
    const requestData = await request.json();
    const blogId = requestData.blogId;

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID gerekli' }, { status: 400 });
    }

    // Verileri oku
    const viewsData = getViewsData();
    const blogIdString = blogId.toString();

    // Blog verilerini başlat
    if (!viewsData[blogIdString]) {
      viewsData[blogIdString] = {
        count: 0,
        ips: [],
      };
    }

    // IP kontrolü
    const hasVisited = viewsData[blogIdString].ips.includes(ip);

    // IP daha önce ziyaret etmediyse ekle
    if (!hasVisited) {
      viewsData[blogIdString].count++;
      viewsData[blogIdString].ips.push(ip);
      saveViewsData(viewsData);
    }

    // Mevcut sayacı döndür
    return NextResponse.json({
      success: true,
      blogId,
      viewCount: viewsData[blogIdString].count,
      isNewView: !hasVisited,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Görüntüleme sayısı işlenemedi' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const blogId = url.searchParams.get('blogId');

    if (!blogId) {
      return NextResponse.json({ error: 'Blog ID gerekli' }, { status: 400 });
    }

    const viewsData = getViewsData();
    const blogIdString = blogId.toString();

    const viewCount = viewsData[blogIdString]?.count || 0;

    return NextResponse.json({
      success: true,
      blogId,
      viewCount,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Görüntüleme sayısı alınamadı' },
      { status: 500 }
    );
  }
}
