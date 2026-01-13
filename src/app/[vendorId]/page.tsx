import { getDataProvider } from '@/lib/dataProvider';
import { ProductCard } from '@/components/ui/ProductCard';
import { WhatsAppButton } from '@/components/vendor/WhatsAppButton';
import { TikTokLink } from '@/components/vendor/TikTokLink';
import { ExitGuard } from '@/components/vendor/ExitGuard';
import { notFound } from 'next/navigation';

interface VendorPageProps {
  params: Promise<{ vendorId: string }>;
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendorId } = await params;
  const provider = getDataProvider();

  try {
    const vendor = await provider.getVendorProfile(vendorId);
    const availableProducts = vendor.products.filter(p => p.available);

    return (
      <main className="min-h-screen bg-[#F8FAFC]">
        <ExitGuard />

        {/* 📱 HEADER MOBILE-PRO */}
        <header 
          style={{ 
            background: `linear-gradient(180deg, ${vendor.settings.theme_color || '#3b82f6'} 0%, ${vendor.settings.theme_color || '#3b82f6'}E6 100%)`,
          }} 
          className="relative pt-16 pb-32 px-6 text-center shadow-xl"
        >
          {/* Textura de lujo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '24px 24px' }}>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/90">
                Catálogo Oficial • SIA
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-md">
              {vendor.name}
            </h1>

            {vendor.bio && (
              <p className="text-base md:text-xl text-white/90 font-medium max-w-sm mx-auto leading-snug">
                {vendor.bio}
              </p>
            )}
          </div>

          {/* Curva Orgánica Invertida */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg viewBox="0 0 500 80" preserveAspectRatio="none" className="relative block w-full h-[60px]">
              <path d="M0,80 L500,80 L500,0 C350,70 150,70 0,0 Z" fill="#F8FAFC"></path>
            </svg>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-5 relative -mt-16 z-20">
          {/* CONTACTO */}
          <div className="space-y-3 mb-12">
            <div className="bg-white/90 backdrop-blur-xl p-3 rounded-[2rem] shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-white">
              <div className="space-y-2.5">
                <WhatsAppButton 
                  phone={vendor.whatsapp} 
                  vendorName={vendor.name}
                  vendorId={vendor.vendor_id}
                />
                {vendor.tiktok && vendor.settings.show_tiktok && (
                  <TikTokLink 
                    username={vendor.tiktok} 
                    vendorName={vendor.name}
                    vendorId={vendor.vendor_id}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between mb-8 px-1">
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-none">Catálogo</h2>
              <div className="h-1 w-8 rounded-full mt-2" style={{ backgroundColor: vendor.settings.theme_color || '#3b82f6' }}></div>
            </div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-lg">
              {availableProducts.length} Productos
            </div>
          </div>

          {/* GRID */}
          {availableProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  vendorPhone={vendor.whatsapp}
                  vendorName={vendor.name}
                  vendorId={vendor.vendor_id}
                  vendorColor={vendor.settings.theme_color} // ✅ Inyectamos el color
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-100/50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <span className="text-4xl block mb-2">📦</span>
              <p className="text-slate-800 font-bold">Próximamente más productos</p>
            </div>
          )}
        </div>

        <footer className="py-16 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-1">{vendor.name}</p>
          <p className="text-[10px] font-medium text-slate-400 italic opacity-40">Built with SIA.BO</p>
        </footer>
      </main>
    );
  } catch (error) {
    notFound();
  }
}