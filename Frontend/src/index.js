import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BgProvider from "./Components/BackgroundGlobal/Background";
import ItemOutlet from "./Components/BackgroundGlobal/ItemOutlet";

import "./index.css";

import reportWebVitals from "./reportWebVitals";
import Home from "./Page/Home/Home";
import ReLog from "./Page/Register&Login/Register&Login";
import Manager from "./Page/Manager/Manager";
import Classtify from "./Page/Classify/TheLoai/Classtify";
import SingleMovie from "./Page/Classify/PhimLe/SingleMovies";
import Series from "./Page/Classify/PhimBo/Series";
import TvShow from "./Page/Classify/TvShow/TvShow";
import TheateMovie from "./Page/Classify/PhimChieuRap/TheateMovie";
import Detail from "./Page/Detail/Detail";
import Play from "./Page/Detail/Play";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BgProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<ItemOutlet />}>
          <Route path="/" element={<Home />} />
          <Route path="tham-gia" element={<ReLog />} />
          <Route path="quan-tri-vien" element={<Manager />} />
          <Route path="phim-le" element={<SingleMovie />} />
          <Route path="phim-bo" element={<Series />} />
          <Route path="the-loai/:genre" element={<Classtify />} />
          <Route path="tvshow" element={<TvShow />} />
          <Route path="phim-chieu-rap" element={<TheateMovie />} />
          <Route path="chi-tiet/:id" element={<Detail />} />
          <Route path="xem-phim/:id" element={<Play />} />
          <Route path="" />
        </Route>
      </Routes>
    </BrowserRouter>
  </BgProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
