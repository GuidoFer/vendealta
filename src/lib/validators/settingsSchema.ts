import { z } from 'zod';

export const SettingsSchema = z.object({
  qr_enabled: z.boolean(),
  theme_color: z.string().regex(/^#[0-9A-F]{6}$/i),
  show_tiktok: z.boolean(),
});