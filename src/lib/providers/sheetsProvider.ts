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
    // Validar que existan las ENV variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('Missing Google Service Account credentials in ENV');
    }

    this.serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Reemplaza los saltos de línea literales para que la llave sea válida
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  }

  /**
   * Obtiene el perfil completo leyendo las 3 pestañas del Google Sheet
   */
  async getVendorProfile(vendorId: string): Promise<VendorProfile> {
    try {
      const sheetId = await this.findSheetByVendorId(vendorId);
      
      if (!sheetId) {
        throw new Error(`Sheet ID no mapeado para el vendedor: ${vendorId}`);
      }

      const doc = new GoogleSpreadsheet(sheetId, this.serviceAccountAuth);
      await doc.loadInfo();

      // 1. Leer y validar Metadatos
      const vendorMeta = await this.readVendorMeta(doc);
      
      // 2. Leer y validar Productos
      const products = await this.readProducts(doc);
      
      // 3. Leer y validar Settings
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

  /**
   * Busca el ID del Sheet en la variable de entorno SHEETS_MAPPING
   * Formato esperado: juan-perez:ID123,maria-luna:ID456
   */
  private async findSheetByVendorId(vendorId: string): Promise<string | null> {
    const mapping = process.env.SHEETS_MAPPING || '';
    const entries = mapping.split(',');
    
    for (const entry of entries) {
      const [id, sheetId] = entry.split(':');
      if (id.trim() === vendorId) {
        return sheetId.trim();
      }
    }
    return null;
  }

  /**
   * Tab "vendor_meta": Convierte pares Key-Value a objeto
   */
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

  /**
   * Tab "products": Convierte cada fila en un producto
   */
  private async readProducts(doc: GoogleSpreadsheet): Promise<Product[]> {
    const sheet = doc.sheetsByTitle['products'];
    if (!sheet) throw new Error('Pestaña "products" no encontrada');

    const rows = await sheet.getRows();
    const products: Product[] = [];

    for (const row of rows) {
      const rawProduct = {
        id: row.get('id'),
        name: row.get('name'),
        price: parseFloat(row.get('price')),
        description: row.get('description') || undefined,
        imageUrl: row.get('image_url') || undefined,
        category: row.get('category'),
        available: String(row.get('available')).toUpperCase().trim() === 'TRUE',
      };

      // Validar cada producto individualmente
      const validated = ProductSchema.parse(rawProduct);
      products.push(validated);
    }
    return products;
  }

  /**
   * Tab "settings": Convierte configuraciones a tipos booleano/string reales
   */
  private async readSettings(doc: GoogleSpreadsheet): Promise<Settings> {
    const sheet = doc.sheetsByTitle['settings'];
    if (!sheet) throw new Error('Pestaña "settings" no encontrada');

    const rows = await sheet.getRows();
    const data: Record<string, any> = {};
    
    rows.forEach(row => {
      const setting = row.get('setting');
      const rawValue = row.get('value');
      
      if (setting) {
        // Normalizamos el valor a minúsculas para comparar
        const valueStr = String(rawValue).toLowerCase().trim();
        
        if (valueStr === 'true') {
          data[setting] = true;
        } else if (valueStr === 'false') {
          data[setting] = false;
        } else {
          data[setting] = rawValue;
        }
      }
    });

    // Debug opcional en consola de Kali para ver qué llega:
    // console.log("Datos de settings procesados:", data);

    return SettingsSchema.parse(data);
  }
}