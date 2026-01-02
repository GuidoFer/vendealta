// src/types/vendor.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;      // Legacy: single image
  imageUrls?: string[];   // ✅ NUEVO: multiple images
  category: 'ropa' | 'calzado' | 'accesorios' | 'otros';
  available: boolean;
}

export interface VendorMeta {
  vendor_id: string;
  name: string;
  whatsapp: string;
  tiktok?: string;
  bio?: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Settings {
  qr_enabled: boolean;
  theme_color: string;
  show_tiktok: boolean;
}

export interface VendorProfile extends VendorMeta {
  products: Product[];
  settings: Settings;
  lastUpdated: Date;
}