import Library from './components/library';

function App(): React.JSX.Element {
  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white select-none antialiased flex">
      <div className="relative h-full w-1/2 portrait:w-full">
        <Library />
      </div>
      <div className="w-1/2 h-full portrait:hidden">

      </div>
    </div>
  )
}

export default App