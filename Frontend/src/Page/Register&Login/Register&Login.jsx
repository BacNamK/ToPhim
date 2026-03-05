import { useState } from "react";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import BgRL from "../../Image/BgRG.jpg";

const ReLog = () => {
  const [isLogin, setLogin] = useState(false);
  return (
    <>
      <div className="relative w-full h-screen">
        {/* 1️⃣ Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BgRL})` }}
        />

        {/* 2️⃣ Overlay */}
        <div className="absolute inset-0 bg-[#191B24]/70" />

        {/* 3️⃣ Content (phải có z-index cao hơn) */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="w-2/5 h-3/4 justify-items-center mt-10 shadow rounded-md p-2">
            {/* */}
            <div className="w-[90%] h-[10%] flex justify-center gap-20 text-white text-xl border-b border-white/20 font-mono">
              <button
                onClick={() => setLogin(!isLogin)}
                className={`${isLogin ? "" : "border-b-2 border-yellow-300 shadow"}`}
              >
                Đăng Kí
              </button>
              <button
                onClick={() => setLogin(!isLogin)}
                className={`${isLogin ? "border-b-2 border-yellow-300 shadow" : ""}`}
              >
                Đăng Nhập
              </button>
            </div>
            <div className="w-full justify-items-center pt-10">
              {isLogin ? <FormLogin /> : <FormRegister />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReLog;
