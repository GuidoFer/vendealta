// src/components/vendor/QRDownloadButton.tsx

'use client';

import { AnalyticsEvents } from '@/lib/utils/analytics';

interface QRDownloadButtonProps {
  vendorId: string;
  qrDataUrl: string;
}

export function QRDownloadButton({ vendorId, qrDataUrl }: QRDownloadButtonProps) {
  const handleDownload = () => {
    AnalyticsEvents.qrDownloaded(vendorId);
  };

  return (
    <a 
      href={qrDataUrl}
      download={`qr-${vendorId}.png`}
      onClick={handleDownload}
      className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition-colors"
    >
      Descargar QR
    </a>
  );
}