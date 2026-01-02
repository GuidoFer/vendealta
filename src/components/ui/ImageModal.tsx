'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  productName: string;
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  productName,
}: ImageModalProps) {
  
  useEffect(() => {
    if (!isOpen) return;

    // 1. Bloquear el scroll del cuerpo
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // 2. Creamos un estado "dummy" en el historial para capturar el botón atrás
    // Usamos pushState con un objeto de identificación
    window.history.pushState({ isModal: true }, '');

    const handlePopState = (event: PopStateEvent) => {
      // Si el usuario presiona atrás, cerramos el modal sin navegar
      onClose();
    };

    // Escuchamos el botón atrás
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = originalStyle;
      
      // 3. SI el modal se cierra manualmente (X o click fuera), 
      // limpiamos el estado dummy que creamos para no ensuciar el historial
      if (window.history.state?.isModal) {
        window.history.back();
      }
    };
    // IMPORTANTE: Solo dependemos de isOpen. 
    // Al cambiar fotos (currentIndex), este efecto NO se reinicia.
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-0"
      onClick={onClose}
    >
      {/* Botón cerrar */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white text-4xl font-light z-[1000] w-12 h-12 flex items-center justify-center bg-black/20 rounded-full"
      >
        ×
      </button>

      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[80vh]">
          <Image
            src={images[currentIndex]}
            alt={productName}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {/* Navegación */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full z-[1000]"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white p-4 rounded-full z-[1000]"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Contador */}
        {hasMultiple && (
          <div className="absolute top-6 left-6 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-[1000]">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
}