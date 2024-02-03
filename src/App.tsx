import AppCanvas from './Canvas.tsx';

function App() {
  return (
    <main className="select-none bg-gray-100">
      <div className="min-h-screen flex flex-col container mx-auto justify-center items-center ">
        <AppCanvas />
      </div>
    </main>
  );
}

export default App;
