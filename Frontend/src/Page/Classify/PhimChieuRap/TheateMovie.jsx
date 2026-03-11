import React, { useState, useMemo, useEffect } from 'react';

// 1. Dữ liệu phim
const rawMoviesData = [
  { title: "Mai", subTitle: "Trấn Thành Đạo Diễn", genre: "Tình cảm", country: "Việt Nam", year: "2024", videoId: "JfVOs4VSpmA" },
  { title: "Lật Mặt 7", subTitle: "Một Điều Ước", genre: "Tâm lý", country: "Việt Nam", year: "2024", videoId: "TcMBFSGVi1c" },
  { title: "Exhuma", subTitle: "Quật Mộ Trùng Ma", genre: "Kinh dị", country: "Hàn Quốc", year: "2024", videoId: "d9MyW72ELq0" },
  { title: "Dune: Part Two", subTitle: "Hành Tinh Cát", genre: "Viễn tưởng", country: "Mỹ", year: "2024", videoId: "DqO90qCG4jc" },
  { title: "Deadpool & Wolverine", subTitle: "Marvel Studios", genre: "Hành động", country: "Mỹ", year: "2024", videoId: "8Qn_spdM5Zg" },
  { title: "Inside Out 2", subTitle: "Những Mảnh Ghép Cảm Xúc", genre: "Hoạt hình", country: "Mỹ", year: "2024", videoId: "6ZfuNTqbHE8" },
  { title: "Godzilla x Kong", subTitle: "Đế Chế Mới", genre: "Hành động", country: "Mỹ", year: "2024", videoId: "9bZkp7q19f0" },
  { title: "Oppenheimer", subTitle: "Cha đẻ bom nguyên tử", genre: "Tâm lý", country: "Anh", year: "2023", videoId: "3fumBcKC6RE" },
  { title: "Quỷ Cẩu", subTitle: "Nghiệp Báo", genre: "Kinh dị", country: "Việt Nam", year: "2023", videoId: "2Vv-BfVoq4g" },
  { title: "Nhà Bà Nữ", subTitle: "Gia đình là trên hết", genre: "Tâm lý", country: "Việt Nam", year: "2023", videoId: "OPf0YbXqDm0" },
  { title: "Kẻ Ăn Hồn", subTitle: "Tết Ở Làng Địa Ngục", genre: "Kinh dị", country: "Việt Nam", year: "2023", videoId: "kJQP7kiw5Fk" },
  { title: "Người Vợ Cuối Cùng", subTitle: "Đạo diễn Victor Vũ", genre: "Tình cảm", country: "Việt Nam", year: "2023", videoId: "JGwWNGJdvx8" },
  { title: "Avatar 2", subTitle: "Dòng Chảy Của Nước", genre: "Viễn tưởng", country: "Mỹ", year: "2022", videoId: "F4tHL8reNCs" },
  { title: "Spider-Man", subTitle: "No Way Home", genre: "Hành động", country: "Mỹ", year: "2021", videoId: "PT2_F-1esPk" },
  { title: "Bố Già", subTitle: "Tình Phụ Tử", genre: "Tâm lý", country: "Việt Nam", year: "2021", videoId: "09R8_2nJtjg" },
  { title: "Tiệc Trăng Máu", subTitle: "Bản Làm Lại Xuất Sắc", genre: "Hài hước", country: "Việt Nam", year: "2020", videoId: "YQHsXMglC9A" },
  { title: "Mắt Biếc", subTitle: "Ngạn & Hà Lan", genre: "Tình cảm", country: "Việt Nam", year: "2019", videoId: "RgKAFK5djSk" },
  { title: "Avengers", subTitle: "Endgame", genre: "Hành động", country: "Mỹ", year: "2019", videoId: "eVTXPUF4Oz4" },
  { title: "Parasite", subTitle: "Ký Sinh Trùng", genre: "Tâm lý", country: "Hàn Quốc", year: "2019", videoId: "CevxZvSJLk8" },
  { title: "Interstellar", subTitle: "Hố Đen Tử Thần", genre: "Viễn tưởng", country: "Mỹ", year: "Trước 2019", videoId: "SlPhMPnQ58k" }
];

// Hàm lấy dữ liệu diễn viên mẫu
const getActors = (seed, country) => {
  const vnActors = ["Trấn Thành", "Tuấn Trần", "Phương Anh Đào", "Uyển Ân", "Lý Hải", "Kiều Minh Tuấn", "Thu Trang", "Thái Hòa"];
  const usActors = ["Robert Downey", "Chris Evans", "Scarlett J.", "Cillian Murphy", "Zendaya", "Tom Holland", "Leonardo", "Cillian"];
  const names = country === "Việt Nam" ? vnActors : usActors;
  
  return [0, 1, 2, 3].map(j => {
    const name = names[(seed + j) % names.length];
    return { name, avatar: `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}` };
  });
};

// Hàm lấy dữ liệu đạo diễn mẫu
const getDirectors = (seed, country) => {
  const name = country === "Việt Nam" 
    ? (seed % 2 === 0 ? "Trấn Thành" : "Lý Hải") 
    : (seed % 2 === 0 ? "Christopher Nolan" : "James Cameron");
  return [{ name, avatar: `https://i.pravatar.cc/150?u=${name.replace(/\s/g, '')}` }];
};

const moviesData = rawMoviesData.map((movie, i) => ({
  id: i,
  title: movie.title,
  subTitle: movie.subTitle, 
  imageUrl: `https://picsum.photos/seed/${i + 900}/300/450`,
  tags: i < 3 ? ["Rạp", "HOT"] : ["HD", "Vietsub"], 
  videoUrl: `https://www.youtube.com/embed/${movie.videoId}`, 
  genre: movie.genre, 
  country: movie.country, 
  year: movie.year,
  directors: getDirectors(i, movie.country),
  actors: getActors(i, movie.country),
  producer: movie.country === "Việt Nam" ? "HKFilm, Trấn Thành Town" : "Warner Bros, Universal",
  description: `Đây là bộ phim "${movie.title}" - một trong những tác phẩm nổi bật của điện ảnh ${movie.country} ra mắt năm ${movie.year}. Phim hứa hẹn mang đến cho người xem những giây phút thăng hoa cảm xúc cùng những cảnh quay hoành tráng và kỹ xảo đỉnh cao. Câu chuyện xoay quanh những nhân vật phức tạp, đối mặt với thử thách để bảo vệ những gì họ trân quý nhất.`
}));

const genres = ["All", ...new Set(moviesData.map(m => m.genre))];
const countries = ["All", ...new Set(moviesData.map(m => m.country))];
const years = ["All", ...new Set(moviesData.map(m => m.year))].sort((a, b) => b.localeCompare(a));

// 2. COMPONENT: Thẻ Phim (MovieCard)

const MovieCard = ({ title, subTitle, imageUrl, tags = [], onClick, isFavorite, onToggleFavorite }) => {
  return (
    <div 
      onClick={onClick} 
      className="flex flex-col space-y-2 group cursor-pointer w-full transition-all duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl shadow-lg bg-[#2A2D36] border border-gray-800">
        <img 
          src={imageUrl} alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-yellow-500 rounded-full p-3 shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <svg width="28" height="28" fill="black" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/60 hover:bg-black/90 transition-colors"
        >
          <svg className={`w-5 h-5 transition-colors duration-300 ${isFavorite ? 'text-red-500 fill-current' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
        <div className="absolute bottom-2 left-2 flex gap-1.5 flex-wrap">
          {tags.map((tag, index) => (
            <span key={index} className={`text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase shadow-md ${tag === 'HOT' ? 'bg-red-600 text-white' : 'bg-gray-900/90 text-white border border-gray-700'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="text-center px-1">
        <h3 className="text-[13px] font-bold line-clamp-1 text-gray-100 group-hover:text-yellow-500 transition-colors uppercase tracking-wider">
          {title}
        </h3>
        <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 italic uppercase">{subTitle}</p>
      </div>
    </div>
  );
};

// 3. COMPONENT CHÍNH: Trang Xem Phim

const TheaterMovie = () => {
  const [currentMovie, setCurrentMovie] = useState(null); 
  const [isPlaying, setIsPlaying] = useState(false); 
  
  const [searchInput, setSearchInput] = useState(''); 
  const [searchTerm, setSearchTerm] = useState(''); 

  const [visibleCount, setVisibleCount] = useState(12);
  const [filters, setFilters] = useState({ country: 'All', genre: 'All', year: 'All', onlyFavorites: false });

  const [favorites, setFavorites] = useState(() => {
    const savedFavs = localStorage.getItem('myFavoriteMovies');
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem('movieReviews');
    return savedReviews ? JSON.parse(savedReviews) : {};
  });

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
      setVisibleCount(12); 
    }, 400); 
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    localStorage.setItem('myFavoriteMovies', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('movieReviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleOpenMovieDetails = (movie) => {
    setCurrentMovie(movie);
    setIsPlaying(false); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setCurrentMovie(null);
    setIsPlaying(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setVisibleCount(12);
  };

  const toggleFavoriteFilter = () => {
    setFilters(prev => ({ ...prev, onlyFavorites: !prev.onlyFavorites }));
    setVisibleCount(12);
  };

  const toggleFavorite = (movie) => {
    setFavorites(prev => {
      const isExist = prev.find(item => item.id === movie.id);
      if (isExist) return prev.filter(item => item.id !== movie.id);
      return [...prev, movie];
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!currentMovie) return; 
    if (!newComment.trim() || newRating === 0) return alert("Vui lòng nhập bình luận và chọn số sao đánh giá!");

    const newReview = {
      id: Date.now(),
      user: "Khách Ẩn Danh",
      text: newComment,
      rating: newRating,
      date: new Date().toLocaleDateString('vi-VN')
    };

    setReviews(prev => ({
      ...prev,
      [currentMovie.id]: [newReview, ...(prev[currentMovie.id] || [])] 
    }));
    setNewComment("");
    setNewRating(0);
  };

  const filteredMovies = useMemo(() => {
    return moviesData.filter(movie => {
      const matchSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || movie.subTitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCountry = filters.country === 'All' || movie.country === filters.country;
      const matchGenre = filters.genre === 'All' || movie.genre === filters.genre;
      const matchYear = filters.year === 'All' || movie.year === filters.year;
      const matchFavorite = !filters.onlyFavorites || favorites.some(fav => fav.id === movie.id);
      return matchSearch && matchCountry && matchGenre && matchYear && matchFavorite;
    });
  }, [filters, searchTerm, favorites]);

  const displayedMovies = filteredMovies.slice(0, visibleCount);
  const isCurrentMovieFavorite = currentMovie ? favorites.some(fav => fav.id === currentMovie.id) : false;
  const currentMovieReviews = currentMovie ? (reviews[currentMovie.id] || []) : [];

  const averageRating = currentMovieReviews.length > 0 
    ? (currentMovieReviews.reduce((sum, review) => sum + review.rating, 0) / currentMovieReviews.length).toFixed(1)
    : 0;

  return (
    <div className="bg-[#14151a] min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
      {/* chi tiết phim */}
        {currentMovie ? (
          <div className="animate-fade-in">
            <button 
              onClick={handleBackToList}
              className="mb-6 flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors font-bold uppercase tracking-wider text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Trở về danh sách
            </button>

            <div className="mb-16 bg-[#101217] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-gray-800 flex flex-col">
              
              {/* TRÌNH PHÁT HOẶC POSTER */}
              {isPlaying ? (
                <div className="relative w-full aspect-video bg-black animate-fade-in">
                  <iframe 
                    key={currentMovie.id}
                    className="absolute top-0 left-0 w-full h-full"
                    src={`${currentMovie.videoUrl}?autoplay=1`}
                    title={currentMovie.title} 
                    frameBorder="0" 
                    allowFullScreen={true}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" 
                  ></iframe>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row gap-8 p-6 md:p-10 bg-gradient-to-br from-[#1a1c23] to-[#101217]">
                  <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                    <img src={currentMovie.imageUrl} alt={currentMovie.title} className="w-full rounded-xl shadow-2xl border border-gray-700" />
                  </div>
                  
                  <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs bg-yellow-500 text-black px-3 py-1 rounded-sm font-bold uppercase">{currentMovie.year}</span>
                      <span className="text-xs bg-[#2A2D36] text-gray-300 px-3 py-1 rounded-sm border border-gray-700 font-bold uppercase">{currentMovie.country}</span>
                      <span className="text-xs bg-[#2A2D36] text-gray-300 px-3 py-1 rounded-sm border border-gray-700 font-bold uppercase">{currentMovie.genre}</span>
                      {averageRating > 0 && (
                        <span className="text-xs bg-gray-800 text-yellow-500 px-3 py-1 rounded-sm border border-gray-700 font-bold flex items-center gap-1">
                          ★ {averageRating}
                        </span>
                      )}
                    </div>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                      {currentMovie.title}
                    </h1>
                    <p className="text-yellow-500 font-bold text-xl md:text-2xl italic uppercase mb-6">
                      {currentMovie.subTitle}
                    </p>

                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                      {currentMovie.description}
                    </p>
                    
                    <p className="text-sm text-gray-400 mb-6"><span className="text-gray-500 font-semibold w-24 inline-block">Sản xuất:</span> {currentMovie.producer}</p>

                    {/* KHU VỰC AVATAR: ĐẠO DIỄN VÀ DIỄN VIÊN */}
                    <div className="mb-8">
                      <h3 className="text-sm font-bold text-gray-300 mb-4 border-l-2 border-yellow-500 pl-2 uppercase tracking-wider">Đạo diễn & Diễn viên</h3>
                      <div className="flex gap-4 md:gap-6 overflow-x-auto pb-4 custom-scrollbar">
                        {/* Đạo diễn (có viền vàng và tag) */}
                        {currentMovie.directors.map((dir, idx) => (
                          <div key={`dir-${idx}`} className="flex flex-col items-center min-w-[70px] md:min-w-[80px]">
                            <div className="relative">
                              <img src={dir.avatar} alt={dir.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-yellow-500 shadow-lg" />
                              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">Đạo diễn</span>
                            </div>
                            <span className="text-[11px] md:text-xs text-gray-200 mt-4 text-center font-semibold">{dir.name}</span>
                          </div>
                        ))}
                        
                        {/* Diễn viên (viền xám) */}
                        {currentMovie.actors.map((actor, idx) => (
                          <div key={`act-${idx}`} className="flex flex-col items-center min-w-[70px] md:min-w-[80px]">
                            <img src={actor.avatar} alt={actor.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400 transition-colors shadow-lg" />
                            <span className="text-[11px] md:text-xs text-gray-400 mt-2.5 text-center">{actor.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CÁC NÚT BẤM */}
                    <div className="flex flex-wrap gap-4 mt-auto">
                      <button 
                        onClick={() => setIsPlaying(true)}
                        className="flex items-center gap-2 px-8 py-4 rounded-full bg-yellow-500 text-black font-black uppercase tracking-wider hover:bg-yellow-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        XEM PHIM NGAY
                      </button>

                      <button 
                        onClick={() => toggleFavorite(currentMovie)}
                        className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all border ${
                          isCurrentMovieFavorite 
                            ? 'bg-red-600/10 border-red-600 text-red-500' 
                            : 'bg-transparent border-gray-600 text-gray-300 hover:border-white hover:text-white'
                        }`}
                      >
                        <svg className={`w-5 h-5 ${isCurrentMovieFavorite ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        {isCurrentMovieFavorite ? 'Đã Lưu' : 'Lưu Phim'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* BÌNH LUẬN & ĐÁNH GIÁ */}
              <div className="p-6 md:p-8 border-t border-gray-800 bg-[#0a0b0e]">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-xl font-bold text-white border-l-4 border-yellow-500 pl-3 m-0">
                    Bình Luận & Đánh Giá
                  </h3>
                </div>
                
                <form onSubmit={handleSubmitReview} className="mb-8 bg-[#14151a] p-5 rounded-xl border border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400 text-sm">Đánh giá của bạn:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg 
                          key={star}
                          onClick={() => setNewRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className={`w-6 h-6 cursor-pointer transition-colors ${star <= (hoverRating || newRating) ? 'text-yellow-500' : 'text-gray-600'}`} 
                          fill="currentColor" viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <textarea 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Nêu cảm nghĩ của bạn về bộ phim này..."
                    className="w-full bg-[#2A2D36] text-white rounded-lg border border-gray-700 focus:border-yellow-500 outline-none p-3 mb-4 resize-none h-24"
                  ></textarea>
                  <div className="flex justify-end">
                    <button type="submit" className="bg-yellow-500 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-400 transition-colors">
                      Gửi Bình Luận
                    </button>
                  </div>
                </form>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {currentMovieReviews.length > 0 ? (
                    currentMovieReviews.map((review) => (
                      <div key={review.id} className="bg-[#14151a] p-4 rounded-lg border border-gray-800">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <span className="font-bold text-gray-200 block">{review.user}</span>
                            <span className="text-xs text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-700'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 text-sm">{review.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4 italic text-sm">Chưa có bình luận nào. Hãy là người đầu tiên đánh giá!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
//  1 danh sách phim */}
          <div className="animate-fade-in">
            <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-8 gap-6">
              <div className="flex items-center border-l-[5px] border-yellow-500 pl-4">
                <h2 className="text-xl md:text-2xl font-extrabold text-white uppercase tracking-tighter">
                  {filters.onlyFavorites ? 'Phim Bạn Đã Lưu' : 'Danh Sách Phim Chiếu Rạp'}
                </h2>
              </div>

              <div className="flex flex-col md:flex-row flex-wrap items-center gap-3">
                <div className="relative w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="Tìm tên phim (VD: Lật Mặt)..." 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full md:w-64 bg-[#2A2D36] text-white text-sm rounded-lg border border-gray-700 focus:border-yellow-500 outline-none pl-10 pr-4 py-2.5 transition-all"
                  />
                  <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>

                <div className="flex flex-wrap items-center gap-2 bg-[#101217] p-1.5 rounded-lg border border-gray-800 w-full md:w-auto">
                  <select name="country" value={filters.country} onChange={handleFilterChange} className="bg-[#2A2D36] text-gray-300 text-sm rounded border border-gray-700 focus:border-yellow-500 outline-none px-3 py-2 cursor-pointer max-w-[120px]">
                    {countries.map(c => <option key={c} value={c}>{c === 'All' ? '- Quốc gia -' : c}</option>)}
                  </select>

                  <select name="genre" value={filters.genre} onChange={handleFilterChange} className="bg-[#2A2D36] text-gray-300 text-sm rounded border border-gray-700 focus:border-yellow-500 outline-none px-3 py-2 cursor-pointer max-w-[120px]">
                    {genres.map(g => <option key={g} value={g}>{g === 'All' ? '- Thể loại -' : g}</option>)}
                  </select>

                  <select name="year" value={filters.year} onChange={handleFilterChange} className="bg-[#2A2D36] text-gray-300 text-sm rounded border border-gray-700 focus:border-yellow-500 outline-none px-3 py-2 cursor-pointer max-w-[100px]">
                    {years.map(y => <option key={y} value={y}>{y === 'All' ? '- Năm -' : y}</option>)}
                  </select>
                </div>

                <button 
                  onClick={toggleFavoriteFilter}
                  className={`px-4 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                    filters.onlyFavorites 
                      ? 'bg-red-600/10 border-red-500 text-red-500' 
                      : 'bg-[#101217] border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                >
                  ♥ {filters.onlyFavorites ? `Đã lưu (${favorites.length})` : 'Chỉ hiện yêu thích'}
                </button>
              </div>
            </div>

            {displayedMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-10">
                {displayedMovies.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    title={movie.title} 
                    subTitle={movie.subTitle} 
                    imageUrl={movie.imageUrl} 
                    tags={movie.tags}
                    isFavorite={favorites.some(fav => fav.id === movie.id)}
                    onToggleFavorite={() => toggleFavorite(movie)}
                    onClick={() => handleOpenMovieDetails(movie)} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-[#101217] rounded-xl border border-gray-800">
                <p className="text-gray-500 text-sm">Không tìm thấy phim nào phù hợp.</p>
              </div>
            )}

            {filteredMovies.length > visibleCount && (
              <div className="mt-16 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 12)} 
                  className="px-12 py-3 rounded-full border border-gray-700 bg-[#101217] text-sm font-bold uppercase tracking-widest text-gray-300 transition-all hover:bg-yellow-500 hover:border-yellow-500 hover:text-black shadow-lg"
                >
                  Xem thêm
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default TheaterMovie;