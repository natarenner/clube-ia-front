import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from '@/lib/zod-env';

const sessionTokenCookie = env.SESSION_COOKIE_NAME;

function validateAuthHeader(authHeader: string | null): NextResponse | null {
  if (!authHeader) {
    console.error('Unauthorized: Cookies and Token are not provided.');
    return NextResponse.json(
      { error: 'Unauthorized: Cookies and token are not provided' },
      { status: 401 }
    );
  }

  const secretKey = 'Bearer ' + env.SECRET_KEY;
  if (authHeader !== secretKey) {
    console.error('Unauthorized: Invalid Token');
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  return null;
}

export async function middleware(req: NextRequest) {
  try {
    const cookies = req.cookies.get(sessionTokenCookie)?.value;

    if (!cookies) {
      const authHeader = req.headers.get('Authorization');
      const authValidationResult = validateAuthHeader(authHeader);

      if (authValidationResult) {
        return authValidationResult;
      }
      return NextResponse.next();
    }
    return NextResponse.next();
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const config = {
  matcher: []
};
