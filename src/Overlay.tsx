import {
  AiOutlineGithub,
  AiOutlineHighlight,
  AiOutlineShop,
} from 'react-icons/ai';

export default function Overlay() {
  return <Intro />;
}

function Intro() {
  return (
    <div className="container mx-auto px-3 absolute z-10 top-0  w-full h-full">
      <header className="flex py-12 justify-between">
        <a href="https://github.com/biomousavi">
          <AiOutlineGithub size="3rem" aria-label="Github" />
        </a>
        <AiOutlineShop size="3rem" />
      </header>

      <section key="main" className="flex flex-col lg:flex-row">
        <div>
          <h1 className="text-[16vw] tracking-[-2px] lg:tracking-[-6px] italic w-1/3 leading-[15vw] font-black">
            LET'S DO IT.
          </h1>
        </div>

        <div className="self-end lg:absolute left-[30vw] lg:w-1/2">
          <p className="text-sm lg:text-2xl my-4 lg:my-14">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos dolorum
            quo alias qui commodi veritatis a
            <strong> quaerat soluta necessitatibus </strong>
            asperiores.
          </p>

          <button
            className="bg-black hover:shadow-2xl hover:scale-105 transition-all duration-500  text-white flex py-2 px-5 items-center  rounded-xl"
            type="button"
          >
            <span className="mr-2 font-bold">CUSTOMIZE IT</span>
            <AiOutlineHighlight size="3rem" />
          </button>
        </div>
      </section>
    </div>
  );
}
