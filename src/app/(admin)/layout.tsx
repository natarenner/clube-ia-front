import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AuthProvider from '@/components/auth/AuthProvider';

interface PrivateLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: 'Admin'
};

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <AuthProvider>
        <div className="flex">
          <main className="flex-1">
            <>{children}</>
          </main>
        </div>
      </AuthProvider>
    </>
  );
}
