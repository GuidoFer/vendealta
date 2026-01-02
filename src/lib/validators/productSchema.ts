// src/lib/validators/productSchema.ts

import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  description: z.string().max(500).optional(),
  
  // ✅ NUEVO: Soporta múltiples imágenes
  imageUrl: z.string().url().optional(), // Legacy (single)
  imageUrls: z.array(z.string().url()).optional(), // Nuevo (multiple)
  
  category: z.enum(['ropa', 'calzado', 'accesorios', 'otros']),
  available: z.boolean(),
});

export type ProductInput = z.infer<typeof ProductSchema>;