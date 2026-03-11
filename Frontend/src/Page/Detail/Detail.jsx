import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import imgRM from '../Classify/TvShow/image/rm.jpg';
import imgRV from '../Classify/TvShow/image/rv.jpg';
import imgSNN from '../Classify/TvShow/image/snn.jpg';
import img2N1D from '../Classify/TvShow/image/2n1d.jpg';
import imgTMS from '../Classify/TvShow/image/tms.jpg';
import imgVTT from '../Classify/TvShow/image/vtt.jpg';
import imgNNC from '../Classify/TvShow/image/nnn.jpg';  
import imgAT from '../Classify/TvShow/image/atvncg.jpg';
import imgCD from '../Classify/TvShow/image/cd.jpg';
import imgHT from '../Classify/TvShow/image/htrr.jpg';
import imgKOC from '../Classify/TvShow/image/koc.jpg';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const tvShowData = {
    "1": { name: "Running Man Vietnam", desc: "...", rating: "9.5", image: imgRM, year: "2021", genre: "Thực Tế, Vận Động", time: "90 phút/tập", network: "HTV7", totalEps: 15 },
    "2": { name: "Rap Việt Mùa 3", desc: "...", rating: "9.8", image: imgRV, year: "2023", genre: "Âm Nhạc, Show Thực Tế", time: "120 phút/tập", network: "VieON", totalEps: 16 },
    "3": { name: "Sao Nhập Ngũ", desc: "...", rating: "9.2", image: imgSNN, year: "2024", genre: "Quân Đội, Hài Hước", time: "60 phút/tập", network: "QPVN", totalEps: 12 },
    "4": { name: "2 Ngày 1 Đêm", desc: "...", rating: "9.7", image: img2N1D, year: "2022", genre: "Du Lịch, Khám Phá", time: "100 phút/tập", network: "HTV7", totalEps: 20 },
    "5": { name: "The Masked Singer", desc: "...", rating: "9.6", image: imgTMS, year: "2023", genre: "Âm Nhạc, Bí Ẩn", time: "110 phút/tập", network: "Vie Channel", totalEps: 16 },
    "6": { name: "Vua Tiếng Việt", desc: "...", rating: "9.4", image: imgVTT, year: "2023", genre: "Giáo Dục, Thi Đấu", time: "90 phút/tập", network: "VTV", totalEps: 12 },
    "7": { name: "Nhanh Như Chớp", desc: "...", rating: "8.3", image: imgNNC, year: "2024", genre: "Trò Chơi, Hài Hước", time: "60 phút/tập", network: "HTV7", totalEps: 20 },
    "8": { name: "Anh Trai Vượt Ngàn Chông Gai", desc: "Show âm nhạc quy tụ 33 'anh tài' đình đám của showbiz Việt.", rating: "9.9", image: imgAT, year: "2024", genre: "Âm Nhạc, Thực Tế", time: "120 phút/tập", network: "VTV3", totalEps: 0 },
    "9": { name: "Chị Đẹp Đạp Gió Rẽ Sóng", desc: "Mùa 2 hứa hẹn mang đến những sân khấu bùng nổ của các chị đẹp.", rating: "9.5", image: imgCD, year: "2024", genre: "Âm Nhạc, Show Thực Tế", time: "120 phút/tập", network: "VTV3", totalEps: 0 },
    "10": { name: "Hành Trình Rực Rỡ Mùa 2", desc: "Tiếp tục khám phá cảnh đẹp và văn hóa Việt Nam.", rating: "9.0", image: imgHT, year: "2024", genre: "Du Lịch, Khám Phá", time: "90 phút/tập", network: "VTV3", totalEps: 0 },
    "11": { name: "KOC VIETNAM 2024", desc: "Sân chơi bùng nổ của các nhà sáng tạo nội dung thế hệ mới.", rating: "8.8", image: imgKOC, year: "2024", genre: "Thực Tế, Kinh Doanh", time: "60 phút/tập", network: "YouTube", totalEps: 0 },
  };

  const movie = tvShowData[id] || tvShowData["1"];
  const episodesList = Array.from({ length: movie.totalEps }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-[#191B24] text-white font-sans pb-24">
      
      <div className="relative w-full h-[65vh] md:h-[75vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
          <img src={movie.image} alt="Banner" className="absolute inset-0 w-full h-full object-cover object-top opacity-50 scale-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#191B24] via-[#191B24]/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#191B24] to-transparent"></div>
        </div>
        
        <button onClick={() => navigate(-1)} className="absolute top-24 left-4 md:top-28 md:left-8 z-10 flex items-center justify-center w-11 h-11 bg-black/40 hover:bg-orange-500 text-white rounded-full backdrop-blur-md border border-white/10 transition-all group shadow-lg" title="Quay lại">
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div className="absolute bottom-0 left-0 w-full z-10 translate-y-1/3">
          <div className="container mx-auto px-4 lg:px-12">
            <div className="bg-[#212431]/90 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-5 md:p-8 flex flex-col md:flex-row items-center md:items-end gap-8">
              
              <div className="w-40 md:w-56 aspect-[2/3] bg-[#333] rounded-xl flex-shrink-0 border-4 border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.8)] -mt-32 md:-mt-48 overflow-hidden z-10">
                <img src={movie.image} alt={movie.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 w-full flex flex-col xl:flex-row justify-between items-center gap-6 mt-4 md:mt-0">
                <div className="flex flex-wrap gap-4 items-center justify-center xl:justify-start w-full xl:w-auto">
                  
                  {movie.totalEps > 0 ? (
                    <Link to={`/watch/${id}?tap=1`} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-3 md:py-4 px-10 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      XEM NGAY
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-700 text-gray-400 font-bold py-3 md:py-4 px-10 rounded-full flex items-center gap-2 cursor-not-allowed shadow-inner border border-gray-600">
                      <span className="text-xl">⏳</span> SẮP CHIẾU
                    </button>
                  )}
                  
                  <div className="flex gap-3">
                    <ActionButton icon={<span className="text-xl">❤️</span>} label="Yêu thích" />
                    <ActionButton icon={<span className="text-xl">➕</span>} label="Lưu lại" />
                    <ActionButton icon={<span className="text-xl">🔗</span>} label="Chia sẻ" />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-[#111]/80 px-6 py-3 rounded-2xl border border-gray-700 shadow-inner">
                  <span className="text-yellow-400 text-3xl">⭐</span>
                  <div className="flex flex-col">
                    <span className="font-bold text-2xl leading-none">{movie.rating} <span className="text-sm text-gray-500 font-normal">/10</span></span>
                    <span className="text-xs text-gray-400 uppercase tracking-wider mt-1">Điểm ToPhim</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-12 mt-48 md:mt-56">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">{movie.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm md:text-base text-gray-300 font-medium">
            <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded border border-orange-500/30">{movie.year}</span>
            <span className="bg-gray-800 px-3 py-1 rounded">{movie.genre}</span>
            <span className="bg-gray-800 px-3 py-1 rounded">📺 {movie.network}</span>
            <span className="bg-gray-800 px-3 py-1 rounded">⏳ {movie.time}</span>
            <span className="bg-gray-800 px-3 py-1 rounded">🎬 {movie.totalEps} Tập</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-orange-500 pl-3">Nội Dung Phim</h2>
            <p className="text-gray-400 leading-relaxed text-lg text-justify mb-10">
              {movie.desc}
            </p>

            <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-3">Chọn Tập Phát Sóng</h2>
            {movie.totalEps > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {episodesList.map((ep) => (
                  <Link 
                    to={`/watch/${id}?tap=${ep}`} 
                    key={ep}
                    className="bg-[#212431] hover:bg-orange-500 hover:text-white border border-gray-700 hover:border-orange-500 text-gray-300 font-bold py-3 rounded-lg text-center transition-all shadow hover:shadow-orange-500/50"
                  >
                    {ep}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="w-full bg-[#212431] border border-gray-700 text-orange-400 p-8 rounded-2xl text-center flex flex-col items-center justify-center gap-3">
                <span className="text-5xl">🍿</span>
                <p className="text-xl font-bold text-gray-200 mt-2">Chương trình đang trong quá trình sản xuất</p>
                <p className="text-sm font-normal text-gray-400">Hãy theo dõi ToPhim để nhận thông báo ngay khi có tập mới nhé!</p>
              </div>
            )}
            
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-[#212431] p-6 rounded-2xl border border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-orange-500">Thông tin thêm</h3>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li><strong className="text-gray-200">Đạo diễn:</strong> Đang cập nhật</li>
                <li><strong className="text-gray-200">Quốc gia:</strong> Việt Nam</li>
                <li><strong className="text-gray-200">Chất lượng:</strong> Full HD (1080p)</li>
                <li><strong className="text-gray-200">Ngôn ngữ:</strong> Lồng tiếng / Phụ đề</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionButton = ({ icon, label }) => (
  <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors group px-2">
    <div className="bg-[#111] p-3 rounded-full group-hover:bg-[#333] border border-gray-700 group-hover:border-orange-500 transition-all shadow-lg">
      {icon}
    </div>
    <span className="text-[10px] font-medium uppercase tracking-wider mt-1">{label}</span>
  </button>
);

export default Detail;