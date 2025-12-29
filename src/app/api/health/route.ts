// src/app/api/health/route.ts

import { NextResponse } from 'next/server';

//export const runtime = 'edge';

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    dataProvider: process.env.DATA_PROVIDER || 'sheets',
    version: '1.0.0',
  };

  return NextResponse.json(health, {
    status: 200,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}