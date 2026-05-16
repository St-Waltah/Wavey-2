import Library from './components/library';

function App(): React.JSX.Element {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white select-none antialiased flex flex-wrap">
      <div className="flex-1 min-w-112.5 h-full relative flex items-center justify-center">
        <Library />
      </div>
      <div className="flex-1 min-w-125 h-full max-[1050px]:hidden bg-[#0c0c0c] border-l border-[#FFC7FF]/10">

      </div>
    </div>
  )
}

export default App