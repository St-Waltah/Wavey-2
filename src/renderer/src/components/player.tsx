import React, { useState } from 'react';
import Cover from './sub_components/Cover';
import TimeLine from './sub_components/TimeLine';
import TimeCounter from './sub_components/TimeCounter';
import TrackName from './sub_components/TrackName';

export const Player: React.FC = () => {
  const testTrack = {
    title: "Тестовый трек",
    artist: "Имя Исполнителя",
    coverUrl: "",
    duration: 225
  };

  const [trackProgress, setTrackProgress] = useState(0.3);

  const currentSeconds = trackProgress * testTrack.duration;

  const handleProgressChange = (newProgressPercent: number) => {
    setTrackProgress(newProgressPercent / 100);
  };

  return (
    <div className="@container w-full h-full flex flex-col items-center justify-between py-12 bg-neutral-900 border border-amber-500/90">

      {/* Единый верхний контент-блок: Обложка + Таймлайн + Таймер + Текст */}
      <div className='w-full flex flex-col items-center gap-14 border-blue-300'>

        {/* Главный контейнер верхней части — задает размер всей конструкции */}
        <div className="relative w-[75cqw] h-[75cqw] max-w-165 max-h-165 min-w-50 min-h-50 aspect-square flex items-center justify-center border border-red-500">

          {/* TIMELINE */}
          <div className="absolute inset-0 w-full h-full pointer-events-none">
            <TimeLine
              progress={trackProgress * 100}
              onChangeProgress={handleProgressChange} />
          </div>

          {/* COVER */}
          <div
            className="absolute w-[92%] h-[92%] z-0 flex items-center justify-center cursor-pointer border border-green-600"
          >
            <Cover coverUrl={testTrack.coverUrl} title={testTrack.title} />

            {/* TIMECOUNTER (Привязан строго к нижней границе контейнера обложки) */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-20">
              <TimeCounter
                currentTime={currentSeconds}
                duration={testTrack.duration}
              />
            </div>
          </div>
        </div>

        {/* TRACKNAME */}
        <TrackName
          title={testTrack.title}
          artist={testTrack.artist}
        />

      </div>

      {/* Временная заглушка для будущих кнопок, чтобы центрирование работало уже сейчас */}
      <div className="w-full h-20 border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500 text-sm">
        Место для будущих кнопок управления
      </div>

    </div>
  );
};

export default Player;
