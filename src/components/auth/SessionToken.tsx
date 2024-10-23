import { cookies } from 'next/headers';

export default function SessionToken() {
  const sessionTokenFromCookie = cookies().get('next-auth.session-token');

  if (!sessionTokenFromCookie) {
    return null;
  }

  return `Bearer ${sessionTokenFromCookie}`;
}
