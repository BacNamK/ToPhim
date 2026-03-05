import { useState } from "react";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import BgRL from "../../Image/BgRG.jpg";

const ReLog = () => {
  const [isLogin, setLogin] = useState(false);
  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgRL})` }}
      />

      <div className="absolute inset-0 bg-[#191B24]/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 md:py-10">
        <div className="w-full max-w-md justify-items-center rounded-md p-3 shadow sm:max-w-lg md:max-w-2xl md:p-4">
          <div className="flex w-full items-center justify-center gap-6 border-b border-white/20 pb-2 text-lg text-white sm:gap-12 sm:text-xl md:gap-20">
            <button
              onClick={() => setLogin(false)}
              className={`pb-1 ${isLogin ? "" : "border-b-2 border-yellow-300 shadow"}`}
            >
              Đăng Kí
            </button>
            <button
              onClick={() => setLogin(true)}
              className={`pb-1 ${isLogin ? "border-b-2 border-yellow-300 shadow" : ""}`}
            >
              Đăng Nhập
            </button>
          </div>
          <div className="w-full justify-items-center pt-4 sm:pt-6 md:pt-8">
            {isLogin ? <FormLogin /> : <FormRegister />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReLog;
