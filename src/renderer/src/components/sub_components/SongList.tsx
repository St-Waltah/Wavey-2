import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import OnlineIcon from '../../icons/Online.svg?react';

interface Song {
  id: number;
  title: string;
  artist: string;
  status: string;
  duration: string;
}

interface SongListProps {
  filteredSongs: Song[];
}

export default function SongList({ filteredSongs }: SongListProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Переносим хук виртуализации сюда, так как он завязан исключительно на отображение списка
  const rowVirtualizer = useVirtualizer({
    count: filteredSongs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 88, // Высота строчки (72px картинка + отступы)
    overscan: 5, // Буферные карточки для плавной прокрутки
  });

  return (
    <div
      ref={parentRef}
      className="flex-1 w-full overflow-y-auto custom-scrollbar relative"
    >
      {/* Внутренний контейнер, создающий иллюзию полной высоты скролла */}
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Рендерим ТОЛЬКО те элементы, которые сейчас видны в окне */}
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const song = filteredSongs[virtualItem.index];

          // Защита на случай, если индекс временно вышел за пределы массива при фильтрации
          if (!song) return null;

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              ref={rowVirtualizer.measureElement}
              className="w-full shrink-0 box-border px-2 py-2 grid grid-cols-[72px_1fr_48px_48px_auto] items-center select-none gap-3 hover:bg-[#FFC7FF]/20 rounded-3xl transition-colors duration-400"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${virtualItem.start}px)`, // Сдвигаем карточку на её место
              }}
            >
              {/* 1. Квадратная обложка трека */}
              <div className="w-18 h-18 bg-[#1e1e1e] rounded-3xl overflow-hidden shrink-0">
                <img
                  src="../../../../resources/white.png"
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 2. Блок текстов: Название и Автор */}
              <div className="flex flex-col text-left justify-center pl-1 min-w-0">
                <span className="text-[#FFC7FF] font-bold tracking-wide neon-text-glow text-[22px] truncate">
                  {song.title}
                </span>
                <span className="text-[#FFC7FF]/60 text-[16px] leading-tight font-semibold truncate mt-1">
                  {song.artist}
                </span>
              </div>

              {/* 3. Статус on / off */}
              <div className="w-full h-12 flex items-center justify-center text-[#FFC7FF] neon-text-glow font-medium text-[20px]">
                {song.status === 'on' && (
                  <OnlineIcon className="w-6 h-6 text-[#FFC7FF] drop-shadow-[0_0_8px_rgba(255,199,255,0.8)]" />
                )}
              </div>

              {/* 5. Кнопка плюс */}
              <div className="w-full h-12 flex items-center justify-center">
                <button
                  type="button"
                  className="w-12 h-12 text-[#FFC7FF] text-[32px] font-light cursor-pointer flex items-center justify-center pb-1.5 leading-none"
                >
                  +
                </button>
              </div>

              {/* 6. Время трека с неоновым свечением */}
              <div className="text-[#FFC7FF] neon-text-glow font-bold text-[22px] text-right font-mono tracking-tighter">
                {song.duration}
              </div>
            </div>
          );
        })}
      </div>

      {/* Подсказка по центру контейнера, если поиск ничего не выдал */}
      {filteredSongs.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-white/40 text-[20px] pointer-events-none">
          No songs found
        </div>
      )}
    </div>
  );
}