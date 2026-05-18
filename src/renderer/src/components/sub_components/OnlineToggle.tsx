import OnlineIcon from '../../icons/Online.svg?react';


interface OnlineToggleProps {
  isOnline: boolean;
  onChange: (isOnline: boolean) => void;
}

export default function OnlineToggle({ isOnline, onChange }: OnlineToggleProps) {
  const elementStyle = "bg-[#06003E]/50 border border-[#FFC7FF]/100 rounded-[30px] box-border text-white flex items-center justify-center select-none text-center px-2 antialiased bg-clip-padding";

  return (
    <button
      type="button"
      onClick={() => {
        const newValue = !isOnline;
        onChange(newValue);
        console.log("Статус изменен на:", newValue ? "Online" : "Offline");
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
        flex
        items-center
        justify-center
        ${isOnline
          ? 'bg-[#FFC7FF]/15 border-[#FFC7FF] shadow-[0_0_20px_rgba(255,199,255,0.6),inset_0_0_12px_rgba(255,199,255,0.4)]'
          : 'bg-[#06003E]/50 border-[#FFC7FF]/20 shadow-none'
        }
      `}
      style={{ width: 'auto' }}
    >
      <OnlineIcon
        className={`
          w-[65%] h-[65%]
          fill-current stroke-current
          transition-all
          duration-800
          translate-x-[3.5%]
          ${isOnline
            ? 'text-[#FFC7FF] drop-shadow-[0_0_10px_rgba(255,199,255,1), 0_0_25px_rgba(255,199,255,0.6)] scale-130'
            : 'text-[#FFC7FF]/30 filter-none scale-100'
          }
        `}
      />
    </button>
  );
}
