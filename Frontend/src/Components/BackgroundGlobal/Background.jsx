import { useState, createContext } from "react";
import { Toaster } from "sonner";
import ImageBackground from "../../image/ImageTest1.jpg";

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
