// src/app/[vendorId]/qr/page.tsx

import QRCode from 'qrcode';
import { getDataProvider } from '@/lib/dataProvider';
import { notFound } from 'next/navigation';
import { QRDownloadButton } from '@/components/vendor/QRDownloadButton';

export const runtime = 'nodejs';

export default async function QRPage({ 
  params 
}: { 
  params: Promise<{ vendorId: string }> 
}) {
  const { vendorId } = await params;
  const provider = getDataProvider();

  try {
    const vendor = await provider.getVendorProfile(vendorId);
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const vendorUrl = `${appUrl}/${vendorId}`;

    // Generar el QR como una imagen Base64
    const qrDataUrl = await QRCode.toDataURL(vendorUrl, {
      width: 512,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    });

    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{vendor.name}</h1>
          <p className="text-gray-500 mb-6 text-sm">Escanea para ver mi catálogo digital</p>
          
          <div className="border-4 border-gray-50 p-2 rounded-lg mb-6">
            <img src={qrDataUrl} alt="QR Code" className="w-full h-auto" />
          </div>

          <QRDownloadButton vendorId={vendorId} qrDataUrl={qrDataUrl} />

          <p className="mt-4 text-xs text-gray-400">
            Imprime este código y ponlo en tu puesto de venta.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}