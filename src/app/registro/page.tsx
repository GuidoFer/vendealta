// src/app/registro/page.tsx

'use client';

import { useState } from 'react';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    categoria: 'ropa',
    ubicacion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);

        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'registro_vendedor', {
            event_category: 'conversion',
            value: 1,
          });
        }
      } else {
        alert('Hubo un error. Intenta de nuevo o contáctanos por WhatsApp.');
      }
    } catch (error) {
      alert('Hubo un error. Intenta de nuevo o contáctanos por WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Registro Exitoso!
          </h1>

          <p className="text-gray-600 mb-6">
            Gracias <strong>{formData.nombre}</strong>, recibimos tus datos.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
            <p className="text-sm text-gray-700">
              📱 <strong>Próximos pasos:</strong>
            </p>
            <ol className="text-sm text-gray-600 mt-2 space-y-1 list-decimal list-inside">
              <li>Crearemos tu catálogo en las próximas 24 horas</li>
              <li>Te enviaremos un mensaje por WhatsApp con tu enlace</li>
              <li>Podrás empezar a agregar tus productos</li>
            </ol>
          </div>

          {/* ✅ FIX APLICADO AQUÍ */}
          <a
            href="/"
            className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Crea tu Catálogo Digital
          </h1>
          <p className="text-lg text-gray-600">
            Completa este formulario y tendrás tu catálogo listo en 24 horas
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tu nombre o nombre de tu negocio *
              </label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                placeholder="Ej: María López / Tienda Mary"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tu número de WhatsApp *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                  +591
                </span>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{8}"
                  value={formData.whatsapp}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsapp: e.target.value })
                  }
                  placeholder="76543210"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Te contactaremos por este número
              </p>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Qué vendes? *
              </label>
              <select
                required
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="ropa">Ropa</option>
                <option value="calzado">Calzado</option>
                <option value="accesorios">Accesorios</option>
                <option value="otros">Otros</option>
              </select>
            </div>

            {/* Ubicación */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ¿Dónde vendes? (opcional)
              </label>
              <input
                type="text"
                value={formData.ubicacion}
                onChange={(e) =>
                  setFormData({ ...formData, ubicacion: e.target.value })
                }
                placeholder="Ej: El Alto, 16 de Julio"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? 'Enviando...' : '🚀 Crear mi Catálogo Gratis'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Al registrarte, aceptas que contactemos por WhatsApp
            </p>
          </form>
        </div>

        {/* Beneficios */}
        <div className="mt-10 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-2">⚡</div>
            <h3 className="font-semibold text-gray-900">Rápido</h3>
            <p className="text-sm text-gray-600">Listo en 24 horas</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <h3 className="font-semibold text-gray-900">Gratis</h3>
            <p className="text-sm text-gray-600">Sin costo mensual</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900">Fácil</h3>
            <p className="text-sm text-gray-600">Lo actualizas tú</p>
          </div>
        </div>
      </div>
    </div>
  );
}
