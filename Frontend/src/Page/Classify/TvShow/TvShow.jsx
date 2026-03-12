import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import imgRM from './image/rm.jpg';
import imgRV from './image/rv.jpg';
import imgSNN from './image/snn.jpg';
import img2N1D from './image/2n1d.jpg';
import imgTMS from './image/tms.jpg';
import imgNNC from './image/nnn.jpg';
import imgVTT from './image/vtt.jpg';
import imgAT from './image/atvncg.jpg';
import imgCD from './image/cd.jpg';
import imgHT from './image/htrr.jpg';
import imgKOC from './image/koc.jpg';

const TvShow = () => {

  const [filterCategory, setFilterCategory] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const mockTvShows = [
    { id: 1, name: "Running Man Vietnam", episode: "Tập 1", rating: "8.5", image: imgRM, category: "reality", year: "2023", views: 8500, dateAdded: "2023-10-01" },
    { id: 2, name: "Rap Việt Mùa 3", episode: "Tập 12", rating: "9.2", image: imgRV, category: "music", year: "2023", views: 9800, dateAdded: "2023-09-15" },
    { id: 3, name: "Sao Nhập Ngũ", episode: "Tập 5", rating: "7.8", image: imgSNN, category: "reality", year: "2024", views: 7200, dateAdded: "2024-01-10" },
    { id: 4, name: "2 Ngày 1 Đêm", episode: "Tập 30", rating: "8.9", image: img2N1D, category: "reality", year: "2022", views: 9200, dateAdded: "2022-05-20" },
    { id: 5, name: "The Masked Singer", episode: "Tập 16", rating: "9.0", image: imgTMS, category: "music", year: "2023", views: 9500, dateAdded: "2023-11-05" },
    { id: 6, name: "Vua Tiếng Việt", episode: "Tập 10", rating: "7.5", image: imgVTT, category: "reality", year: "2023", views: 6800, dateAdded: "2023-08-20" },
    { id: 7, name: "Nhanh Như Chớp", episode: "Mới nhất", rating: "8.1", image: imgNNC, category: "comedy", year: "2024", views: 5000, dateAdded: "2024-02-01" },
    { id: 8, name: "Anh Trai Vượt Ngàn Chông Gai", episode: "Sắp chiếu", rating: "9.9", image: imgAT, category: "music", year: "2024", views: 15000, dateAdded: "2024-06-01" },
    { id: 9, name: "Chị Đẹp Đạp Gió Rẽ Sóng", episode: "Trailer", rating: "9.5", image: imgCD, category: "music", year: "2024", views: 12000, dateAdded: "2024-07-01" },
    { id: 10, name: "Hành Trình Rực Rỡ Mùa 2", episode: "Sắp chiếu", rating: "9.0", image: imgHT, category: "reality", year: "2024", views: 8000, dateAdded: "2024-08-01" },
    { id: 11, name: "KOC VIETNAM 2024", episode: "Sắp chiếu", rating: "8.8", image: imgKOC, category: "reality", year: "2024", views: 5000, dateAdded: "2024-09-01" },
  ];

  let filteredShows = mockTvShows.filter((show) => {
    if (filterCategory !== "" && show.category !== filterCategory) return false;
    if (filterYear !== "" && show.year !== filterYear) return false;
    return true;
  });

  // MA THUẬT SẮP XẾP Ở ĐÂY
  filteredShows.sort((a, b) => {
    // 1. Phân loại xem phim nào đang "Sắp chiếu" hoặc "Trailer"
    const isA_Upcoming = a.episode === "Sắp chiếu" || a.episode === "Trailer";
    const isB_Upcoming = b.episode === "Sắp chiếu" || b.episode === "Trailer";

    // 2. Đẩy phim chưa chiếu xuống dưới cùng
    if (isA_Upcoming && !isB_Upcoming) return 1;  // A chưa chiếu, B có chiếu -> Đẩy A xuống dưới
    if (!isA_Upcoming && isB_Upcoming) return -1; // A có chiếu, B chưa chiếu -> Đẩy A lên trên

    // 3. Nếu 2 phim cùng trạng thái (cùng đã chiếu hoặc cùng chưa chiếu), thì mới xét đến bộ lọc của người dùng
    if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
    if (sortBy === "views") return b.views - a.views;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#191B24] text-white pt-24 pb-12 font-sans">
      <div className="container mx-auto px-4 lg:px-12">
        <h1 className="text-3xl md:text-5xl font-black mb-10 border-l-8 border-orange-500 pl-6 uppercase tracking-tighter shadow-orange-500/10">
          TV Show Nổi Bật
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 mb-12 bg-[#222]/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5 shadow-2xl">
          
          <select 
            value={filterCategory} 
            onChange={(e) => setFilterCategory(e.target.value)} 
            className="bg-[#111] text-gray-400 border border-white/5 rounded-xl px-5 py-3 focus:border-orange-500 outline-none cursor-pointer hover:bg-black transition-all font-bold text-sm"
          >
            <option value="">Tất cả thể loại</option>
            <option value="reality">Show Thực Tế</option>
            <option value="music">Âm Nhạc</option>
            <option value="comedy">Hài Hước</option>
          </select>

          <select 
            value={filterYear} 
            onChange={(e) => setFilterYear(e.target.value)} 
            className="bg-[#111] text-gray-400 border border-white/5 rounded-xl px-5 py-3 focus:border-orange-500 outline-none cursor-pointer hover:bg-black transition-all font-bold text-sm"
          >
            <option value="">Mọi năm</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)} 
            className="bg-[#111] text-gray-400 border border-white/5 rounded-xl px-5 py-3 focus:border-orange-500 outline-none cursor-pointer hover:bg-black transition-all font-bold text-sm md:ml-auto"
          >
            <option value="newest">Mới cập nhật</option>
            <option value="views">Xem nhiều nhất</option>
          </select>

        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {filteredShows.map((show) => (
            <Link to={`/tvshow/${show.id}`} key={show.id} className="group relative block">
              <div className="relative aspect-[2/3] rounded-[2rem] overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-500 group-hover:scale-[1.25] group-hover:shadow-orange-500/20 border border-white/5 group-hover:border-orange-500">
                
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-green-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg z-20">
                  {show.rating}
                </div>
                
                <img src={show.image} alt={show.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-4 py-2 rounded-full shadow-2xl uppercase tracking-tighter z-20 whitespace-nowrap">
                  {show.episode}
                </div>

                
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <h3 className="mt-5 text-center font-black text-sm md:text-base truncate group-hover:text-orange-500 transition-all duration-300 px-2 tracking-tight">
                {show.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TvShow;