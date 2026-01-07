'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { ProductWhatsAppButton } from '../vendor/ProductWhatsAppButton';

interface ImageModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  productName: string;
  // ✅ Props actualizadas
  vendorPhone?: string;
  vendorName?: string;
  vendorId?: string;
  productPrice?: number;
  productDescription?: string; // ✅ NUEVO
}

export function ImageModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
  productName,
  vendorPhone,
  vendorName,
  vendorId,
  productPrice,
  productDescription, // ✅ NUEVO
}: ImageModalProps) {
  
  useEffect(() => {
    if (!isOpen) return;

    // @ts-ignore
    window.isModalOpen = true;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    window.history.pushState({ isModal: true }, '');

    const handlePopState = () => {
      // @ts-ignore
      window.isModalOpen = false; 
      onClose();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.body.style.overflow = originalStyle;
      
      if (window.history.state?.isModal) {
        // @ts-ignore
        window.isModalOpen = true; 
        window.history.back();
        setTimeout(() => { 
          // @ts-ignore
          window.isModalOpen = false; 
        }, 100);
      } else {
        // @ts-ignore
        window.isModalOpen = false;
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasMultiple = images.length > 1;

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center p-0 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Botón Cerrar */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-6 right-6 text-white text-4xl font-light z-[1000] w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        ×
      </button>

      {/* Información Superior */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[1000] text-white text-center w-full px-4">
        <h3 className="font-bold text-lg">{productName}</h3>
        {productPrice && <p className="text-green-400 font-bold">Bs {productPrice.toFixed(2)}</p>}
      </div>

      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-[65vh]">
          <Image
            src={images[currentIndex]}
            alt={productName}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>

        {hasMultiple && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full z-[1000] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full z-[1000] transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Contador */}
        <div className="absolute top-6 left-6 bg-white/10 text-white px-3 py-1 rounded-full text-xs z-[1000]">
          {currentIndex + 1} / {images.length}
        </div>

        {/* ✅ Botón de WhatsApp con DESCRIPCIÓN */}
        {vendorPhone && vendorName && vendorId && productPrice && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-[280px] px-4">
            <ProductWhatsAppButton
              phone={vendorPhone}
              vendorName={vendorName}
              vendorId={vendorId}
              productName={productName}
              productPrice={productPrice}
              productDescription={productDescription}
            />
          </div>
        )}
      </div>
    </div>
  );
}