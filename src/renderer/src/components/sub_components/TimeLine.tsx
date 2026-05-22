import React, { useRef } from 'react';

interface TimeLineProps {
  progress: number;
  onChangeProgress: (newProgress: number) => void;
}

export const TimeLine: React.FC<TimeLineProps> = ({ progress = 0, onChangeProgress }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Параметры геометрии из Figma
  const strokeWidth = 3;
  const size = 300;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Перевод макета "с 7 до 5 часов" в градусы SVG:
  // 135° — это точка 7:30 часов. Дуга идет по часовой стрелке на 270° и заканчивается на 45° (точка 4:30 часов).
  const startAngle = 112.5;
  const sweepAngle = 315;

  const maxArcLength = (sweepAngle / 360) * circumference;
  const currentDash = (progress / 100) * maxArcLength;

  /**
   * Точная проверка попадания клика исключительно на линию таймлайна
   */
  const handleTimelineClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();

    // Переводим координаты клика в систему координат viewBox (0 до 300)
    const scaleX = size / rect.width;
    const scaleY = size / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Проверка попадания в область обводки через невидимый Canvas API
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Создаем математический путь окружности, полностью идентичный нашему SVG
    ctx.beginPath();
    ctx.arc(center, center, radius, (startAngle * Math.PI) / 180, ((startAngle + sweepAngle) * Math.PI) / 180);
    ctx.lineWidth = strokeWidth + 14; // Добавляем +10px невидимой зоны для удобства нажатия пальцем/курсором

    // Если клик мимо линии (в центр круга или совсем наружу) — игнорируем
    if (!ctx.isPointInStroke(clickX, clickY)) {
      return;
    }

    // Если попали на линию, высчитываем угол относительно центра
    const deltaX = clickX - center;
    const deltaY = clickY - center;
    let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    if (angle < 0) angle += 360;

    // Считаем прогресс относительно стартового угла 135°
    let relativeAngle = angle - startAngle;
    if (relativeAngle < 0) relativeAngle += 360;

    if (relativeAngle <= sweepAngle) {
      const newProgress = Math.round((relativeAngle / sweepAngle) * 100);
      onChangeProgress(newProgress);
    }
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 w-full h-full select-none z-10 pointer-events-auto"
      onClick={handleTimelineClick}
    >
      {/* 1. Задний фон трека (с 7 до 5 часов) */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        className="stroke-neutral-700/40"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          transform: `rotate(${startAngle}deg)`,
          transformOrigin: 'center',
          strokeDasharray: `${maxArcLength} ${circumference}`,
        }}
      />

      {/* 2. Активный прогресс */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        className="stroke-amber-400 transition-all duration-150 ease-out"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        style={{
          transform: `rotate(${startAngle}deg)`,
          transformOrigin: 'center',
          strokeDasharray: `${currentDash} ${circumference}`,
        }}
      />
    </svg>
  );
};

export default TimeLine;
