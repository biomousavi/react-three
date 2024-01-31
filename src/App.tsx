import { useState } from 'react';
import viteLogo from '../public/vite.svg';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-400">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          asdas
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          type="submit"
          onClick={() => setCount((previousCount) => previousCount + 1)}
        >
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
