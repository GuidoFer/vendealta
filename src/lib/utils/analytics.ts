// src/lib/utils/analytics.ts

/**
 * Trackea eventos personalizados en Google Analytics 4
 */
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window === 'undefined') return;

  const gtag = (window as any).gtag;
  
  if (!gtag) {
    console.warn('GA4: gtag not initialized');
    return;
  }

  gtag('event', eventName, eventParams);
}

/**
 * Eventos predefinidos para tracking
 */
export const AnalyticsEvents = {
  // Conversión principal
  whatsappClick: (vendorName: string, vendorId: string) => {
    trackEvent('whatsapp_click', {
      event_category: 'conversion',
      event_label: vendorName,
      vendor_id: vendorId,
      value: 1,
    });
  },

  // ✅ NUEVO: Click en WhatsApp desde producto específico
  productWhatsappClick: (
    vendorName: string,
    vendorId: string,
    productName: string,
    productPrice: number
  ) => {
    trackEvent('product_whatsapp_click', {
      event_category: 'conversion',
      event_label: productName,
      vendor_id: vendorId,
      vendor_name: vendorName,
      product_name: productName,
      product_price: productPrice,
      value: 1,
    });
  },

  // Engagement secundario
  tiktokClick: (vendorName: string, vendorId: string, username: string) => {
    trackEvent('tiktok_click', {
      event_category: 'engagement',
      event_label: vendorName,
      vendor_id: vendorId,
      tiktok_username: username,
    });
  },

  // Generación de QR
  qrGenerated: (vendorId: string) => {
    trackEvent('qr_generated', {
      event_category: 'utility',
      vendor_id: vendorId,
    });
  },

  // Descarga de QR
  qrDownloaded: (vendorId: string) => {
    trackEvent('qr_downloaded', {
      event_category: 'utility',
      vendor_id: vendorId,
    });
  },

  // Producto visualizado (opcional, para tracking avanzado)
  productViewed: (productName: string, price: number, vendorId: string) => {
    trackEvent('view_item', {
      event_category: 'ecommerce',
      items: [{
        item_name: productName,
        price: price,
        currency: 'BOB',
      }],
      vendor_id: vendorId,
    });
  },  
};