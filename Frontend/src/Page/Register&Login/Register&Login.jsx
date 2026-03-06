import { useEffect, useState } from "react";
import { toast } from "sonner";
import FormRegister from "./FormRegister";
import FormLogin from "./FormLogin";
import BgRL from "../../Image/BgRG.jpg";

const ReLog = () => {
  const [isLogin, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const syncUserFromStorage = () => {
    try {
      const storedUser = localStorage.getItem("user");
      setCurrentUser(storedUser ? JSON.parse(storedUser) : null);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    syncUserFromStorage();

    const handleAuthChanged = () => {
      syncUserFromStorage();
    };

    window.addEventListener("auth-changed", handleAuthChanged);
    window.addEventListener("storage", handleAuthChanged);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
      window.removeEventListener("storage", handleAuthChanged);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    toast.success("Dang xuat thanh cong!");
  };

  return (
    <div className="relative w-full min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BgRL})` }}
      />

      <div className="absolute inset-0 bg-[#191B24]/70" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 md:py-10">
        <div className="w-full max-w-md justify-items-center rounded-md p-3 shadow sm:max-w-lg md:max-w-2xl md:p-4">
          {currentUser ? (
            <div className="grid w-full gap-5 rounded-xl bg-[rgba(59,64,81,0.5)] p-6 text-center text-white shadow md:p-8">
              <p className="text-lg font-semibold sm:text-xl">
                Bạn đã đăng nhập với tài khoản
              </p>
              <p className="text-xl text-yellow-300 sm:text-2xl">
                {currentUser?.username || currentUser?.email}
              </p>
              <button
                type="button"
                onClick={handleLogout}
                className="mx-auto w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 sm:w-[60%] sm:text-base"
              >
                Đăng Xuất
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default ReLog;
