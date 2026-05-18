import { useState } from 'react';

export const GENRES_MAP = {
  Instruments: ['Modern', 'Moder SD', 'Vinyl', 'Vinyl SD'],
  Songs: [
    'Country', 'Dark rave', 'Depression & Obsession',
    'Great Acoustic Songs',
    'Huh', 'Jazz & Blues', 'My everything', 'Pop', 'Rap',
    'Rock',
    'Romantic Collection', 'Vinyl Collection'
  ]
};

export const LANGUAGES = ['Any', 'En', 'Ru'];

interface FiltersProps {
  selectedInstrument: string;
  setSelectedInstrument: (value: string) => void;
  selectedGenre: string;
  setSelectedGenre: (value: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (value: string) => void;
}

export default function Filters({
  selectedInstrument,
  setSelectedInstrument,
  selectedGenre,
  setSelectedGenre,
  selectedLanguage,
  setSelectedLanguage
}: FiltersProps) {
  // Локальные состояния для открытия/закрытия списков (убраны из Library)
  const [isOpenInstruments, setIsOpenInstruments] = useState(false);
  const [isOpenGenre, setIsOpenGenre] = useState(false);
  const [isOpenLanguage, setIsOpenLanguage] = useState(false);

  const elementStyle = "bg-[#06003E]/50 border border-[#FFC7FF]/100 rounded-[30px] box-border text-white flex items-center justify-center select-none text-center px-2 antialiased bg-clip-padding";

  return (
    <div className="w-full h-[10%] flex justify-between gap-[1.5%] portrait:h-25 portrait:text-[30px] relative z-50">

      {/* INSTR/SONG DROPDOWN */}
      <div className="relative h-full" style={{ width: '44%' }}>
        <div
          className={`${elementStyle} h-full cursor-pointer hover:bg-[#06003E]/80 transition-colors`}
          onClick={() => {
            setIsOpenInstruments(!isOpenInstruments);
            setIsOpenGenre(false);
            setIsOpenLanguage(false);
          }}
        >
          {selectedInstrument}
        </div>

        {isOpenInstruments && (
          <div className="absolute top-[115%] left-0 w-full bg-[#06003E]/95 border border-[#FFC7FF] rounded-[20px] shadow-[0_0_20px_rgba(255,199,255,0.2)] overflow-hidden flex flex-col z-50 backdrop-blur-md">
            {['Instruments', 'Songs'].map((item) => (
              <div
                key={item}
                className="px-6 py-3 text-white hover:bg-[#FFC7FF]/20 cursor-pointer transition-colors text-left"
                onClick={() => {
                  setSelectedInstrument(item);
                  const genres = GENRES_MAP[item as keyof typeof GENRES_MAP];
                  setSelectedGenre(genres[0]);
                  setIsOpenInstruments(false);
                }}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* GENRE DROPDOWN */}
      <div className="relative h-full" style={{ width: '44%' }}>
        <div
          className={`${elementStyle} h-full cursor-pointer hover:bg-[#06003E]/80 transition-colors`}
          onClick={() => {
            setIsOpenGenre(!isOpenGenre);
            setIsOpenInstruments(false);
            setIsOpenLanguage(false);
          }}
        >
          {selectedGenre}
        </div>

        {isOpenGenre && (
          <div className="absolute top-[115%] left-0 w-full bg-[#06003E]/95 border border-[#FFC7FF] rounded-[20px] shadow-[0_0_30px_rgba(255,199,255,0.3)] max-h-100 overflow-y-auto custom-scrollbar flex flex-col z-50 backdrop-blur-md transition-all duration-200 animate-in fade-in zoom-in-95 scroll-py-2">
            {GENRES_MAP[selectedInstrument as keyof typeof GENRES_MAP].map((genre) => (
              <div
                key={genre}
                className="block w-full shrink-0 px-5 py-3 text-white hover:bg-[#FFC7FF]/20 cursor-pointer transition-colors text-left truncate leading-normal"
                onClick={() => {
                  setSelectedGenre(genre);
                  setIsOpenGenre(false);
                }}
              >
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LANGUAGE DROPDOWN */}
      <div className="relative h-full" style={{ width: '12%' }}>
        <div
          className={`${elementStyle} h-full cursor-pointer hover:bg-[#06003E]/80 transition-colors`}
          onClick={() => {
            setIsOpenLanguage(!isOpenLanguage);
            setIsOpenInstruments(false);
            setIsOpenGenre(false);
          }}
        >
          {selectedLanguage}
        </div>

        {isOpenLanguage && (
          <div className="absolute top-[115%] left-0 w-full bg-[#06003E]/95 border border-[#FFC7FF] rounded-[20px] shadow-[0_0_20px_rgba(255,199,255,0.2)] overflow-hidden flex flex-col z-50 backdrop-blur-md items-center">
            {LANGUAGES.map((lang) => (
              <div
                key={lang}
                className="w-full px-6 py-3 text-white hover:bg-[#FFC7FF]/20 cursor-pointer transition-colors text-left"
                onClick={() => {
                  setSelectedLanguage(lang);
                  setIsOpenLanguage(false);
                }}
              >
                {lang}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}