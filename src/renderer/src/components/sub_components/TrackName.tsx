import React from 'react';

interface TrackNameProps {
  title: string;
  artist?: string;
}

export const TrackName: React.FC<TrackNameProps> = ({ title, artist = 'Неизвестный исполнитель' }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center select-none max-w-[85%] px-4">

      {/* Название трека */}
      <h1 className="text-neutral-100 font-bold text-[6.5cqw] sm:text-2xl md:text-3xl lg:text-4xl tracking-wide line-clamp-1 low-profile-glow">
        {title}
      </h1>

      {/* Имя автора (исполнителя) */}
      <p className="text-neutral-400 font-medium text-[4.5cqw] sm:text-lg md:text-xl mt-2 tracking-wider line-clamp-1 opacity-80">
        {artist}
      </p>

    </div>
  );
};

export default TrackName;
