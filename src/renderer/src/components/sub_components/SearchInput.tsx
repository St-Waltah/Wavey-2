interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  // Базовые стили из оригинального файла Library
  const elementStyle =
    "bg-[#06003E]/50 border border-[#FFC7FF]/100 rounded-[30px] box-border text-white flex items-center justify-center select-none text-center px-2 antialiased bg-clip-padding";

  return (
    <input
      type="text"
      placeholder="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
      style={{ width: '90%' }} // Сохраняем оригинальную пропорцию внутри flex-контейнера
    />
  );
}