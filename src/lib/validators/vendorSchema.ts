import { z } from 'zod';

export const VendorMetaSchema = z.object({
  vendor_id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(3),
  whatsapp: z.string().regex(/^591[0-9]{8}$/),
  tiktok: z.string().startsWith('@').optional(),
  bio: z.string().optional(),
  status: z.enum(['active', 'inactive', 'pending']),
});