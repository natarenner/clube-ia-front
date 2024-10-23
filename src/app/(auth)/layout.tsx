import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session: any = await getServerSession(nextAuthOptions);

  if (session) {
    redirect(`/admin`);
  }

  return <>{children}</>;
}

//ADICIONAR O ERRO DE VALIDAÇAO COM JWT DO COOKIE X SECRET KEY E ADICIONAR TOASTS
