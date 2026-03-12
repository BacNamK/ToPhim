import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export const BgGlobal = createContext(true);

function BgProvider({ children }) {
  const [background, setBackground] = useState("white");

  return (
    <>
      <Navbar />
      {/* push content down so fixed navbar doesn't overlap */}
      <div className="m-0 p-0">
        {" "}
        {/* adjust value to match navbar height */}
        <Outlet />
      </div>
    </>
  );
}

export default BgProvider;
