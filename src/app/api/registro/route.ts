// src/app/api/registro/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validar datos básicos
    if (!data.nombre || !data.whatsapp || !data.categoria) {
      return NextResponse.json(
        { error: 'Datos incompletos' },
        { status: 400 }
      );
    }

    // Conectar a Google Sheet de registros
    const REGISTRO_SHEET_ID = process.env.REGISTRO_SHEET_ID; // Nueva variable

    if (!REGISTRO_SHEET_ID) {
      throw new Error('REGISTRO_SHEET_ID no configurado');
    }

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY_BASE64
        ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_BASE64, 'base64').toString('utf-8')
        : process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(REGISTRO_SHEET_ID, auth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    // Agregar fila con datos del vendedor
    await sheet.addRow({
      fecha: new Date().toISOString(),
      nombre: data.nombre,
      whatsapp: `591${data.whatsapp}`,
      categoria: data.categoria,
      ubicacion: data.ubicacion || '',
      status: 'pendiente',
      vendor_id: '', // Lo completarás manualmente
      sheet_id: '', // Lo completarás manualmente
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error guardando registro:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}