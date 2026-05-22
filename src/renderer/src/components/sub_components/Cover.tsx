import React from 'react';
import Music from '../../icons/Online.svg?react';

interface CoverProps {
  coverUrl?: string | null;
  title?: string;
}

export const Cover: React.FC<CoverProps> = ({ coverUrl, title = 'Track Cover' }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative aspect-square w-full h-full rounded-full border border-amber-400 overflow-hidden shadow-2xl bg-neutral-800 flex items-center justify-center transition-all duration-500 ease-in-out">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover select-none pointer-events-none"
            loading="lazy"
          />
        ) : (
          /* Кастомная заглушка (Placeholder) */
          <div className="flex flex-col items-center justify-center text-neutral-400 gap-3 animate-pulse">
            <Music className="size-[15%] min-size-[40px] max-size-[100px] stroke-[1.5]" />
            <span className="text-xs font-medium tracking-wider opacity-60 uppercase select-none">
              Нет обложки
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cover;