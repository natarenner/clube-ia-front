'use client'
import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'confetti-explosion-react';

export default function SuccessPage() {
    const [isExploding, setIsExploding] = useState(false);

    useEffect(() => {
        setIsExploding(true);

        const timer = setTimeout(() => setIsExploding(false), 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen relative">
            {isExploding && (
                <ConfettiExplosion
                    force={0.7}
                    duration={3000}
                    particleCount={300}
                    width={1500}
                />
            )}
            <div className="z-10 text-center">
                <h1 className="text-6xl font-bold text-green-600 mb-6">🎉 Conexão Bem Sucedida! 🎉</h1>
                <h2 className="text-2xl text-gray-800">
                    Sua IA está conectada e pronta para começar! 🚀💡
                </h2>
            </div>
        </div>
    );
}
