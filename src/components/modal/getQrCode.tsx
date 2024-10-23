'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

type InstanceResponse = {
    code: string;
    base64: string;
    pairingCode: string | null;
    count: number;
};

type ConnectionStateResponse = {
    state: 'closed' | 'open' | 'connecting';
};

export const GetQrCode: React.FC = () => {
    const [qrCodeBase64, setQrCodeBase64] = useState<string | null>(null);
    const [isSubmitting, setSubmitting] = useState(false);
    const [isVerifying, setVerifying] = useState(false);

    const { toast } = useToast();

    const router = useRouter();
    const query = useSearchParams();

    const instanceName = query.get('id');

    useEffect(() => {
        if (!instanceName) {
            toast({
                variant: 'destructive',
                title: 'Não foi possível gerar o QR Code.',
                description: 'Instância não identificada.'
            });
        } else {
            fetchQrCode();
        }
    }, [instanceName]);

    const fetchQrCode = async () => {
        setSubmitting(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_STARKS_EVO_BASE_URL!}/instance/refresh/${instanceName}`;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STARKS_EVO_API_KEY!}`
            };
            const response = await fetch(url, {
                method: 'GET',
                headers
            });

            if (response.status === 404) {
                router.replace('/admin')
                throw new Error(`A instancia "${instanceName}" não existe.`);
            }

            if (!response.ok) {
                router.replace('/admin')
                throw new Error(`Failed to create AI Instance with status: ${response.status}`);
            }

            const instanceData: InstanceResponse = await response.json();

            setQrCodeBase64(instanceData.base64);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Erro ao buscar QR Code.',
                description: `Erro: ${error}`
            });
        } finally {
            setSubmitting(false);
        }
    };

    const verifyConnection = async () => {
        setVerifying(true);
        try {
            const url = `${process.env.NEXT_PUBLIC_STARKS_EVO_BASE_URL!}/instance/status/${instanceName}`;

            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STARKS_EVO_API_KEY!}`
            };
            const response = await fetch(url, {
                method: 'GET',
                headers
            });

            if (response.status === 404) {
                router.back()
                throw new Error(`Failed to create AI Instance with status: ${response.status}`);
            }

            if (!response.ok) {
                router.back()
                throw new Error(`Failed to verify connection with status: ${response.status}`);
            }

            const stateData: ConnectionStateResponse = await response.json();

            const { state } = stateData;

            if (state !== 'open') {
                toast({
                    variant: 'destructive',
                    title: 'Instância não conectada.',
                    description: `Por favor gere outro QR Code e escaneie novamente.`
                });
            } else {
                toast({
                    variant: 'default',
                    title: 'Conexão verificada com sucesso.'
                });
                router.push('/success')
            }
        } catch (error) {
            router.back()
            toast({
                variant: 'destructive',
                title: 'Erro ao verificar conexão.',
                description: `Erro: ${error}`
            });
        } finally {
            setVerifying(false);
        }
    };

    return (
        <>
            {qrCodeBase64 && (
                <div className="p-8 mb-8 space-y-4 flex flex-col">
                    <h2 className="text-xl mb-4 text-center">Escaneie o QR Code com seu Whatsapp:</h2>
                    <Image
                        src={`data:image/png;base64,${qrCodeBase64}`}
                        alt="QR Code"
                        width={320}
                        height={320}
                        className="mx-auto"
                    />
                    <Button
                        onClick={fetchQrCode}
                        disabled={isSubmitting}
                        className="mx-auto w-[500px] bg-green-500 hover:bg-green-600"
                    >
                        {isSubmitting ? 'Atualizando...' : 'Atualizar'}
                    </Button>
                    <Button
                        onClick={verifyConnection}
                        disabled={isVerifying}
                        className="mx-auto w-[500px] bg-blue-500 hover:bg-blue-600 mt-4"
                    >
                        {isVerifying ? 'Verificando...' : 'Verificar Conexão'}
                    </Button>
                </div>
            )}
        </>
    );
};
