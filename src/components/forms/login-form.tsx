'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { User, Lock, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const schema = z.object({
  username: z.string().min(1, { message: 'Você precisa digitar o seu nome de usuário.' }),
  password: z.string().min(1, { message: 'Você precisa digitar a sua senha.' })
});

interface FormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

    const result = await signIn('credentials', {
      ...data,
      redirect: false
    });

    setSubmitting(false);

    if (result?.error) {
      console.error(result);
      if (result.error === 'CredentialsSignin') {
        setError('Usuário ou Senha inválidos.');
      }
      return;
    }

    router.replace('/admin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Clube Delivery</h2>
          <p className="mt-2 text-gray-600">Faça login para acessar o chatbot de I.A.</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo de Usuário */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="username">Usuário</Label>
                  <FormControl>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="username"
                        placeholder="Seu nome de usuário"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  {/* Exibição da mensagem de erro */}
                  <FormMessage>{form.formState.errors.username?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Campo de Senha */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="password">Senha</Label>
                  <FormControl>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-500" />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Sua senha"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  {/* Exibição da mensagem de erro */}
                  <FormMessage>{form.formState.errors.password?.message}</FormMessage>
                </FormItem>
              )}
            />
            {/* Botão de envio */}
            <Button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 text-white bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
