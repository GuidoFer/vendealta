'use client';

import { useEffect } from 'react';

// Semáforo global para evitar la inestabilidad de los estados de React
// @ts-ignore
if (typeof window !== 'undefined' && window.isModalOpen === undefined) {
  // @ts-ignore
  window.isModalOpen = false;
}

export function ExitGuard() {
  useEffect(() => {
    window.history.replaceState({ page: 'catalog' }, '');

    const handlePopState = (event: PopStateEvent) => {
      // 🚩 REVISIÓN DEL SEMÁFORO: Si el modal estaba abierto, ignoramos la alerta
      // @ts-ignore
      if (window.isModalOpen) {
        return;
      }

      const confirmExit = window.confirm("¿Quieres salir del catálogo?");

      if (confirmExit) {
        window.history.back();
      } else {
        window.history.pushState({ page: 'catalog' }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return null;
}