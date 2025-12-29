// src/app/api/vendor/[vendorId]/products/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getDataProvider } from '@/lib/dataProvider';

//export const runtime = 'edge';
export const revalidate = 300;

interface RouteContext {
  params: Promise<{ vendorId: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { vendorId } = await context.params;

    if (!/^[a-z0-9-]+$/.test(vendorId)) {
      return NextResponse.json(
        { error: 'Invalid vendor ID format' },
        { status: 400 }
      );
    }

    const provider = getDataProvider();
    const products = await provider.getProducts(vendorId);

    // Filtrar solo disponibles
    const availableProducts = products
      .filter(p => p.available)
      .map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description || null,
        imageUrl: p.imageUrl || null,
        category: p.category,
      }));

    return NextResponse.json(
      { products: availableProducts },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );

  } catch (error) {
    console.error('[API] Error fetching products:', error);
    return NextResponse.json(
      { error: 'Products not found' },
      { status: 404 }
    );
  }
}