import { useState } from "react";
import MNUser from "./User";
import MNMovie from "./Movie";

const Manager = () => {
  const [element, setElement] = useState(true);

  return (
    <div className="relative w-full min-h-screen bg-[#191B24] px-4 pb-10">
      <div className="w-full h-20"></div>
      <div className="mx-auto mt-5 w-full max-w-6xl text-white">
        <div className="flex h-10 items-center gap-10 border-b border-white/20 p-4 text-2xl font-mono">
          <button
            onClick={() => setElement(true)}
            className={` p-1 ${element ? "border-b-2 border-yellow-400" : ""}`}
          >
            User
          </button>
          <button
            onClick={() => setElement(false)}
            className={` ${element ? "" : "border-b-2 border-yellow-400"}`}
          >
            Movie
          </button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        {element ? <MNUser /> : <MNMovie />}
      </div>
    </div>
  );
};
export default Manager;
