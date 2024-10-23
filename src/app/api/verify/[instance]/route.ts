import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const instance = searchParams.get('instance');

  const state = 'open';

  return NextResponse.json({ state }, { status: 200 });
}
