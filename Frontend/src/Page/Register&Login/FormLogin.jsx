const FormLogin = () => {
  return (
    <form className="w-[70%] h-full grid gap-y-5 justify-items-center bg-[rgba(59,64,81,0.5)] shadow p-8 rounded-xl text-white">
      <div className="w-[90%] grid gap-y-1">
        <label className="w-full">Email</label>
        <input
          type="text"
          placeholder="Nhập Email của bạn"
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2 "
        />
      </div>
      <div className="w-[90%] grid gap-y-1">
        <label className="w-full">Mật Khẩu</label>
        <input
          type="text"
          placeholder="Mật Khẩu"
          className="w-full bg-[rgba(59,64,81,0.5)] border-white/20 border rounded-md p-2 pl-2"
        />
      </div>

      <button className="w-[90%] h-full grid gap-y-1">Đăng Nhập</button>
    </form>
  );
};
export default FormLogin;
