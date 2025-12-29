import { VendorProfile, Product } from '@/types/vendor';

export interface DataProvider {
  getVendorProfile(vendorId: string): Promise<VendorProfile>;
  getProducts(vendorId: string): Promise<Product[]>;
}

export function getDataProvider(): DataProvider {
  const provider = process.env.DATA_PROVIDER || 'sheets';
  if (provider === 'sheets') {
    const { SheetsProvider } = require('./providers/sheetsProvider');
    return new SheetsProvider();
  }
  const { PostgresProvider } = require('./providers/postgresProvider');
  return new PostgresProvider();
}