// src/app/api/vendor/[vendorId]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getDataProvider } from '@/lib/dataProvider';

// CRÍTICO: Edge Runtime para baja latencia
//export const runtime = 'edge';

// Cache: 5 minutos
export const revalidate = 300;

interface RouteContext {
  params: Promise<{ vendorId: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    // Next.js 15: params es Promise
    const { vendorId } = await context.params;

    // Validar formato de vendorId
    if (!/^[a-z0-9-]+$/.test(vendorId)) {
      return NextResponse.json(
        { error: 'Invalid vendor ID format. Use lowercase, numbers, and hyphens only.' },
        { status: 400 }
      );
    }

    // Obtener data via DataProvider
    const provider = getDataProvider();
    const vendor = await provider.getVendorProfile(vendorId);

    // Filtrar solo datos públicos
    const publicData = {
      vendor_id: vendor.vendor_id,
      name: vendor.name,
      whatsapp: vendor.whatsapp,
      tiktok: vendor.tiktok || null,
      bio: vendor.bio || null,
      products: vendor.products
        .filter(p => p.available)
        .map(p => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description || null,
          imageUrl: p.imageUrl || null,
          category: p.category,
        })),
      settings: {
        theme_color: vendor.settings.theme_color,
        show_tiktok: vendor.settings.show_tiktok,
      },
      lastUpdated: vendor.lastUpdated.toISOString(),
    };

    // Headers de caché agresivo
    return NextResponse.json(publicData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Content-Type': 'application/json',
        'X-Vendor-Id': vendorId,
      },
    });

  } catch (error) {
    console.error('[API] Error fetching vendor:', error);

    // Distinguir entre "no encontrado" vs "error de servidor"
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isNotFound = errorMessage.includes('not found') || errorMessage.includes('Sheet not found');

    if (isNotFound) {
      return NextResponse.json(
        { error: 'Vendor not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}