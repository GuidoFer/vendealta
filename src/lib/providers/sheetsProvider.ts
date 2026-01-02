// src/lib/providers/sheetsProvider.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { DataProvider } from '../dataProvider';
import { VendorProfile, Product, VendorMeta, Settings } from '@/types/vendor';
import { ProductSchema } from '../validators/productSchema';
import { VendorMetaSchema } from '../validators/vendorSchema';
import { SettingsSchema } from '../validators/settingsSchema';

export class SheetsProvider implements DataProvider {
  private serviceAccountAuth: JWT;

  constructor() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const keyBase64 = process.env.GOOGLE_PRIVATE_KEY_BASE64;
    const keyRaw = process.env.GOOGLE_PRIVATE_KEY;

    if (!email) {
      throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_EMAIL in ENV');
    }

    if (!keyBase64 && !keyRaw) {
      throw new Error('Missing GOOGLE_PRIVATE_KEY or GOOGLE_PRIVATE_KEY_BASE64 in ENV');
    }

    let privateKey: string;
    
    if (keyBase64) {
      console.log('[SheetsProvider] Using Base64 encoded private key');
      try {
        privateKey = Buffer.from(keyBase64, 'base64').toString('utf-8');
      } catch (error) {
        console.error('[SheetsProvider] Error decoding Base64 key:', error);
        throw new Error('Failed to decode GOOGLE_PRIVATE_KEY_BASE64');
      }
    } else {
      console.log('[SheetsProvider] Using raw private key');
      privateKey = keyRaw!;
      if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
        privateKey = privateKey.slice(1, -1);
      }
      privateKey = privateKey.replace(/\\n/g, '\n');
    }

    if (!privateKey.includes('BEGIN PRIVATE KEY')) {
      throw new Error('Invalid private key format: missing BEGIN marker');
    }

    this.serviceAccountAuth = new JWT({
      email: email,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    console.log('[SheetsProvider] JWT auth created successfully');
  }

  async getVendorProfile(vendorId: string): Promise<VendorProfile> {
    try {
      const sheetId = await this.findSheetByVendorId(vendorId);
      if (!sheetId) throw new Error(`Sheet ID no mapeado para: ${vendorId}`);

      const doc = new GoogleSpreadsheet(sheetId, this.serviceAccountAuth);
      await doc.loadInfo();

      const vendorMeta = await this.readVendorMeta(doc);
      const products = await this.readProducts(doc);
      const settings = await this.readSettings(doc);

      return {
        ...vendorMeta,
        products,
        settings,
        lastUpdated: new Date(),
      };
    } catch (error) {
      console.error(`[SheetsProvider] Error cargando perfil ${vendorId}:`, error);
      throw error;
    }
  }

  async getProducts(vendorId: string): Promise<Product[]> {
    const profile = await this.getVendorProfile(vendorId);
    return profile.products;
  }

  private async findSheetByVendorId(vendorId: string): Promise<string | null> {
    const mapping = process.env.SHEETS_MAPPING || '';
    const entries = mapping.split(',');
    for (const entry of entries) {
      const [id, sheetId] = entry.split(':');
      if (id?.trim() === vendorId) return sheetId?.trim();
    }
    return null;
  }

  private async readVendorMeta(doc: GoogleSpreadsheet): Promise<VendorMeta> {
    const sheet = doc.sheetsByTitle['vendor_meta'];
    if (!sheet) throw new Error('Pestaña "vendor_meta" no encontrada');

    const rows = await sheet.getRows();
    const data: Record<string, any> = {};
    rows.forEach(row => {
      const field = row.get('field');
      const value = row.get('value');
      if (field) data[field] = value;
    });

    return VendorMetaSchema.parse(data);
  }

  private async readProducts(doc: GoogleSpreadsheet): Promise<Product[]> {
    const sheet = doc.sheetsByTitle['products'];
    if (!sheet) {
      throw new Error('Tab "products" not found in sheet');
    }

    const rows = await sheet.getRows();
    const products: Product[] = [];

    for (const row of rows) {
      // Leer múltiples URLs de imagen
      const imageUrl1 = row.get('image_url_1') || row.get('image_url') || undefined;
      const imageUrl2 = row.get('image_url_2') || undefined;
      const imageUrl3 = row.get('image_url_3') || undefined;
      
      // Construir array de URLs (filtrar vacías)
      const imageUrls = [imageUrl1, imageUrl2, imageUrl3]
        .filter(url => url && url.trim() !== '');

      const rawProduct = {
        id: row.get('id'),
        name: row.get('name'),
        price: parseFloat(row.get('price')),
        description: row.get('description') || undefined,
        
        // Legacy: primera imagen como imageUrl
        imageUrl: imageUrls[0] || undefined,
        
        // Nuevo: todas las imágenes
        imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
        
        category: row.get('category'),
        available: row.get('available') === 'TRUE',
      };

      // Validar con Zod
      const validated = ProductSchema.parse(rawProduct);
      products.push(validated);
    }

    return products;
  }

  private async readSettings(doc: GoogleSpreadsheet): Promise<Settings> {
    const sheet = doc.sheetsByTitle['settings'];
    if (!sheet) throw new Error('Pestaña "settings" no encontrada');

    const rows = await sheet.getRows();
    const data: Record<string, any> = {};
    
    rows.forEach(row => {
      const setting = row.get('setting');
      const rawValue = row.get('value');
      if (setting) {
        const valueStr = String(rawValue).toLowerCase().trim();
        if (valueStr === 'true') data[setting] = true;
        else if (valueStr === 'false') data[setting] = false;
        else data[setting] = rawValue;
      }
    });

    return SettingsSchema.parse(data);
  }
}