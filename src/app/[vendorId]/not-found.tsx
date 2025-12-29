// src/app/[vendorId]/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icono de error */}
        <div className="mb-6">
          <svg
            className="mx-auto h-24 w-24 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Mensaje */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Vendedor no encontrado
        </h1>
        <p className="text-gray-600 mb-8">
          El perfil que buscas no existe o fue desactivado. Verifica que el código QR sea correcto.
        </p>

        {/* Botón de retorno */}
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md hover:shadow-lg"
        >
          Volver al inicio
        </Link>

        {/* Información adicional */}
        <div className="mt-8 text-sm text-gray-500">
          <p>¿Eres un vendedor?</p>
          <p className="mt-1">
            Contacta al administrador para activar tu perfil
          </p>
        </div>
      </div>
    </div>
  );
}