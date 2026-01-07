'use client';

import { useState } from 'react';
import { Product } from '@/types/vendor';
import { ImageModal } from './ImageModal';
// ✅ Importamos el botón de WhatsApp
import { ProductWhatsAppButton } from '../vendor/ProductWhatsAppButton';

interface ProductCardProps {
  product: Product;
  vendorPhone: string;     
  vendorName: string;      
  vendorId: string;        
}

export function ProductCard({ 
  product, 
  vendorPhone, 
  vendorName, 
  vendorId 
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100">
        
        {/* Contenedor de Imagen */}
        {hasImages ? (
          <div className="relative w-full h-48 bg-gray-200 group">
            <img
              src={images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-contain bg-gray-50 cursor-pointer transition-transform duration-500 group-hover:scale-105"
              onClick={() => setIsModalOpen(true)}
              loading="lazy"
            />

            {/* Overlay de interacción (Lupa) */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-2 shadow-lg text-gray-800">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>

            {/* Contador de fotos */}
            {hasMultipleImages && (
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
                </svg>
                {images.length}
              </div>
            )}

            {/* Navegación manual (Carrusel) */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 text-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Información */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-900 text-lg mb-1 truncate">{product.name}</h3>
          {product.description && (
            <p className="text-gray-500 text-xs line-clamp-2 mb-3 h-8">{product.description}</p>
          )}
          
          <div className="mt-auto flex justify-between items-center mb-4">
            <span className="text-xl font-extrabold text-blue-600">Bs {product.price.toFixed(2)}</span>
            <span className="text-[10px] bg-blue-50 text-blue-500 px-2 py-0.5 rounded uppercase font-bold">
              {product.category}
            </span>
          </div>

          {/* ✅ Pasamos la descripción al botón aquí */}
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
        productDescription={product.description} // ✅ También al modal
      />
    </>
  );
}