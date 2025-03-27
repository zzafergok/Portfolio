export interface BlogSubTitle {
  id: number;
  title: string;
}

export interface BlogSection {
  code?: string;
  heading: string;
  content: string;
  content2?: string;
}

export interface BlogPost {
  id: number;
  date: string;
  title: string;
  author: string;
  readTime: string;
  sections: BlogSection[];
}

export const blogContentData = [
  {
    id: 1,
    title: 'React 18: Yeni Nesil Kullanıcı Arayüzleri',
    author: 'Zafer Gök',
    date: 'Mart 19, 2025',
    readTime: '15 dk okuma',
    sections: [
      // Bölüm 1: React 18'e Genel Bakış
      {
        heading: "React 18'e Genel Bakış",
        content: `React 18, Meta (eski adıyla Facebook) ekibinin yıllar süren araştırma ve geliştirme çalışmalarının sonucu olarak ortaya çıkan önemli bir güncellemedir. 29 Mart 2022'de resmi olarak yayınlanan bu sürüm, React'ın temellerinde önemli değişiklikler içermektedir. 

React 18 sadece yeni özellikler getirmekle kalmıyor, aynı zamanda React'ın çalışma mantığını kökten değiştiren bir mimari değişikliği de beraberinde getiriyor: Eşzamanlı (Concurrent) Rendering.

React'ın önceki sürümlerinde, render işlemi kesintisiz ve senkron olarak gerçekleşirdi. Bir render işlemi başladığında, tamamlanana kadar kullanıcı arayüzü bloke olabilirdi. React 18 ile birlikte gelen Concurrent Rendering, render işlemlerinin kesintiye uğratılabilir, duraklatılabilir ve hatta iptal edilebilir olmasını sağlıyor. Bu yaklaşım, kullanıcı deneyimini önemli ölçüde iyileştirmektedir.`,
      },
      {
        heading: 'Otomatik Toplu İşleme (Automatic Batching)',
        content: `React 18'deki en kullanışlı iyileştirmelerden biri, Otomatik Toplu İşleme özelliğidir. Eski sürümlerde, React yalnızca kendi olay işleyicileri içindeki durum güncellemelerini gruplandırabiliyordu. React 18 ile birlikte, tüm durum güncellemeleri -bunlar Promise'ler, setTimeout, yerel olay işleyicileri veya herhangi bir başka işleyici içinde olsa bile- otomatik olarak gruplandırılır.

Basit bir örnekle açıklayalım:`,
        code: `// React 17'de
setTimeout(() => {
  setCount(c => c + 1); // Render tetiklenir
  setFlag(f => !f);     // Render tetiklenir
}, 1000);

// React 18'de
setTimeout(() => {
  setCount(c => c + 1); // Render tetiklenmez
  setFlag(f => !f);     // Her iki güncelleme için tek bir render tetiklenir
}, 1000);`,
      },
      {
        heading: 'createRoot API',
        content: `React 18, uygulamaları render etmek için yeni bir kök API sunar. Bu yeni API, eşzamanlı özellikleri etkinleştirmek için gereklidir:`,
        code: `// React 17
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));

// React 18
import ReactDOM from 'react-dom/client';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
      },

      // Bölüm 2: React 18'in Çekirdek Özellikleri
      {
        heading: 'useTransition Hook ve startTransition API',
        content: `React 18'in en önemli yeniliklerinden biri, geçişleri (transitions) yönetmek için yeni API'lar sunmasıdır. Bu API'lar, acil güncellemeler ile acil olmayan güncellemeleri ayırt etmeye olanak tanır.

useTransition hook'u, kullanıcı arayüzünün duyarlılığını korurken, büyük render işlemlerini yönetmek için kullanılır:`,
        code: `import { useTransition } from 'react';

function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    // Acil güncelleme (input değerini anında günceller)
    setSearchQuery(e.target.value);

    // Acil olmayan güncelleme (sonuçları hesaplamak zaman alabilir)
    startTransition(() => {
      // Ağır hesaplama işlemi
      const results = computeSearchResults(e.target.value);
      setSearchResults(results);
    });
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} />
      {isPending ? (
        <p>Sonuçlar yükleniyor...</p>
      ) : (
        <ResultsList results={searchResults} />
      )}
    </div>
  );
}`,
      },
      {
        heading: 'useDeferredValue Hook',
        content: `useDeferredValue, bir değerin düşük öncelikli bir versiyonunu oluşturmak için kullanılır. Bu, özellikle veri görselleştirme veya kullanıcı girişi gibi performans açısından kritik senaryolarda kullanışlıdır.

Karmaşık bir liste oluşturma senaryosunu ele alalım:`,
        code: `import { useState, useDeferredValue } from 'react';

function SearchResults({ query }) {
  // Kullanıcı yazarken anlık gecikme olmaması için 
  // liste render'ını erteleriz
  const deferredQuery = useDeferredValue(query);
  
  // UI'ın yanıt vermeye devam etmesi için ağır liste oluşturma
  // işlemini deferredQuery ile yaparız
  const results = useMemo(
    () => computeExpensiveResults(deferredQuery),
    [deferredQuery]
  );

  return (
    <div>
      <p>"{query}" için arama sonuçları:</p>
      {query !== deferredQuery && <p>Yükleniyor...</p>}
      <ul>{results.map(item => <li key={item.id}>{item.name}</li>)}</ul>
    </div>
  );
}`,
      },

      // Bölüm 3: React 18'de Suspense ve Sunucu Bileşenleri
      {
        heading: 'Suspense İyileştirmeleri',
        content: `React 18, Suspense özelliğini önemli ölçüde geliştirmiştir. Artık Suspense, sunucu tarafı rendering (SSR) ile daha iyi entegre çalışmaktadır. Bu, "aşamalı hidrasyon" olarak bilinen yeni bir özelliğe olanak tanır.

Geleneksel SSR'da, tüm sayfa içeriği HTML olarak sunucu tarafında render edilir, ancak içerik etkileşimli hale gelmeden önce tüm JavaScript'in yüklenmesi ve çalıştırılması gerekir. React 18 ile birlikte, bir Suspense sınırı içindeki içerik bağımsız olarak hidrate edilebilir:`,
        code: `// Sayfa bileşeni
function HomePage() {
  return (
    <div>
      <Header />
      <Suspense fallback={<SkeletonArticle />}>
        <ArticleContent />
      </Suspense>
      <Suspense fallback={<SkeletonSidebar />}>
        <Sidebar />
      </Suspense>
      <Footer />
    </div>
  );
}

// Sunucu tarafında
import { renderToPipeableStream } from 'react-dom/server';

app.get('/', (req, res) => {
  const { pipe } = renderToPipeableStream(<HomePage />, {
    bootstrapScripts: ['/client.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html');
      pipe(res);
    }
  });
});`,
        content2: `Bu yaklaşımla, sayfa kademeli olarak etkileşimli hale gelir. Önce temel bileşenler (Header, Footer) hidrate olur ve ardından daha ağır olan ArticleContent ve Sidebar bileşenleri hazır olduğunda hidrate olur. Bu, Largest Contentful Paint (LCP) ve Time to Interactive (TTI) metriklerini iyileştirir.`,
      },
      {
        heading: 'useId Hook',
        content: `React 18'de tanıtılan bir diğer önemli hook, useId'dir. Bu hook, hem istemci hem de sunucu tarafında eşleşen benzersiz ID'ler oluşturmak için tasarlanmıştır:`,
        code: `import { useId } from 'react';

function PasswordField() {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>Şifre:</label>
      <input id={id} type="password" />
    </div>
  );
}`,
        content2: `Bu hook özellikle erişilebilirlik açısından önemlidir. Ayrıca, server rendering sırasında hidrasyon uyuşmazlıklarını önlemek için de kullanışlıdır. Aynı bileşenin birden fazla örneği oluşturulduğunda bile, her bir örnek için benzersiz bir ID değeri oluşturulur.`,
      },

      // Bölüm 4: React 18'de Strict Mode ve Pratik İpuçları
      {
        heading: 'Strict Mode İyileştirmeleri',
        content: `React 18'de Strict Mode daha da güçlendirilmiştir. Artık geliştirme aşamasında, bileşenlerinizin mount edilip unmount edilmesini ve ardından yeniden mount edilmesini simüle ederek, bileşenlerinizin kurulum ve temizleme mantığında potansiyel hataları tespit eder.

Bu, veritabanı bağlantıları, abonelikler veya zamanlayıcılar gibi potansiyel bellek sızıntısı kaynaklarını tanımlamanıza yardımcı olur. Bu özellik özellikle büyük uygulamalarda karşılaşılan birçok sorunu erkenden tespit etmenize olanak sağlar.`,
        code: `import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
      },
      {
        heading: 'React 18 Güncelleme Stratejisi',
        content: `React 18'e geçiş yaparken aşağıdaki stratejileri izlemek faydalı olacaktır:

1. Öncelikle yeni createRoot API'ına geçiş yapın
2. Üçüncü taraf kütüphaneleri güncelleyin
3. Uygulamanızı test edin ve hatalarla karşılaşırsanız çözün
4. Yeni concurrent özellikleri kademeli olarak entegre edin

Tipik bir güncelleme şu şekilde görünebilir:`,
        code: `// package.json güncellemesi
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}

// index.js güncellemesi
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// ReactDOM.render yerine createRoot kullanın
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);`,
      },
      {
        heading: 'Performans Optimizasyon İpuçları',
        content: `React 18'in yeni özelliklerinden maksimum verim almak için teknik öneriler:

1. Ağır hesaplamalar için useTransition kullanılmalıdır
2. Büyük listeler ve karmaşık veri gösterimleri için useDeferredValue kullanılması uygundur
3. Suspense ile sayfa yükleme deneyimi kademeli hale getirilebilir
4. memo, useMemo, ve useCallback gibi memoization teknikleri yerinde kullanılmalıdır

Örneğin, bir e-ticaret uygulamasında şu pattern kullanılabilir:`,
        code: `function ProductPage({ productId }) {
  const [isPending, startTransition] = useTransition();

  // Ana ürün verilerini hemen yükleyin
  const productData = useProductData(productId);

  // Önerilen ürünleri deferred value ile yükleyin
  const [selectedFilter, setSelectedFilter] = useState('popular');
  const deferredFilter = useDeferredValue(selectedFilter);
  
  // Filtreyi hemen güncelle ama ağır hesaplamayı ertele
  const handleFilterChange = (filter) => {
    setSelectedFilter(filter); // Anında UI güncellemesi
  };

  // Önerilen ürünleri hesapla (ağır işlem)
  const recommendedProducts = useMemo(
    () => computeRecommendations(productId, deferredFilter),
    [productId, deferredFilter]
  );

  return (
    <div>
      <ProductDetails data={productData} />
      
      <div>
        <h2>Önerilen Ürünler</h2>
        <FilterButtons 
          selected={selectedFilter} 
          onChange={handleFilterChange} 
        />
        
        {selectedFilter !== deferredFilter && 
          <p>Önerilen ürünler filtreleniyor...</p>
        }
        
        <Suspense fallback={<ProductSkeletons />}>
          <RecommendedProductsList products={recommendedProducts} />
        </Suspense>
      </div>
    </div>
  );
}`,
      },

      // Bölüm 5: React 18 ve Geleceğe Bakış
      {
        heading: 'React Server Components',
        content: `React 18 ile birlikte gelen en heyecan verici gelişmelerden biri, henüz deneysel aşamada olan React Server Components'dir. Bu özellik, React'ın hem sunucu hem de istemci tarafında sorunsuz bir şekilde çalışmasına olanak tanır.

Server Components ile, bazı bileşenler yalnızca sunucuda çalışabilir ve istemciye hiç JavaScript gönderilmez. Bu, paket boyutunu azaltır ve performansı artırır. Next.js 13 ve üzeri versiyonlarda bu özellik kullanılabilir.`,
        code: `// server-component.js (sunucu tarafında çalışır)
// Bu dosya istemciye gönderilmez!
import { db } from '../database';

async function ProductDetails({ id }) {
  const product = await db.query('SELECT * FROM products WHERE id = ?', [id]);
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <ClientPrice price={product.price} />
    </div>
  );
}

// client-component.js (istemci tarafında çalışır)
'use client';

function ClientPrice({ price }) {
  const [currency, setCurrency] = useState('TRY');
  
  return (
    <div>
      <select value={currency} onChange={e => setCurrency(e.target.value)}>
        <option value="TRY">TL</option>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
      <p>{formatPrice(price, currency)}</p>
    </div>
  );
}`,
      },
      {
        heading: "React 18'in Benimsenmesi ve Ekosistem",
        content: `React 18, büyük değişiklikler içerse de, geriye dönük uyumluluk açısından oldukça güçlü bir sürümdür. Çoğu uygulama, minimal değişikliklerle React 18'e geçiş yapabilir.

Kademeli bir geçiş stratejisi uygulamak önerilir. Önce uygulamayı React 18'e geçirmek, daha sonra yeni özellikleri ihtiyaç duyuldukça entegre etmek etkili bir yaklaşımdır. Bu strateji, hem stabil bir uygulama sağlar hem de yeni özelliklerin avantajlarından yararlanmaya olanak tanır.

React 18 ile birlikte gelen yenilikler, büyük ölçüde mevcut React bilgisiyle uyumludur. Konseptlerin çoğu, React'ın önceki sürümlerinde alışık olunan yaklaşımların doğal bir uzantısıdır.`,
      },
      {
        heading: 'Sonuç',
        content: `React 18, JavaScript kütüphaneleri dünyasında önemli bir ilerleme sağlamaktadır. Concurrent Rendering, daha iyi sunucu tarafı rendering ve yeni hook'lar gibi özellikleriyle, geliştiricilere daha iyi performans ve kullanıcı deneyimi sunma konusunda yeni imkanlar sunmaktadır.

Bu sürümdeki değişiklikler sadece teknik iyileştirmeler değil, aynı zamanda uygulama mimarisini ve kullanıcı deneyimi hakkında düşünme şeklini değiştiren paradigma değişiklikleridir.

React ekibi, bu özellikleri geliştirirken geriye dönük uyumluluğu koruma konusunda titiz çalışmıştır. Bu sayede, yeni özellikler kademeli olarak benimsenebilir ve uygulamalar zaman içinde geliştirilebilir.

React 18 ile tanışmak için hemen bugün adım atmak ve geleceğin web uygulamalarını inşa etmeye başlamak için iyi bir zamandır.`,
      },
    ],
  },
  {
    id: 2,
    title: 'Next.js: Başlangıç Seviyesi Rehberi',
    author: 'Zafer Gök',
    date: 'Mart 27, 2025',
    readTime: '8 dk okuma',
    sections: [
      {
        heading: 'Next.js Nedir?',
        content: `Next.js, React tabanlı bir web geliştirme çerçevesidir ve React'in eksik olduğu birçok özelliği tamamlar. Vercel tarafından geliştirilen bu framework, production-ready (üretime hazır) web uygulamaları oluşturmak için optimize edilmiştir.

Next.js, React'in komponent temelli yaklaşımını temel alırken, sunucu tarafı rendering (SSR), statik site oluşturma (SSG), dosya bazlı routing, API rotaları ve çok daha fazlasını sunar. Bu özellikler, performansı artırırken geliştirme sürecini de basitleştirir.

Next.js'in en önemli özelliklerinden biri, ön tanımlı yapılandırmaları ile "sıfır yapılandırma" felsefesidir. Bu sayede geliştiriciler, karmaşık webpack veya babel yapılandırmalarıyla uğraşmak zorunda kalmadan hızlıca geliştirmeye başlayabilirler.`,
      },
      {
        heading: 'Proje Oluşturma',
        content: `Next.js ile yeni bir proje başlatmak oldukça kolaydır. Aşağıdaki komut, modern bir Next.js uygulaması oluşturacaktır:`,
        code: `npx create-next-app@latest my-nextjs-app
# veya
yarn create next-app my-nextjs-app
# veya
pnpm create next-app my-nextjs-app`,
        content2: `Bu komut, TypeScript desteği, ESLint yapılandırması ve diğer modern özelliklerle ilgili tercihleri soracaktır. Varsayılan değerler çoğu zaman yeterli olacaktır.

Proje oluşturulduktan sonra, aşağıdaki komutla development sunucusunu başlatabilirsiniz:

\`\`\`bash
cd my-nextjs-app
npm run dev
\`\`\`

Tarayıcınızda http://localhost:3000 adresine giderek uygulamanızı görebilirsiniz.`,
      },
      {
        heading: 'Dosya Bazlı Routing',
        content: `Next.js'in en güçlü özelliklerinden biri, dosya sistemine dayalı routing mekanizmasıdır. Bu, uygulamanızın sayfalarını ve rotalarını düzenlemek için özel bir router yapılandırması yapmanıza gerek olmadığı anlamına gelir.

Next.js 13 ve sonraki sürümlerinde 'App Router' yapısı kullanılır. Bu yapıda, \`app\` dizini içindeki her klasör bir route'a karşılık gelir. Her route klasörü içinde, sayfanın içeriğini oluşturan bir \`page.js\` veya \`page.tsx\` dosyası yer alır:`,
        code: `app/                 # Ana app dizini
├── page.tsx          # Ana sayfa (/)
├── about/            # About sayfası için klasör
│   └── page.tsx      # About sayfası (/about)
├── blog/             # Blog route'u için klasör
│   ├── page.tsx      # Blog ana sayfası (/blog)
│   └── [slug]/       # Dinamik route için klasör
│       └── page.tsx  # Belirli bir blog yazısı (/blog/my-post)`,
        content2: `Dosya adlarının özel anlamları vardır:

- \`page.tsx\`: Bir route için UI bileşenini tanımlar
- \`layout.tsx\`: Bir route veya birden fazla route için ortak düzeni tanımlar
- \`loading.tsx\`: Bir route için yükleme durumunu gösterir
- \`error.tsx\`: Bir route için hata durumunu gösterir
- \`not-found.tsx\`: 404 sayfasını gösterir

Dinamik route'lar, köşeli parantez içindeki klasör adlarıyla oluşturulur. Örneğin, \`[slug]\` bir dinamik parametre tanımlar ve bu parametreye bileşen içinden erişilebilir.`,
      },
      {
        heading: 'Basit Bir Sayfa Örneği',
        content: `Next.js'te bir sayfa oluşturmak çok basittir. İşte \`app/page.tsx\` içinde basit bir ana sayfa örneği:`,
        code: `// app/page.tsx
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">
        Next.js ile İlk Sayfam
      </h1>
      <p className="mt-4 text-xl">
        Next.js kullanmaya başladığınız için tebrikler!
      </p>
      <div className="mt-8">
        <a 
          href="https://nextjs.org/docs" 
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Dökümantasyon →
        </a>
      </div>
    </main>
  );
}`,
        content2: `Next.js 13 ve sonraki sürümlerde, tüm bileşenler varsayılan olarak Sunucu Bileşenleridir. Eğer bir bileşenin istemci tarafında çalışmasını istiyorsanız, dosyanın en üstüne \`'use client'\` direktifini eklemelisiniz.`,
      },
      {
        heading: 'Veri Getirme Yöntemleri',
        content: `Next.js'te veri getirme, uygulamanızın nasıl oluşturulacağını belirleyen önemli bir konudur. Next.js, üç temel veri getirme yöntemi sunar:

1. **Sunucu Bileşenleri ile Veri Getirme**: Varsayılan ve önerilen yöntemdir.`,
        code: `// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users')
  if (!res.ok) throw new Error('Kullanıcılar yüklenemedi')
  return res.json()
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div>
      <h1>Kullanıcılar</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}`,
        content2: `2. **İstemci Bileşenlerinde useEffect ile Veri Getirme**: İstemci tarafında çalışan bileşenlerde kullanılabilir.

3. **SWR veya React Query Kullanımı**: İstemci tarafında veri getirme, önbellekleme ve yeniden doğrulama için daha gelişmiş kütüphaneler kullanılabilir.

Next.js'in App Router'ında, Sunucu Bileşenleri ile veri getirme genellikle tercih edilen yöntemdir çünkü bu:

- Veri getirme işlemi istemci tarafında değil, sunucu tarafında gerçekleşir
- JavaScript paket boyutunu azaltır
- API anahtarları gibi hassas bilgileri istemci tarafına göndermez
- Daha iyi SEO sonuçları sağlar`,
      },
      {
        heading: 'API Route Oluşturma',
        content: `Next.js, kendi API endpoint'lerinizi oluşturmanıza da olanak tanır. Bu, uygulamanızın sunucu tarafı mantığını aynı proje içinde yönetmenizi sağlar.

App Router ile API rotaları, \`app/api\` dizini altında \`route.js\` veya \`route.ts\` dosyalarıyla tanımlanır:`,
        code: `// app/api/users/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // Veritabanına bağlanma, veri getirme vb.
  const users = [
    { id: 1, name: "Ali Yılmaz" },
    { id: 2, name: "Ayşe Kaya" }
  ]
  
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  try {
    // request gövdesini almak
    const body = await request.json()
    
    // Yeni kullanıcı oluşturmak için gerekli işlemler
    // örneğin, veritabanına kaydetme
    
    return NextResponse.json(
      { message: "Kullanıcı oluşturuldu", user: body },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Bir hata oluştu" },
      { status: 500 }
    )
  }
}`,
        content2: `Bu API rotalarını istemci tarafından şu şekilde kullanabilirsiniz:

\`\`\`javascript
// Veri almak için
const response = await fetch('/api/users')
const users = await response.json()

// Veri göndermek için
const response = await fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ name: 'Yeni Kullanıcı' })
})
const result = await response.json()
\`\`\`

API rotaları, üçüncü taraf API'lara bir proxy olarak, form verilerini işlemek için veya veritabanıyla doğrudan etkileşim kurmak için kullanılabilir.`,
      },
      {
        heading: 'Next.js Bileşen Yapısı',
        content: `Next.js 13 ile birlikte, Sunucu ve İstemci Bileşenleri kavramları geldi. Bu ayrım, bileşenlerin nerede render edileceğini ve hangi özelliklere sahip olacağını belirler.

**Sunucu Bileşenleri (Varsayılan)**
- Sunucuda render edilir ve HTML olarak istemciye gönderilir
- JavaScript yükünü azaltır
- Doğrudan veritabanına, dosya sistemine vb. erişebilir
- \`useState\`, \`useEffect\` gibi React hookları kullanamaz
- Tarayıcı API'larına erişemez

**İstemci Bileşenleri**
- \`'use client'\` direktifi ile tanımlanır
- İstemci tarafında (tarayıcıda) render edilir
- Etkileşimli durum ve olay yönetimi kullanabilir
- React hookları kullanabilir
- Tarayıcı API'larına erişebilir

Önerilen yaklaşım, uygulamanızda mümkün olduğunca çok Sunucu Bileşeni kullanmak ve sadece etkileşim gerektiren bileşenleri İstemci Bileşenleri olarak işaretlemektir.`,
        code: `// Sunucu Bileşeni örneği (app/users/page.tsx)
import UserProfile from './user-profile' // İstemci bileşeni

async function getUsers() {
  // Veritabanı veya API çağrısı
  return [
    { id: 1, name: "Ali", email: "ali@example.com" },
    { id: 2, name: "Zeynep", email: "zeynep@example.com" }
  ]
}

export default async function UsersPage() {
  const users = await getUsers()
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kullanıcılar</h1>
      
      {users.map(user => (
        // İstemci bileşeni bir Sunucu Bileşeni içinde kullanılıyor
        <UserProfile key={user.id} user={user} />
      ))}
    </div>
  )
}

// İstemci Bileşeni örneği (app/users/user-profile.tsx)
'use client'

import { useState } from 'react'

export default function UserProfile({ user }) {
  const [expanded, setExpanded] = useState(false)
  
  return (
    <div className="border p-4 mb-2 rounded">
      <h2 className="font-semibold">{user.name}</h2>
      
      <button 
        onClick={() => setExpanded(!expanded)}
        className="text-blue-500 mt-2"
      >
        {expanded ? 'Gizle' : 'Detayları Göster'}
      </button>
      
      {expanded && (
        <div className="mt-2 text-gray-600">
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  )
}`,
        content2: `Bu örnekte, \`UsersPage\` bir Sunucu Bileşenidir ve verileri doğrudan getirir. \`UserProfile\` ise bir İstemci Bileşenidir ve kullanıcı etkileşimine tepki verebilir. İstemci Bileşenleri, Sunucu Bileşenleri içinde kullanılabilir, ancak tersi mümkün değildir.`,
      },
      {
        heading: 'Görüntü Optimizasyonu',
        content: `Next.js, \`next/image\` paketindeki \`Image\` bileşeni ile modern web için görüntü optimizasyonu sağlar. Bu bileşen:

- Görüntüleri otomatik olarak optimize eder (WebP, AVIF gibi formatlar)
- Görüntüleri responsive (duyarlı) hale getirir
- Lazy loading (geç yükleme) uygular
- Görüntü boyutlandırma ve kırpma işlemlerini sunucu tarafında yapar
- Cumulative Layout Shift (CLS) sorunlarını önler

İşte basit bir Image kullanım örneği:`,
        code: `import Image from 'next/image'

export default function ProductCard() {
  return (
    <div className="relative w-full h-64">
      <Image
        src="/images/product.jpg"    // Görüntü yolu
        alt="Ürün görseli"           // Erişilebilirlik için alt metni
        fill                         // Ana kapsayıcıyı doldurur
        sizes="(max-width: 768px) 100vw, 50vw" // Responsive boyut
        priority={false}             // Lazy loading (varsayılan)
        className="object-cover rounded-lg" // Tailwind sınıfları
      />
    </div>
  )
}`,
        content2: `\`next/image\` bileşeninin iki ana kullanım şekli vardır:

1. **Sabit Boyutlu Görüntüler** - Genişlik ve yükseklik belirtilir
2. **Duyarlı veya Kapsayıcı Dolan Görüntüler** - fill özelliği kullanılır

\`fill\` kullanırken, kapsayıcı elementin \`position: relative\` ve belirli bir yüksekliğe sahip olması gerektiğini unutmayın.`,
      },
      {
        heading: 'İyi Uygulamalar ve İpuçları',
        content: `Next.js ile geliştirme yaparken verimlilik ve performans için göz önünde bulundurulması gereken bazı iyi uygulamalar ve ipuçları:

**Dosya ve Klasör Yapısı**
- App Router ile (\`app/\` dizini) sayfa ve bileşen mantığını ayırın
- Genel bileşenleri \`components/\` klasöründe tutun
- Yardımcı fonksiyonları \`lib/\` veya \`utils/\` altında toparlayın
- Stilleri \`styles/\` klasöründe veya ilgili bileşen dosyalarıyla birlikte tutun

**Performans İyileştirmeleri**
- Mümkün olduğunca Sunucu Bileşenlerini tercih edin
- \`Image\` bileşenini görüntü optimizasyonu için kullanın
- Statik içeriği mümkün olduğunca statik olarak render edin
- Dinamik içerik için uygun önbellek stratejilerini kullanın

**Kod Kalitesi**
- TypeScript kullanarak tip güvenliği sağlayın
- ESLint ve Prettier kullanarak kod stilini ve kalitesini koruyun
- Componentler arası veri paylaşımı için Context API veya Zustand gibi state yönetim çözümleri kullanın
- Tekrar kullanılabilir hook'lar geliştirerek kod tekrarını azaltın`,
        code: `// Örnek Next.js proje yapısı
my-nextjs-app/
├── app/                   # App Router sayfaları ve route'ları
│   ├── page.tsx           # Ana sayfa
│   ├── layout.tsx         # Kök düzen
│   ├── blog/              # Blog route'u
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── api/               # API route'ları
│       └── users/
│           └── route.ts
├── components/            # Paylaşılan bileşenler
│   ├── ui/                # Temel UI bileşenleri
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── features/          # Özellik bazlı bileşenler
│       └── UserProfile.tsx
├── lib/                   # Yardımcı fonksiyonlar ve modüller
│   ├── db.ts              # Veritabanı bağlantıları
│   └── utils.ts           # Genel yardımcı fonksiyonlar
├── public/                # Statik dosyalar
│   ├── images/
│   └── favicon.ico
├── styles/                # Global stiller
│   └── globals.css
├── next.config.js         # Next.js yapılandırması
├── tailwind.config.js     # Tailwind CSS yapılandırması
└── package.json`,
        content2: `**Güvenlik Önerileri**
- API route'larında giriş verilerini her zaman doğrulayın
- Güvenlik başlıklarını yapılandırın
- Gizli anahtarları ve kimlik bilgilerini ortam değişkenlerinde saklayın
- Cross-site request forgery (CSRF) ve XSS korumaları ekleyin

**SEO ve Erişilebilirlik**
- Her sayfaya uygun \`<title>\` ve meta etiketleri ekleyin
- Semantik HTML etiketlerini kullanın
- Erişilebilirlik için ARIA niteliklerini ekleyin
- Görüntüler için alt metinleri kullanın

Bu ipuçları ve iyi uygulamalar, Next.js ile geliştirirken sorunsuz bir deneyim yaşamanıza ve yüksek kaliteli uygulamalar oluşturmanıza yardımcı olacaktır.`,
      },
    ],
  },
];

export const blogSubTitles = [
  { id: 1, title: 'React 18' },
  { id: 2, title: 'Next.js' },
];
