// src/app/[vendorId]/loading.tsx

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-8 px-4 animate-pulse">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 bg-blue-400 rounded w-48 mb-2"></div>
          <div className="h-4 bg-blue-400 rounded w-64"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Botones skeleton */}
        <div className="space-y-3 mb-8">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Título skeleton */}
        <div className="h-8 bg-gray-200 rounded w-32 mb-6 animate-pulse"></div>

        {/* Grid de productos skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Imagen skeleton */}
              <div className="h-48 bg-gray-200 animate-pulse"></div>
              
              {/* Contenido skeleton */}
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-1 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}