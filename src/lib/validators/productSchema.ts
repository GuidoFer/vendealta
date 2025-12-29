import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  description: z.string().max(500).optional(),
  imageUrl: z.string().url().optional(),
  category: z.enum(['ropa', 'calzado', 'accesorios', 'otros']),
  available: z.boolean(),
});