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
  const elementStyle = "bg-[#06003E]/50 border border-[#FFC7FF] rounded-[30px] box-border text-white flex items-center justify-center select-none text-center px-2";
  return (
    <div
      className="
        absolute

        min-[1081px]:top-[10vh]
        min-[1081px]:bottom-[10vh]

        min-[1081px]:left-[11%]
        min-[1081px]:right-[11%]

        portrait:top-[1vh]
        portrait:bottom-[1vh]
        portrait:left-[1%]
        portrait:right-[1%]

        bg-[#06003E]/50 
        border-2 border-[#FFC7FF] 
        rounded-[30px]
        box-border
        p-[2%]
        flex
        flex-col
        gap-[1.5%]
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
          any
        </div>
      </div>

      {/* ПОИСК ОНЛАЙН И ОФФЛАЙН */}
      <div className="w-full h-[8%] flex justify-between gap-[1.5%] portrait:h-20 portrait:text-[30px]">
        {/* SEARCH */}
        <div className={`${elementStyle} text-white/30`} style={{ width: '90%' }}>
          Search
        </div>

        {/* ONLINE/OFFLINE */}
        <div className={elementStyle} style={{ width: '10%' }}>
          On
        </div>
      </div>

      {/* Ниже пойдет остальной контент библиотеки */}

      {/* СПИСОК ПЕСЕН */}
      <div className="flex-1 w-full overflow-y-auto flex flex-col custom-scrollbar gap-2">
        {mockSongs.map((song) => (
          <div
            key={song.id}
            className="
            w-full shrink-0
            box-border
            px-1
            p-1.5
            grid grid-cols-[100px_1fr_auto_auto_70px] 
            items-center
            select-none
            gap-2
            hover:bg-[#FFC7FF]/50
            rounded-3xl
            transition-colors
            duration-300
          "
          >
            {/* 1. Квадратная обложка с закруглением */}
            <div className="w-25 h-25 bg-[#1e1e1e] rounded-[35px] overflow-hidden border border-[#FFC7FF]/25 shrink-0">
              <img
                src="../../../../resources/white.png"
                alt="Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 2. Блок текстов: Название (крупное) и Автор (мелкий под ним) */}
            <div className="flex flex-col text-left justify-center pl-2 min-w-0">
              <span className="text-[#FFC7FF] font-bold tracking-wide neon-text-glow text-[24px] leading-tight truncate">
                Vlsastelin Colescdasdasfasd
              </span>
              <span className="text-[#FFC7FF]/60 text-[18px] leading-tight font-semibold truncate mt-1">
                Vlsastelin Colescdasfasfsdfsd
              </span>
            </div>

            {/* 3. Статус on / off в оригинальном стиле */}
            <div className="text-right text-[#FFC7FF] neon-text-glow font-medium text-[22px] pr-3 min-w-11.25">
              {song.status}
            </div>


            {/* 5. Кнопка плюс (тонкий аккуратный кастомный плюс) */}
            <div className="flex justify-center items-center">
              <button className="w-10 h-10 text-[#FFC7FF] text-[36px] font-bold hover:text-white transition-all cursor-pointer flex items-center justify-center pb-1.5 leading-none active:scale-75">
                +
              </button>
            </div>

            {/* 6. Время трека с неоновым свечением */}
            <div className="text-[#FFC7FF] neon-text-glow font-bold text-[24px] text-right font-mono tracking-tighter">
              2:52
            </div>
          </div>))}
      </div>
    </div >)
}