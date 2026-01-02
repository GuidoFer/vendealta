'use client';

import { useEffect } from 'react';

export function ExitGuard() {
  useEffect(() => {
    // 1. Forzamos una entrada limpia en el historial
    // Esto asegura que 'atrás' tenga algo que disparar dentro de la app
    const initHistory = () => {
      if (window.history.state?.page !== 'catalog') {
        window.history.pushState({ page: 'catalog' }, '');
      }
    };

    initHistory();

    const handlePopState = (event: PopStateEvent) => {
      // 🚩 REVISIÓN DEL SEMÁFORO (Modales)
      // @ts-ignore
      if (window.isModalOpen) {
        return;
      }

      // 2. Si el usuario intenta salir (presiona atrás en el catálogo)
      const confirmExit = window.confirm("¿Quieres salir del catálogo de este vendedor?");

      if (confirmExit) {
        // Usamos una navegación real hacia atrás para salir del sitio
        // Opcional: podrías usar window.close() si es un popup, 
        // pero back() es lo estándar para el QR.
        window.history.back();
      } else {
        // Si cancela, re-inyectamos el estado para bloquear el siguiente intento
        window.history.pushState({ page: 'catalog' }, '');
      }
    };

    // Escuchamos el evento de retroceso
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}