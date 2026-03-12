import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

const TvShowWatch = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tapFromUrl = parseInt(searchParams.get('tap')) || 1;

  const movieData = {
    "1": { name: "Running Man Vietnam", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/2Eiq7EDJ8" }, { epId: 2, epName: "2", link: "https://short.icu/..." }] },
    "2": { name: "Rap Việt Mùa 3", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/SXjDsXFuN" }] },
    "3": { name: "Sao Nhập Ngũ", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/QxLhDxO-R" }] },
    "4": { name: "2 Ngày 1 Đêm", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/_Fpajm4nR" }] },
    "5": { name: "The Masked Singer", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/lojL-Ox5X" }] },
    "6": { name: "Vua Tiếng Việt", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/aboLcqIO3" }] },
    "7": { name: "Nhanh Như Chớp", episodes: [{ epId: 1, epName: "1", link: "https://short.icu/hLOSTI9xN" }] },
    "8": { name: "Anh Trai Vượt Ngàn Chông Gai", episodes: [] },
    "9": { name: "Chị Đẹp Đạp Gió Rẽ Sóng", episodes: [] },
    "10": { name: "Hành Trình Rực Rỡ Mùa 2", episodes: [] },
    "11": { name: "KOC VIETNAM 2024", episodes: [] },
  };

  const currentMovie = movieData[id] || movieData["1"];

  const findEpisode = useCallback((tId) => {
    if (!currentMovie.episodes || currentMovie.episodes.length === 0) return null;
    return currentMovie.episodes.find(e => e.epId === tId) || currentMovie.episodes[0];
  }, [currentMovie]);

  const [currEp, setCurrEp] = useState(findEpisode(tapFromUrl));

  useEffect(() => { 
    setCurrEp(findEpisode(tapFromUrl));
    window.scrollTo(0, 0); 
  }, [id, tapFromUrl, findEpisode]);

  const changeEpisode = (ep) => {
    setCurrEp(ep);
    navigate(`/watch/${id}?tap=${ep.epId}`);
  };

  if (!currentMovie.episodes || currentMovie.episodes.length === 0) {
    return (
      <div className="min-h-screen bg-[#191B24] text-white pt-32 flex flex-col items-center justify-center font-sans">
        <span className="text-6xl mb-6">🚧</span>
        <h1 className="text-3xl font-black mb-4 text-orange-500 uppercase">Phim chưa phát sóng</h1>
        <p className="text-gray-400 mb-8">Nội dung này hiện đang được cập nhật. Vui lòng quay lại sau!</p>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-[#212431] border border-gray-700 hover:border-orange-500 text-white px-8 py-3 rounded-full font-bold transition-all hover:text-orange-500"
        >
          Quay lại trang trước
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191B24] text-white pt-24 px-4 pb-20 font-sans transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        
        <button onClick={() => navigate(-1)} className="mb-8 flex items-center gap-3 text-gray-400 hover:text-orange-500 transition-all font-black uppercase text-xs tracking-widest group">
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#212431] group-hover:bg-orange-500 group-hover:text-white transition-all shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          Quay lại trang chi tiết
        </button>

        <h1 className="text-2xl md:text-4xl font-black mb-8 border-l-8 border-orange-500 pl-5 uppercase">
          Đang phát: <span className="text-orange-500">{currentMovie.name}</span> 
          <span className="ml-4 text-gray-500 text-xl md:text-2xl italic">Tập {currEp?.epName || 'N/A'}</span>
        </h1>

        <div className="relative w-full aspect-video bg-black rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-gray-800">
          {currEp?.link ? (
            <iframe 
              key={currEp.link}
              title="ToPhim Player"
              src={currEp.link} 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen
              className="absolute inset-0"
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
              Đang tải video...
            </div>
          )}
        </div>

        <div className="mt-12 bg-[#212431]/80 backdrop-blur-xl p-8 rounded-[2rem] border border-gray-800 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-2 h-8 bg-orange-500 rounded-full" />
            <h3 className="text-2xl font-black uppercase">Chọn tập phát sóng</h3>
          </div>
          
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
            {currentMovie.episodes.map((ep) => (
              <button 
                key={ep.epId}
                onClick={() => changeEpisode(ep)}
                className={`py-4 rounded-2xl font-black transition-all shadow-lg text-sm md:text-base ${
                  currEp.epId === ep.epId 
                    ? "bg-orange-500 text-white scale-110 shadow-orange-500/40" 
                    : "bg-[#111] border border-gray-700 text-gray-400 hover:border-orange-500 hover:text-orange-500"
                }`}
              >
                {ep.epName}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TvShowWatch;