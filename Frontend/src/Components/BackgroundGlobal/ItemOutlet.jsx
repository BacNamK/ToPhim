import { createContext, useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";

export const BgGlobal = createContext(true);

function BgProvider({ children }) {
  const [background, setBackground] = useState("white");

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default BgProvider;
