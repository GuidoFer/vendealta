import { getDataProvider } from '@/lib/dataProvider';
import { ProductCard } from '@/components/ui/ProductCard';
import { WhatsAppButton } from '@/components/vendor/WhatsAppButton';
import { TikTokLink } from '@/components/vendor/TikTokLink';
import { ExitGuard } from '@/components/vendor/ExitGuard'; // ✅ Importado
import { notFound } from 'next/navigation';

interface VendorPageProps {
  params: Promise<{ vendorId: string }>;
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { vendorId } = await params;
  const provider = getDataProvider();

  try {
    const vendor = await provider.getVendorProfile(vendorId);

    // ✅ FILTRAR SOLO PRODUCTOS DISPONIBLES
    const availableProducts = vendor.products.filter(p => p.available);

    return (
      <main className="min-h-screen bg-gray-50">
        {/* ✅ ESTO EVITA QUE SALGAN POR ERROR */}
        <ExitGuard />

        <header 
          style={{ backgroundColor: vendor.settings.theme_color }} 
          className="text-white p-8 text-center shadow-lg"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">{vendor.name}</h1>
            <p className="mt-2 opacity-90 italic">{vendor.bio}</p>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4">
          {/* BOTONES DE CONTACTO */}
          <div className="mb-8 space-y-3 mt-4">
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

          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Nuestro Catálogo
          </h2>

          {/* ✅ RENDERIZAR SOLO PRODUCTOS DISPONIBLES */}
          {availableProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No hay productos disponibles en este momento.</p>
              <p className="text-sm mt-2">Vuelve pronto para ver nuevos productos.</p>
            </div>
          )}
        </div>
      </main>
    );
  } catch (error) {
    notFound();
  }
}