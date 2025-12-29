// src/components/vendor/TikTokLink.tsx

'use client';

import { AnalyticsEvents } from '@/lib/utils/analytics';

interface TikTokLinkProps {
  username: string;
  vendorName: string;
  vendorId: string;
}

export function TikTokLink({ username, vendorName, vendorId }: TikTokLinkProps) {
  const handleClick = () => {
    // Remover @ si existe
    const cleanUsername = username.startsWith('@') ? username.slice(1) : username;
    const url = `https://www.tiktok.com/@${cleanUsername}`;

    // Track evento
    AnalyticsEvents.tiktokClick(vendorName, vendorId, cleanUsername);

    // Abrir TikTok
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-md hover:shadow-lg"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
      </svg>
      Ver mi TikTok
    </button>
  );
}