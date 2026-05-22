import React from 'react';

interface TimeCounterProps {
  currentTime: number;
  duration: number;
}

export const TimeCounter: React.FC<TimeCounterProps> = ({ currentTime = 0, duration = 0 }) => {

  /**
   * Вспомогательная функция для форматирования секунд в формат ММ:СС
   */
  const formatTime = (timeInSeconds: number): string => {
    if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(seconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
  };

  return (
    <div className="flex items-center justify-center gap-2 text-neutral-200 select-none z-20 font-mono text-[6cqw] sm:text-2xl tracking-widest">

      {/* Текущее время (акцентированный цвет, например, под цвет таймлайна) */}
      <span className="text-amber-400 font-bold">
        {formatTime(currentTime)}
      </span>

      {/* Разделитель */}
      <span className="text-neutral-400 font-light mx-1 opacity-90">/</span>

      {/* Общая длительность */}
      <span className="text-neutral-300 font-medium">
        {formatTime(duration)}
      </span>

    </div>
  );
};

export default TimeCounter;
