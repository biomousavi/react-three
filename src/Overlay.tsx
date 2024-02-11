import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineGithub,
  AiOutlineHighlight,
  AiOutlineShop,
} from 'react-icons/ai';
import { useSnapshot } from 'valtio';

import state from './store.ts';

export default function Overlay() {
  const snap = useSnapshot(state);

  return (
    <div className="container mx-auto px-3 absolute z-10 top-0  w-full h-full">
      {snap.intro && (
        <header className="flex py-12 justify-between">
          <a href="https://github.com/biomousavi">
            <AiOutlineGithub size="3rem" aria-label="Github" />
          </a>
          <AiOutlineShop size="3rem" />
        </header>
      )}

      {snap.intro ? <Intro /> : <Customizer />}
    </div>
  );
}

function Intro() {
  return (
    <section key="main" className="flex flex-col lg:flex-row ">
      <div>
        <h1 className="text-[20vw] md:text-[15vw] tracking-[-2px] lg:tracking-[-6px] italic w-1/3 leading-[15vw] md:leading-[12vw] font-black">
          LET'S DO IT.
        </h1>
      </div>

      <div className="self-end lg:absolute right-0 lg:w-1/2  mt-24">
        <p className="text-sm lg:text-2xl my-4 lg:my-14">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolorum
          quo alias qui commodi veritatis a
          <strong> quaerat soluta necessitatibus </strong>
          asperiores.
        </p>

        <button
          className="bg-black hover:shadow-2xl  hover:scale-105 transition-all duration-500  text-white flex py-2 px-5 items-center  rounded-xl mt-24"
          type="button"
          onClick={() => {
            state.intro = false;
          }}
          aria-hidden="true"
        >
          <span className="mr-2 font-bold">CUSTOMIZE IT</span>
          <AiOutlineHighlight size="3rem" />
        </button>
      </div>
    </section>
  );
}

function Customizer() {
  const snap = useSnapshot(state);

  const colors: string[] = [
    '#ccc',
    '#EFBD4E',
    '#80C670',
    '#726DE8',
    '#EF674E',
    '#653934',
  ];
  const decals = ['react', 'no', 'leaf'];
  return (
    <section key="custom">
      <div className="flex justify-end flex-col items-center h-full w-full mb-6">
        <div className=" absolute flex gap-2 bottom-5 mb-5">
          {colors.map((color) => (
            <div
              onClick={() => {
                state.selectedColor = color;
              }}
              aria-hidden="true"
              className="w-8 h-8 rounded-full border-2 border-solid border-white transition-all hover:scale-110 hover:cursor-pointer"
              key={color}
              style={{ background: color }}
            />
          ))}
        </div>
      </div>

      <div className="absolute md:left-12 left-5 bottom-12">
        <div className="flex gap-5 flex-col md:flex-row">
          {decals.map((decal) => (
            <div key={decal}>
              <img
                src={`${decal}.png`}
                alt="brand"
                className="w-6 saturate-0 invert-[1] brightness-200 transition-all duration-500 hover:scale-125 hover:cursor-pointer hover:filter-none"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className=" absolute p-3 text-white top-10 left-10 flex gap-2 transition-colors"
        style={{ backgroundColor: snap.selectedColor }}
        type="button"
      >
        Download
        <AiFillCamera size="1.3em" />
      </button>

      <button
        className=" absolute p-3 text-white top-10 right-10 flex gap-2 transition-colors"
        style={{ backgroundColor: snap.selectedColor }}
        type="button"
      >
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
    </section>
  );
}
