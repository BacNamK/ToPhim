import { useState, createContext } from "react";
import { Toaster } from "sonner";

export const BgGlobal = createContext(null);

const BgProvider = ({ children }) => {
  const [background, setBackground] = useState(true);

  return (
    <BgGlobal.Provider value={{ background, setBackground }}>
      {children}
      <Toaster />
    </BgGlobal.Provider>
  );
};

export default BgProvider;
