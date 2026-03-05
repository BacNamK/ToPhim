import Search from "../../Image/search.png";
import ToCom from "../../Image/IconToCom.png";
import IconUser from "../../Image/user.png";
import IconKey from "../../Image/key.png";
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
    <nav ref={navRef} className="nav fixed z-20 w-full h-[10%] p-2">
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
            <li className="group relative hover:text-orange-200 cursor-pointer">
              <div>
                Thể Loại <span className="text-[10px]">&#9660;</span>
              </div>
              <div
                className="absolute top-full left-0 mt-2 
                  min-w-[200px] bg-[#191B24] 
                  rounded-md shadow-lg
                  opacity-0 invisible 
                  group-hover:opacity-100 group-hover:visible
                  transition-all duration-200"
              >
                <ul className="flex flex-col text-white p-3 gap-2 text-sm">
                  <li className="hover:text-orange-300 cursor-pointer">
                    Bom Tấn
                  </li>
                  <li className="hover:text-orange-300 cursor-pointer">
                    Thần Thoại
                  </li>
                  <li className="hover:text-orange-300 cursor-pointer">
                    Âm Nhạc
                  </li>
                  <li className="hover:text-orange-300 cursor-pointer">
                    Thể Thao
                  </li>
                </ul>
              </div>
            </li>
            <li className="hover:text-orange-200 cursor-pointer">Quốc gia</li>
            <li className="hover:text-orange-200 cursor-pointer">TV Show</li>
            <li className="hover:text-orange-200 cursor-pointer">
              Phim Chiếu Rạp
            </li>
          </ul>
        </div>
        {/* 1-5 */}
        <div className="w-[25%] flex justify-end gap-2">
          <Link
            to={"manager"}
            className="flex w-[50%] hover:bg-white/5 hover:shadow justify-center items-center rounded-full mr-5 p-1 gap-2 cursor-pointer"
          >
            <img src={IconKey} alt="" className="size-5" />
            <span className="text-sm text-white">Quản Trị Viên</span>
          </Link>
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
