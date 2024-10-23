import { NextResponse } from 'next/server';
import * as z from 'zod';

export async function POST(req: Request) {
  try {
    const url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Erro ao buscar a imagem');
    }

    const imageBuffer = await response.arrayBuffer();

    const base64 = Buffer.from(imageBuffer).toString('base64');

    return NextResponse.json({ base64 }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors[0].message }, { status: 400 });
    }
    return NextResponse.json(
      { message: 'Ops, algo deu errado! Por favor tente novamente ou aguarde alguns instantes!' },
      { status: 500 }
    );
  }
}
