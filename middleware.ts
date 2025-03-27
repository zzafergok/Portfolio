// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Request başlıklarını klonlayın
  const requestHeaders = new Headers(request.headers);

  // IP adresini başlıklardan alın
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  // Eğer x-forwarded-for varsa, onu kullanın
  if (forwardedFor) {
    requestHeaders.set('x-real-ip', forwardedFor.split(',')[0].trim());
  }

  // Yanıtı güncellenmiş başlıklarla döndürün
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/api/views/:path*'],
};
