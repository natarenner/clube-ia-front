'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useRef } from 'react';
import { XIcon } from 'lucide-react';

type Props = {
  children: React.ReactNode;
};

function Modal({ children }: Props) {
  const router = useRouter();

  const overlay = useRef<any>();
  const wrapper = useRef<any>();

  // Voltar ou Fechar a Modal
  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick = useCallback(
    (e: React.MouseEvent) => {
      if (overlay.current === e.target || wrapper.current === e.target) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  // Dentro da função Modal
  return (
    <div
      ref={overlay}
      className="fixed z-50 inset-0 bg-black/40 flex items-center justify-center"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="bg-white rounded-lg shadow-lg w-full sm:w-10/12 md:w-8/12 lg:w-1/2 p-6 relative"
      >
        {/* Ícone de fechar */}
        <div className="absolute top-4 right-4 cursor-pointer" onClick={onDismiss}>
          <XIcon width="24" height="24" color="red" />
        </div>

        {/* Conteúdo do modal */}
        {children}
      </div>
    </div>
  );
}

export default Modal;
