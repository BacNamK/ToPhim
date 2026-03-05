import { useState } from "react";
import MNUser from "./User";
import MNMovie from "./Movie";

const Manager = () => {
  const [element, setElement] = useState(true);

  return (
    <div className="relative w-full h-auto bg-[#191B24]">
      <div className="w-full h-20"></div>
      <div className="w-full h-15 items-center gap-5 mt-5 text-white">
        <div className="flex items-center gap-10 text-2xl h-10 font-mono  p-4 border-b border-white/20">
          <button
            onClick={() => setElement(!element)}
            className={` p-1 ${element ? "border-b-2 border-yellow-400" : ""}`}
          >
            User
          </button>
          <button
            onClick={() => setElement(!element)}
            className={` ${element ? "" : "border-b-2 border-yellow-400"}`}
          >
            Movie
          </button>
        </div>
      </div>
      {element ? <MNUser /> : <MNMovie />}
    </div>
  );
};
export default Manager;
