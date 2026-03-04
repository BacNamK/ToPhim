import Search from "../../image/search.png";
import ToCom from "../../image/IconToCom.png";
import IconUser from "../../image/user.png";
import IconKey from "../../image/key.png";
import { useEffect, useRef } from "react";
import { Link } from "react-router";

const Navbar = () => {
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        navRef.current.style.background = "#191B24";
      } else {
        navRef.current.style.background = "transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav ref={navRef} className="nav fixed w-full h-[10%] p-2 z-10">
      {/* 1 */}
      <div className="flex items-center h-full">
        {/* 1-2 */}
        <Link to={""} className="flex w-[12%] gap-2 ml-2 cursor-pointer">
          <div className="shadow size-12 rounded-full">
            <img src={ToCom} alt="" />
          </div>
          <div className="grid gap-y-0 text-white">
            <h1 className="font-bold text-2xl">ToPhim</h1>
            <span className="text-xs">Vừa ăn vừa xem</span>
          </div>
        </Link>
        {/* 1-3 */}
        <div className="flex w-[25%] h-[65%] items-center bg-white/30 rounded-md p-2 pl-4">
          <img className="size-5 rounded-full scale-110" src={Search} alt="" />
          <input
            type="text"
            placeholder="Tìm Kiếm phim"
            className="w-full pl-4 bg-transparent pr-2 placeholder:text-white placeholder:font-sans outline-none"
          />
        </div>
        {/* 1-4 */}
        <div className="flex w-[40%] h-full items-center">
          <ul className="w-full flex gap-8 text-white ml-10 text-sm">
            <li className="hover:text-orange-200 cursor-pointer">Phim Lẻ</li>
            <li className="hover:text-orange-200 cursor-pointer">Phim bộ</li>
            <li className="hover:text-orange-200 cursor-pointer">Thể Loại</li>
            <li className="hover:text-orange-200 cursor-pointer">Quốc gia</li>
            <li className="hover:text-orange-200 cursor-pointer">TV Show</li>
            <li className="hover:text-orange-200 cursor-pointer">
              Phim Chiếu Rạp
            </li>
          </ul>
        </div>
        {/* 1-5 */}
        <div className="w-[25%] flex justify-end gap-2">
          <div className="flex w-[50%] hover:bg-white/5 hover:shadow justify-center items-center rounded-full mr-5 p-1 gap-2 cursor-pointer">
            <img src={IconKey} alt="" className="size-5" />
            <span className="text-sm text-white">Quản Trị Viên</span>
          </div>
          <Link
            to={"join"}
            className="flex w-[50%] bg-white justify-center items-center rounded-full mr-5 p-1 gap-1"
          >
            <img src={IconUser} alt="" className="size-4" />
            <span className="text-sm">Đăng Nhập</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
