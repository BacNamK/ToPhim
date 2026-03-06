import { useState } from "react";
import { toast } from "sonner";
import { handleLogin } from "../../API/Auth";

const FormLogin = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Vui long nhap email va mat khau.");
      return;
    }

    try {
      setLoading(true);
      const response = await handleLogin(form);
      const data = response?.data || response;

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data?.user || null));
      window.dispatchEvent(new Event("auth-changed"));
      toast.success("Dang nhap thanh cong!");
    } catch (error) {
      toast.error(error?.message || "Dang nhap that bai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full gap-y-4 rounded-xl bg-[rgba(59,64,81,0.5)] p-4 text-white shadow sm:w-[90%] sm:p-6 md:w-[80%] md:gap-y-5 md:p-8"
    >
      <div className="grid w-full gap-y-1">
        <label className="w-full">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Nhập Email của bạn"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2 "
        />
      </div>
      <div className="grid w-full gap-y-1">
        <label className="w-full">Mật Khẩu</label>
        <input
          name="password"
          type="password"
          placeholder="Mật Khẩu"
          value={form.password}
          onChange={handleChange}
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2"
        />
      </div>

      <button
        type="submit"
        className="mt-1 w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 sm:text-base"
      >
        {loading ? "Dang xu ly..." : "Đăng Nhập"}
      </button>
    </form>
  );
};
export default FormLogin;
