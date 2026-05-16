import { useState, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';




import OnlineIcon from '../icons/Online.svg?react';




// ЗАГЛУШКИ ПЕСЕН
const mockSongs = Array.from({ length: 600 }, (_, index) => ({
  id: index + 1,
  title: `Song Title ${index + 1}`,
  artist: `Artist Name ${index + 1}`,
  status: index % 3 === 0 ? "on" : "off", // Каждая третья песня будет "on"
  duration: `3:${String(Math.floor(Math.random() * 50) + 10).padStart(2, '0')}`, // Рандомная длительность
}));




export default function Library() {
  // Общие стили: рамка inside, цвета, скругление и центрирование текста
  const elementStyle = "bg-[#06003E]/50 border border-[#FFC7FF]/100 rounded-[30px] box-border text-white flex items-center justify-center select-none text-center px-2 antialiased bg-clip-padding";

  const [isOnline, setIsOnline] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');


  const filteredSongs = mockSongs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredSongs.length, // Сколько всего элементов в текущем списке
    getScrollElement: () => parentRef.current, // Элемент, который скроллится
    estimateSize: () => 88, // Примерная высота одной строчки трека в пикселях (72px картинка + отступы)
    overscan: 5, // Сколько карточек сверху и снизу экрана держать в памяти про запас для плавной прокрутки
  });


  return (
    <div
      className="
        w-[84%] 
        h-[80%]

        max-[1050px]:w-[94%]
        max-[1050px]:h-[94%]

        bg-[#06003E]/50 
        border-2 border-[#FFC7FF] 
        rounded-[30px]
        box-border
        p-[2%]
        flex
        flex-col
        gap-[1.5%]
        antialiased
        bg-clip-padding
        backdrop-blur-sm
        shadow-[0_0_30px_5px_rgba(255,199,255,0.4)]
      "
      style={{
        fontSize: 'clamp(18px, 1.4vw, 30px)'
      }}
    >
      {/* ВЫПАДАЮЩИЕ  СПИСКИ */}
      <div className="w-full h-[10%] flex justify-between gap-[1.5%] portrait:h-25 portrait:text-[30px]">
        {/* INSTR/SONG */}
        <div className={elementStyle} style={{ width: '40%' }}>
          Instruments
        </div>

        {/* GENRE */}
        <div className={elementStyle} style={{ width: '40%' }}>
          My everything
        </div>

        {/* LANGUAGE */}
        <div className={elementStyle} style={{ width: '20%' }}>
          Any
        </div>
      </div>

      {/* ПОИСК ОНЛАЙН И ОФФЛАЙН */}
      <div className="w-full h-[8%] flex justify-between gap-[1.5%] portrait:h-20 portrait:text-[30px]">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`
            ${elementStyle} 
            placeholder:text-white/80
            focus:outline-none 
            focus:border-[#FFC7FF] 
            focus:shadow-[0_0_15px_rgba(255,199,255,0.3)]
            transition-all
            duration-1000
            text-left
            px-6
          `}
          style={{ width: '90%' }}
        />

        {/* ONLINE/OFFLINE */}
        <button
          type="button"
          onClick={() => {
            setIsOnline(!isOnline);
            console.log("Статус изменен на:", !isOnline ? "Online" : "Offline");
          }}
          className={`
            ${elementStyle} 
            h-full
            aspect-square
            rounded-full! 
            cursor-pointer
            transition-all
            duration-500
            focus:outline-none
            ${isOnline
              ? 'bg-[#FFC7FF]/15 border-[#FFC7FF] shadow-[0_0_20px_rgba(255,199,255,0.6),inset_0_0_12px_rgba(255,199,255,0.4)]'
              : 'bg-[#06003E]/50 border-[#FFC7FF]/20 shadow-none'
            }
          `}
          style={{ width: 'auto' }}
        >
          <OnlineIcon
            className={`
              w-[75%] h-[75%] 
              fill-current stroke-current 
              transition-all 
              duration-1000
              ${isOnline
                ? 'text-[#FFC7FF] filter:drop-shadow(0_0_10px_rgba(255,199,255,1))_drop-shadow(0_0_25px_rgba(255,199,255,0.6))] scale-105'
                : 'text-[#FFC7FF]/30 filter-none scale-100'
              }
            `}
          />
        </button>
      </div>


      {/* ---------------------------------------------------------------------------------------------------------------- */}
      {/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}
      {/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}
      {/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}
      {/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}
      {/* ---------------------------------------------------------------------------------------------------------------- */}

      <div className="flex-1 w-full overflow-y-auto flex flex-col custom-scrollbar gap-2">
        {filteredSongs.map((song) => (
          <div
            key={song.id}
            className="
            w-full shrink-0
            box-border
            px-2
            py-2
            grid grid-cols-[72px_1fr_48px_48px_auto]
            items-center
            select-none
            gap-3
            hover:bg-[#FFC7FF]/20
            rounded-3xl
            transition-colors
            duration-400
          "
          >
            {/* 1. Квадратная обложка с закруглением */}
            <div className="w-18 h-18 bg-[#1e1e1e] rounded-3xl overflow-hidden shrink-0">
              <img
                src="../../../../resources/white.png"
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 2. Блок текстов: Название (крупное) и Автор (мелкий под ним) */}
            <div className="flex flex-col text-left justify-center pl-1 min-w-0">
              <span className="text-[#FFC7FF] font-bold tracking-wide neon-text-glow text-[22px] truncate">
                {song.title}
              </span>
              <span className="text-[#FFC7FF]/60 text-[16px] leading-tight font-semibold truncate mt-1">
                {song.artist}
              </span>
            </div>

            {/* 3. Статус on / off в оригинальном стиле */}
            <div className="w-full h-12 flex items-center justify-center text-[#FFC7FF] neon-text-glow font-medium text-[20px]">
              <OnlineIcon className="w-6 h-6 text-[#FFC7FF] drop-shadow-[0_0_8px_rgba(255,199,255,0.8)]" />
            </div>


            {/* 5. Кнопка плюс (тонкий аккуратный кастомный плюс) */}
            <div className="w-full h-12 flex items-center justify-center">
              <button className="w-12 h-12 text-[#FFC7FF] text-[32px] font-light cursor-pointer flex items-center justify-center pb-1.5 leading-none">
                +
              </button>
            </div>

            {/* 6. Время трека с неоновым свечением */}
            <div className="text-[#FFC7FF] neon-text-glow font-bold text-[22px] text-right font-mono tracking-tighter">
              {song.duration}
            </div>
          </div>))}

        {filteredSongs.length === 0 && (
          <div className="text-white/40 text-center py-8 text-[20px]">
            No songs found
          </div>)}
      </div>
    </div >)
}