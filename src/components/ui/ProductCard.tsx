'use client';

import { useState } from 'react';
import { Product } from '@/types/vendor';
import { ImageModal } from './ImageModal';
import { ProductWhatsAppButton } from '../vendor/ProductWhatsAppButton';

interface ProductCardProps {
  product: Product;
  vendorPhone: string;     
  vendorName: string;      
  vendorId: string;
  vendorColor?: string; // ✅ Nueva Prop
}

export function ProductCard({ 
  product, 
  vendorPhone, 
  vendorName, 
  vendorId,
  vendorColor 
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : product.imageUrl
    ? [product.imageUrl]
    : [];

  const hasImages = images.length > 0;
  const hasMultipleImages = images.length > 1;

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="bg-white rounded-[2rem] shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
        
        {/* Contenedor de Imagen - Imagen Completa */}
        {hasImages ? (
          <div className="relative w-full h-64 bg-[#fdfdfd] group">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain cursor-pointer transition-transform duration-500 group-hover:scale-105 p-4"
              onClick={() => setIsModalOpen(true)}
              loading="lazy"
            />

            {hasMultipleImages && (
              <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}

            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-64 bg-gray-50 flex items-center justify-center">
            <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Sin imagen</span>
          </div>
        )}

        {/* Información */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
            <h3 className="font-bold text-gray-900 text-lg leading-tight truncate">{product.name}</h3>
          </div>

          {product.description && (
            <p className="text-gray-500 text-xs line-clamp-2 mb-4 h-8 leading-relaxed">{product.description}</p>
          )}
          
          <div className="mt-auto flex justify-between items-center mb-5">
            <span className="text-2xl font-black" style={{ color: vendorColor || '#111827' }}>
              Bs {product.price.toFixed(2)}
            </span>
          </div>

          {/* BOTÓN WHATSAPP (SIEMPRE VERDE) */}
          <ProductWhatsAppButton
            phone={vendorPhone}
            vendorName={vendorName}
            vendorId={vendorId}
            productName={product.name}
            productPrice={product.price}
            productDescription={product.description} 
          />
        </div>
      </div>

      <ImageModal
        images={images}
        currentIndex={currentImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
        productName={product.name}
        vendorPhone={vendorPhone}      
        vendorName={vendorName}         
        vendorId={vendorId}             
        productPrice={product.price}
        productDescription={product.description}
      />
    </>
  );
}