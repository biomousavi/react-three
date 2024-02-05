import AppCanvas from './Canvas.tsx';
import Overlay from './Overlay.tsx';

function App() {
  return (
    <main className="select-none bg-gray-100">
      <div className="min-h-screen flex flex-col  mx-auto justify-center items-center ">
        <AppCanvas />
        <Overlay />
      </div>
    </main>
  );
}

export default App;
