import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../../Image/search.png";
import ToCom from "../../Image/IconToCom.png";
import IconUser from "../../Image/user.png";
import IconKey from "../../Image/key.png";

const Navbar = () => {
  const genres = ["Hoạt Hình", "Hành Động", "Phiêu Lưu"];
  const navRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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

    const handleScroll = () => {
      if (!navRef.current) return;
      navRef.current.style.background =
        window.scrollY > 0 ? "#191B24" : "transparent";
    };

    const handleAuthChanged = () => {
      syncUserFromStorage();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("auth-changed", handleAuthChanged);
    window.addEventListener("storage", handleAuthChanged);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("auth-changed", handleAuthChanged);
      window.removeEventListener("storage", handleAuthChanged);
    };
  }, []);

  return (
    <nav ref={navRef} className="fixed z-50 w-full px-3 py-2 transition-colors">
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3">
        <Link to={""} className="ml-1 flex items-center gap-2">
          <div className="size-10 rounded-full shadow sm:size-12">
            <img src={ToCom} alt="Logo" />
          </div>
          <div className="grid gap-y-0 text-white">
            <h1 className="text-xl font-bold sm:text-2xl">ToPhim</h1>
            <span className="text-[10px] sm:text-xs">Vừa ăn vừa xem</span>
          </div>
        </Link>

        <div className="hidden h-10 flex-1 items-center rounded-md bg-white/30 px-3 sm:flex lg:max-w-xs">
          <img
            className="size-5 rounded-full scale-110"
            src={Search}
            alt="Search"
          />
          <input
            type="text"
            placeholder="Tìm kiếm phim"
            className="w-full bg-transparent pl-3 pr-2 placeholder:font-sans placeholder:text-white outline-none"
          />
        </div>

        <div className="hidden flex-1 items-center lg:flex">
          <ul className="ml-8 flex w-full gap-8 text-sm text-white">
            <Link
              to={"phim-le"}
              className="cursor-pointer hover:text-orange-200"
            >
              Phim Lẻ
            </Link>
            <Link
              to={"phim-bo"}
              className="cursor-pointer hover:text-orange-200"
            >
              Phim Bộ
            </Link>
            <li className="group relative cursor-pointer hover:text-orange-200">
              <div>
                Thể Loại <span className="text-[10px]">&#9660;</span>
              </div>
              <div
                className="absolute left-0 top-full mt-2 min-w-[200px] rounded-md bg-[#191B24]
                  shadow-lg opacity-0 invisible transition-all duration-200 group-hover:visible
                  group-hover:opacity-100"
              >
                <ul className="flex flex-col gap-2 p-3 text-sm text-white">
                  {genres.map((genre) => (
                    <li key={genre}>
                      <Link
                        to={`/the-loai/${encodeURIComponent(genre)}`}
                        className="block hover:text-orange-300"
                      >
                        {genre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className="cursor-pointer hover:text-orange-200">Quốc Gia</li>
            <Link
              to={"tvshow"}
              className="cursor-pointer hover:text-orange-200"
            >
              TV Show
            </Link>
            <Link
              to={"phim-chieu-rap"}
              className="cursor-pointer hover:text-orange-200"
            >
              Phim Chiếu Rạp
            </Link>
          </ul>
        </div>

        <div className="ml-auto hidden items-center justify-end gap-2 sm:flex">
          {currentUser?.isadmin && (
            <Link
              to={"quan-tri-vien"}
              className="mr-2 flex items-center justify-center gap-2 rounded-full p-1 hover:bg-white/5 hover:shadow"
            >
              <img src={IconKey} alt="Admin" className="size-5" />
              <span className="whitespace-nowrap text-sm text-white">
                Quản Trị Viên
              </span>
            </Link>
          )}
          <Link
            to={"tham-gia"}
            className="mr-1 flex items-center justify-center gap-1 rounded-full bg-white px-3 py-1"
          >
            <img src={IconUser} alt="User" className="size-4" />
            <span className="whitespace-nowrap text-sm">
              {currentUser?.username || "Đăng Nhập"}
            </span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="ml-auto flex size-10 items-center justify-center rounded-md border border-white/30 text-white sm:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-lg">{isMobileMenuOpen ? "X" : "="}</span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mx-auto mt-3 w-full max-w-screen-2xl rounded-md bg-[#191B24] p-4 text-white shadow sm:hidden">
          <div className="mb-4 flex h-10 items-center rounded-md bg-white/30 px-3">
            <img
              className="size-5 rounded-full scale-110"
              src={Search}
              alt="Search"
            />
            <input
              type="text"
              placeholder="Tìm kiếm phim"
              className="w-full bg-transparent pl-3 pr-2 placeholder:font-sans placeholder:text-white outline-none"
            />
          </div>
          <ul className="grid gap-3 text-sm">
            <Link
              to={"phim-le"}
              className="cursor-pointer hover:text-orange-200"
            >
              Phim Lẻ
            </Link>
            <Link
              to={"phim-bo"}
              className="cursor-pointer hover:text-orange-200"
            >
              Phim Bộ
            </Link>
            {genres.map((genre) => (
              <li key={genre}>
                <Link
                  to={`/the-loai/${encodeURIComponent(genre)}`}
                  className="cursor-pointer hover:text-orange-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {genre}
                </Link>
              </li>
            ))}
            <li className="cursor-pointer hover:text-orange-200">Quốc Gia</li>
            <li className="cursor-pointer hover:text-orange-200">TV Show</li>
            <Link
              to={"phim-chieu-rap"}
              className="cursor-pointer hover:text-orange-200"
            >
              Phim Chiếu Rạp
            </Link>
          </ul>
          <div className="mt-4 flex flex-col gap-3">
            {currentUser?.isadmin && (
              <Link
                to={"quan-tri-vien"}
                className="flex items-center gap-2 rounded-md border border-white/20 px-3 py-2"
              >
                <img src={IconKey} alt="Admin" className="size-5" />
                <span className="text-sm">Quản Trị Viên</span>
              </Link>
            )}
            <Link
              to={"join"}
              className="flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-black"
            >
              <img src={IconUser} alt="User" className="size-4" />
              <span className="text-sm">
                {currentUser?.username || "Đăng Nhập"}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
