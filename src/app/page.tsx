// src/app/page.tsx

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            VendeAlta
          </h1>
          <p className="text-xl text-gray-600">
            Tu catálogo digital al alcance de un QR
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="font-semibold text-lg mb-2">Simple y Rápido</h3>
            <p className="text-gray-600 text-sm">
              Escanean tu QR y ven tu catálogo completo al instante
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-semibold text-lg mb-2">Contacto Directo</h3>
            <p className="text-gray-600 text-sm">
              Conecta con clientes vía WhatsApp con un solo click
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-semibold text-lg mb-2">Actualiza Fácil</h3>
            <p className="text-gray-600 text-sm">
              Edita tu catálogo desde tu celular cuando quieras
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Eres vendedor ambulante?
          </h2>
          <p className="text-gray-600 mb-6">
            Crea tu perfil digital y llega a más clientes
          </p>

          <a
            href="https://wa.me/59176543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Contactar por WhatsApp
          </a>
        </div>

        {/* Demo link */}
        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm mb-2">Ver ejemplo:</p>
          <Link
            href="/juan-perez"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Catálogo de Juan Pérez →
          </Link>
        </div>
      </div>
    </div>
  );
}
