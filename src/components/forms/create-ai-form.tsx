'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Categories } from '@/app/types/categories';
import { Citys } from '@/app/types/citys';
import { useState } from 'react';
import { Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(1, 'O nome da empresa é obrigatório.'),
  phoneNumber: z.string().min(1, { message: 'O Whatsapp é obrigatório.' }),
  type: z.nativeEnum(Categories, {
    errorMap: () => ({ message: 'A categoria é obrigatória.' })
  }),
  city: z.nativeEnum(Citys, { errorMap: () => ({ message: 'A cidade é obrigatória.' }) }),
  aiName: z.string().min(1, 'O nome da IA é obrigatório.')
});

type FormData = z.infer<typeof formSchema>;

export default function CreateAiForm() {
  const { toast } = useToast();

  const router = useRouter();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);

    const randomId = Math.floor(10000000 + Math.random() * 90000000).toString();

    const instanceName = `${data.city.toLowerCase()}-${data.type.replace(/\s+/g, '-').toLowerCase()}-${data.name.replace(/\s+/g, '-').toLowerCase()}-${randomId}`;

    const url = `${process.env.NEXT_PUBLIC_STARKS_EVO_BASE_URL!}/create-instance`;

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_STARKS_EVO_API_KEY!}`
    };

    const payload = {
      name: instanceName,
      companyName: data.name,
      phoneNumber: data.phoneNumber,
      type: data.type,
      city: data.city,
      aiName: data.aiName
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error(`Falha ao criar a instancia, status: ${response.status}`);
        throw new Error(`Falha ao criar a instancia, status: ${response.status}`);
      }

      setSubmitting(false);
      router.push(`/admin/connect?id=${instanceName}`);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast({
        variant: 'destructive',
        title: 'Erro ao criar instância.',
        description: `Ocorreu um erro ao tentar criar a instância. Por favor, tente novamente.: ${error}`
      });
      throw new Error(`Failed to fetch, error: ${error}`);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Cadastro de IA</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
          {/* Nome da Empresa */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="name">Nome da Empresa</Label>
                <FormControl>
                  <Input id="name" placeholder="Digite o nome da empresa" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.name?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* phoneNumber */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="phoneNumber">Whatsapp</Label>
                <FormControl>
                  <Input id="phoneNumber" placeholder="Digite o número de Whatsapp" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.phoneNumber?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Categoria do Negócio */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="type">Categoria do Negócio</Label>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Categories.Food}>Alimentação</SelectItem>
                      <SelectItem value={Categories.Drinks}>Bebidas</SelectItem>
                      <SelectItem value={Categories.Commerce}>Comércio</SelectItem>
                      <SelectItem value={Categories.Pharmacy}>Farmácia</SelectItem>
                      <SelectItem value={Categories.Market}>Mercado</SelectItem>
                      <SelectItem value={Categories.PetShop}>PetShop</SelectItem>
                      <SelectItem value={Categories.Services}>Serviços</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{form.formState.errors.type?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Cidade */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="city">Cidade</Label>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectContent>
                        <SelectItem value={Citys.Carapicuiba}>Carapicuíba</SelectItem>
                        <SelectItem value={Citys.Chapeco}>Chapecó</SelectItem>
                        <SelectItem value={Citys.CaxiasSul}>Caxias do Sul</SelectItem>
                        <SelectItem value={Citys.Goiania}>Goiânia</SelectItem>
                        <SelectItem value={Citys.Itanhaem}>Itanhaém</SelectItem>
                        <SelectItem value={Citys.JaraguaSul}>Jaraguá do Sul</SelectItem>
                        <SelectItem value={Citys.Osasco}>Osasco</SelectItem>
                        <SelectItem value={Citys.RJ}>Rio de Janeiro</SelectItem>
                        <SelectItem value={Citys.Santos}>Santos</SelectItem>
                        <SelectItem value={Citys.SPZonaLeste}>São Paulo Zona Leste</SelectItem>
                        <SelectItem value={Citys.SPZonaNorte}>São Paulo Zona Norte</SelectItem>
                        <SelectItem value={Citys.SPZonaOeste}>São Paulo Zona Oeste</SelectItem>
                        <SelectItem value={Citys.SPZonaSul}>São Paulo Zona Sul</SelectItem>
                        <SelectItem value={Citys.TaboaoSerra}>Taboão da Serra</SelectItem>
                      </SelectContent>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage>{form.formState.errors.city?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Nome da IA */}
          <FormField
            control={form.control}
            name="aiName"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="aiName">Nome da IA</Label>
                <FormControl>
                  <Input id="aiName" placeholder="Digite o nome da IA" {...field} />
                </FormControl>
                <FormMessage>{form.formState.errors.aiName?.message}</FormMessage>
              </FormItem>
            )}
          />

          {/* Botão de Enviar */}
          <Button
            type="submit"
            className="w-full bg-green-500 text-white hover:bg-green-600"
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
                Criando...
              </span>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Criar
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
