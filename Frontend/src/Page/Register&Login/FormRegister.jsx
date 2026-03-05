import { useState } from "react";
import { toast } from "sonner";
import { handleRegister } from "../../API/Auth";

const FormRegister = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      toast.error("Vui long nhap day du thong tin.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Mat khau nhap lai khong khop.");
      return;
    }

    try {
      setLoading(true);
      const response = await handleRegister({
        username: form.username,
        email: form.email,
        password: form.password,
        isadmin: false,
      });

      const data = response?.data || response;
      if (data?.error) {
        toast.error(data.error);
        return;
      }

      toast.success("Dang ky thanh cong!");
      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error?.message || "Dang ky that bai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[70%] h-full grid gap-y-5 justify-items-center bg-[rgba(59,64,81,0.5)] shadow p-8 rounded-xl text-white"
    >
      <div className="w-[90%] grid gap-y-1">
        <label className="w-full">Tên hiện thị</label>
        <input
          name="username"
          type="text"
          placeholder="Nhập tên của bạn"
          value={form.username}
          onChange={handleChange}
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2 "
        />
      </div>
      <div className="w-[90%] grid gap-y-1">
        <label className="w-full">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Nhập Email của bạn"
          value={form.email}
          onChange={handleChange}
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2"
        />
      </div>
      <div className="w-[90%] grid gap-y-1">
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
      <div className="w-[90%] grid gap-y-1">
        <label className="w-full">Mật khẩu nhập lại</label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2"
        />
      </div>
      <button type="submit" className="w-[90%] h-full grid gap-y-1">
        {loading ? "Dang xu ly..." : "Đăng Kí"}
      </button>
    </form>
  );
};
export default FormRegister;
