# Analytics Implementation - VendeAlta

## Eventos Tracked

### 1. whatsapp_click
**Disparo:** Click en botón "Contactar por WhatsApp"  
**Categoría:** conversion  
**Parámetros:**
- `vendor_id`: ID del vendedor
- `event_label`: Nombre del vendedor
- `value`: 1

**Propósito:** Medir conversión principal (contacto directo)

---

### 2. tiktok_click
**Disparo:** Click en botón "Ver mi TikTok"  
**Categoría:** engagement  
**Parámetros:**
- `vendor_id`: ID del vendedor
- `event_label`: Nombre del vendedor
- `tiktok_username`: Usuario de TikTok

**Propósito:** Medir engagement secundario (redes sociales)

---

### 3. qr_downloaded
**Disparo:** Click en botón "Descargar QR"  
**Categoría:** utility  
**Parámetros:**
- `vendor_id`: ID del vendedor

**Propósito:** Medir adopción de herramienta QR

---

### 4. page_view (automático)
**Disparo:** Navegación a cualquier página  
**Categoría:** engagement  
**Parámetros:**
- `page_path`: Ruta visitada

**Propósito:** Medir tráfico general y por vendedor

---

## Métricas Clave para MVP

### Conversión principal:
`(whatsapp_click / page_view por vendedor) * 100`

Meta: > 15%

### Engagement secundario:
`(tiktok_click / page_view por vendedor) * 100`

Meta: > 5%

### Adopción de QR:
Total de `qr_downloaded` events

Meta: 1 descarga por vendedor activo

---

## Configuración en Vercel (Producción)

Agregar variable de entorno:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Redeploy para activar tracking.