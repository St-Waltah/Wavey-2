import { useState } from 'react';

import OnlineToggle from './sub_components/OnlineToggle';
import Filters, { GENRES_MAP } from './sub_components/Filters';
import SearchInput from './sub_components/SearchInput';
import SongList from './sub_components/SongList';


// ЗАГЛУШКИ ПЕСЕН
const mockSongs = Array.from({ length: 600 }, (_, index) => ({
  id: index + 1,
  title: `Song Title ${index + 1}`,
  artist: `Artist Name ${index + 1}`,
  status: index % 3 === 0 ? "on" : "off", // Каждая третья песня будет "on"
  duration: `3:${String(Math.floor(Math.random() * 50) + 10).padStart(2, '0')}`, // Рандомная длительность
}));


export default function Library() {

  {/* ---------------------------- */ }
  {/* СОСТОЯНИЯ */ } {/* СОСТОЯНИЯ */ }
  {/* ---------------------------- */ }

  const [isOnline, setIsOnline] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedInstrument, setSelectedInstrument] = useState<string>('Songs');
  const [selectedGenre, setSelectedGenre] = useState<string>(GENRES_MAP['Songs'][0]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('Any');

  {/* ------------------------- */ }
  {/* ФИЛЬТР */ } {/* ФИЛЬТР */ }
  {/* ------------------------- */ }
  const filteredSongs = mockSongs.filter((song) => {
    const query = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
    );
  });


  return (
    <div
      className="
        w-[84%] 
        h-[80%]

        max-[1100px]:w-[94%]
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

      {/* ------------------------- */}
      {/* ФИЛЬТРЫ */}{/* ФИЛЬТРЫ */}
      {/* ------------------------- */}
      <Filters
        selectedInstrument={selectedInstrument}
        setSelectedInstrument={setSelectedInstrument}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />


      {/* ------------------------- */}
      {/* ПОИСК ОНЛАЙН И ОФФЛАЙН */}
      {/* ------------------------- */}
      <div className="w-full h-[8%] flex justify-between gap-[1.5%] portrait:h-20 portrait:text-[30px]">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <OnlineToggle isOnline={isOnline} onChange={setIsOnline} />
      </div>


      {/* ---------------------------------------------------------------------------------------------------------------- */}
      {/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}{/* СПИСОК ПЕСЕН */}
      {/* ---------------------------------------------------------------------------------------------------------------- */}
      <SongList filteredSongs={filteredSongs} />

    </div>
  )
}