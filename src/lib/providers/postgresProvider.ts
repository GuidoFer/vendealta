// src/lib/providers/postgresProvider.ts
import { DataProvider } from '../dataProvider';
import { VendorProfile, Product } from '@/types/vendor';

export class PostgresProvider implements DataProvider {
  async getVendorProfile(vendorId: string): Promise<VendorProfile> {
    throw new Error('PostgresProvider no implementado aún.');
  }
  async getProducts(vendorId: string): Promise<Product[]> {
    throw new Error('PostgresProvider no implementado aún.');
  }
}