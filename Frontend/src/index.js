import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BgProvider from "./Components/BackgroundGlobal/Background";
import ItemOutlet from "./Components/BackgroundGlobal/ItemOutlet";
import MovieDetail from "./Page/Classify/PhimBo/MovieDetail";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./Page/Home/Home";
import ReLog from "./Page/Register&Login/Register&Login";
import Manager from "./Page/Manager/Manager";
import Classtify from "./Page/Classify/TheLoai/Classtify";
import Country from "./Page/Classify/QuocGia/Country";
import SingleMovie from "./Page/Classify/PhimLe/SingleMovies";
import Series from "./Page/Classify/PhimBo/Series";
import TvShow from "./Page/Classify/TvShow/TvShow";
import TheateMovie from "./Page/Classify/PhimChieuRap/TheateMovie";
import WatchMovie from "./Page/Classify/PhimBo/WatchMovie";
import WatchMovieSingle from "./Page/Classify/PhimLe/WatchMovie";
import MovieCard from "./Page/Classify/PhimBo/MovieCard";
import Play from "./Page/Detail/Play";
import Detail from "./Page/Detail/Detail";
import SingleMoviesDetali from "./Page/Classify/PhimLe/MovieDetail";

// Khai báo 2 trang TV Show mới đổi tên của bạn
import TvShowWatch from "./Page/TvShowWatch/TvShowWatch";
import TvShowDetail from "./Page/TvShowDetail/TvShowDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BgProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ItemOutlet />}>
          {/* Các trang chính */}
          <Route path="/" element={<Home />} />
          <Route path="tham-gia" element={<ReLog />} />
          <Route path="quan-tri-vien" element={<Manager />} />

          {/* Phân loại phim */}
          <Route path="phim-le" element={<SingleMovie />} />
          <Route path="phim-bo" element={<Series />} />
          <Route path="tvshow" element={<TvShow />} />
          <Route path="phim-chieu-rap" element={<TheateMovie />} />
          <Route path="the-loai/:genre" element={<Classtify />} />
          <Route path="quoc-gia/:country" element={<Country />} />

          {/* Chi tiết phim và Xem phim chung */}
          <Route path="chi-tiet/:id" element={<Detail />} />
          <Route path="phim/:id" element={<MovieDetail />} />
          <Route path="singleMovies/:id" element={<SingleMoviesDetali />} />
          <Route path="watch/:id" element={<WatchMovie />} />
          <Route path="play/:id" element={<Play />} />

          <Route path="xem-phim/:id" element={<WatchMovieSingle />} />

          {/* TUYẾN ĐƯỜNG RIÊNG CHO TV SHOW CỦA BẠN */}
          <Route path="tvshow/:id" element={<TvShowDetail />} />
          <Route path="watch-tvshow/:id" element={<TvShowWatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </BgProvider>,
);

reportWebVitals();
