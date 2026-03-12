import React, { useState, useEffect, useRef } from 'react';
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

const TvShowDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State cho các nút tương tác
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // LOGIC BÌNH LUẬN (MỚI)
  const commentSectionRef = useRef(null);
  const [commentInput, setCommentInput] = useState(''); // Bộ nhớ lưu chữ đang gõ
  const [commentList, setCommentList] = useState([]); // Danh sách bình luận (ban đầu rỗng)

  const handleScrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Hàm xử lý khi bấm nút Đăng Bình Luận
  const handlePostComment = () => {
    if (!commentInput.trim()) return; // Nếu gõ toàn dấu cách hoặc để trống thì không cho đăng

    const newComment = {
      id: Date.now(), // Tạo ID ngẫu nhiên bằng thời gian hiện tại
      author: "Bạn", // Tên người bình luận (Tạm thời để là Bạn)
      text: commentInput, // Nội dung vừa gõ
      time: "Vừa xong"
    };

    // Nhét bình luận mới lên đầu danh sách, giữ lại các bình luận cũ
    setCommentList([newComment, ...commentList]); 
    setCommentInput(''); // Xóa trắng ô nhập sau khi đăng xong
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const tvShowData = {
    "1": { name: "Running Man Vietnam", desc: "Running Man Việt Nam hay Running Man Vietnam (tên tiếng Việt hiện tại: Chạy ngay đi) là phiên bản Việt hóa của chương trình truyền hình thực tế nổi tiếng của Hàn Quốc Running Man. Đây là phiên bản thứ ba trên thế giới của loạt chương trình truyền hình Running Man, sau hai phiên bản Hàn Quốc và Trung Quốc. Chương trình được thực hiện dưới sự hợp tác của Đài Truyền hình Thành phố Hồ Chí Minh và đài SBS của Hàn Quốc, và được phát sóng trên kênh HTV7 từ ngày 6 tháng 4 năm 2019.", rating: "9.5", image: imgRM, year: "2021", genre: "Thực Tế, Vận Động", time: "90 phút/tập", network: "HTV7", totalEps: 15 },
    "2": { name: "Rap Việt Mùa 3", desc: "Mùa thứ ba của chương trình Rap Việt được phát sóng trên các kênh HTV2, VTVCab 1 và ứng dụng VieON từ ngày 27 tháng 5 năm 2023 đến ngày 9 tháng 9 năm 2023. Trấn Thành là người dẫn chương trình của mùa này.", rating: "9.8", image: imgRV, year: "2023", genre: "Âm Nhạc, Show Thực Tế", time: "120 phút/tập", network: "VieON", totalEps: 16 },
    "3": { name: "Sao Nhập Ngũ", desc: "Sao nhập ngũ là chương trình truyền hình thực tế về quân đội đầu tiên tại Việt Nam với sự tham gia của các nhân vật trải nghiệm là những người nổi tiếng trong nhiều lĩnh vực.[1] Chương trình được chia làm nhiều mùa, mỗi mùa có sự tham gia của các nhân vật cùng trải nghiệm những thử thách thực sự trong môi trường huấn luyện quân đội. Tính đến năm 2025, đây là chương trình truyền hình thực tế duy nhất tại Việt Nam mà công dân được tham gia trải nghiệm trong lực lượng an ninh nói chung tại Việt Nam.", rating: "9.2", image: imgSNN, year: "2024", genre: "Quân Đội, Hài Hước", time: "60 phút/tập", network: "QPVN", totalEps: 12 },
    "4": { name: "2 Ngày 1 Đêm", desc: "2 ngày 1 đêm (viết tắt: 2N1Đ) là chương trình truyền hình trải nghiệm thực tế do Đài Truyền hình Thành phố Hồ Chí Minh và công ty Đông Tây Promotion phối hợp thực hiện, được phát sóng trên kênh HTV7 từ ngày 19 tháng 6 năm 2022. Đây là phiên bản Việt Nam của chương trình cùng tên được sản xuất bởi Đài truyền hình KBS, Hàn Quốc và là phiên bản quốc tế thứ hai trên thế giới của chương trình này sau phiên bản Trung Quốc. Các thành viên hiện tại là Trường Giang, Kiều Minh Tuấn, Ngô Kiến Huy, Lê Dương Bảo Lâm, Cris Phan và HIEUTHUHAI.", rating: "9.7", image: img2N1D, year: "2022", genre: "Du Lịch, Khám Phá", time: "100 phút/tập", network: "HTV7", totalEps: 20 },
    "5": { name: "The Masked Singer", desc: "The Masked Singer Vietnam, hay còn gọi là Ca Sĩ Mặt Nạ, là một chương trình truyền hình thực tế âm nhạc nổi tiếng tại Việt Nam, nơi các nghệ sĩ giấu mặt thi đấu để tìm ra người chiến thắng.", rating: "9.6", image: imgTMS, year: "2023", genre: "Âm Nhạc, Bí Ẩn", time: "110 phút/tập", network: "Vie Channel", totalEps: 16 },
    "6": { name: "Vua Tiếng Việt", desc: "Vua Tiếng Việt là một chương trình truyền hình thực tế giáo dục, nơi các thí sinh sẽ phải vượt qua những câu hỏi về kiến thức tiếng Việt để giành chiến thắng.", rating: "9.4", image: imgVTT, year: "2023", genre: "Giáo Dục, Thi Đấu", time: "90 phút/tập", network: "VTV", totalEps: 12 },
    "7": { name: "Nhanh Như Chớp", desc: "Nhanh như chớp (tiếng Anh: Lightning Quiz Vietnam[a]) là một trò chơi truyền hình do Đài Truyền hình Thành phố Hồ Chí Minh và công ty Đông Tây Promotion phối hợp sản xuất, dựa trên chương trình Pritsana Fah Laep (tiếng Thái: ปริศนาฟ้าแลบ, tiếng Anh: Lightning Quiz) của Thái Lan. Các thí sinh sẽ phải vượt qua những câu hỏi đố mẹo, kiến thức, đố chữ để giành chiến thắng. Chương trình bắt đầu phát sóng từ ngày 7 tháng 4 năm 2018 trên HTV7. Trường Giang và Hari Won là hai MC chính của chương trình.", rating: "8.3", image: imgNNC, year: "2024", genre: "Trò Chơi, Hài Hước", time: "60 phút/tập", network: "HTV7", totalEps: 20 },
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
                    <Link to={`/watch-tvshow/${id}?tap=1`} className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-bold py-3 md:py-4 px-10 rounded-full flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(249,115,22,0.5)]">
                      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      XEM NGAY
                    </Link>
                  ) : (
                    <button disabled className="bg-gray-700 text-gray-400 font-bold py-3 md:py-4 px-10 rounded-full flex items-center gap-2 cursor-not-allowed shadow-inner border border-gray-600">
                      <span className="text-xl">⏳</span> SẮP CHIẾU
                    </button>
                  )}
                  
                  {/* CỤM NÚT CHỨC NĂNG */}
                  <div className="flex items-center gap-2 md:gap-3 ml-2">
                    
                    <button 
                      onClick={handleScrollToComments}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-700 bg-[#111] text-gray-400 hover:bg-[#222] hover:border-orange-500 hover:text-white">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-orange-500 transition-colors">
                        Bình Luận
                      </span>
                    </button>

                    <button 
                      onClick={() => setIsLiked(!isLiked)}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-700 ${isLiked ? 'bg-pink-500/20 text-pink-500 border-pink-500/50' : 'bg-[#111] text-gray-400 hover:bg-[#222] hover:border-orange-500 hover:text-white'}`}>
                        <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isLiked ? 'text-pink-500' : 'text-gray-400 group-hover:text-orange-500 transition-colors'}`}>
                        {isLiked ? 'Đã Thích' : 'Yêu Thích'}
                      </span>
                    </button>

                    <button 
                      onClick={() => setIsSaved(!isSaved)}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-700 ${isSaved ? 'bg-green-500/20 text-green-500 border-green-500/50' : 'bg-[#111] text-gray-400 hover:bg-[#222] hover:border-orange-500 hover:text-white'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {isSaved 
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /> 
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          }
                        </svg>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isSaved ? 'text-green-500' : 'text-gray-400 group-hover:text-orange-500 transition-colors'}`}>
                        {isSaved ? 'Đã Lưu' : 'Lưu Lại'}
                      </span>
                    </button>

                    <button 
                      onClick={handleShare}
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-gray-700 ${isCopied ? 'bg-blue-500/20 text-blue-500 border-blue-500/50' : 'bg-[#111] text-gray-400 hover:bg-[#222] hover:border-orange-500 hover:text-white'}`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {isCopied
                            ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          }
                        </svg>
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${isCopied ? 'text-blue-500' : 'text-gray-400 group-hover:text-orange-500 transition-colors'}`}>
                        {isCopied ? 'Đã Copy' : 'Chia Sẻ'}
                      </span>
                    </button>
                  </div>

                </div>

                <div className="flex items-center gap-3 bg-[#111]/80 px-6 py-3 rounded-2xl border border-gray-700 shadow-inner mt-4 md:mt-0">
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
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-orange-500 pl-3">Nội Dung Chương Trình</h2>
            <p className="text-gray-400 leading-relaxed text-lg text-justify mb-10">
              {movie.desc}
            </p>

            <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-3">Chọn Tập Phát Sóng</h2>
            {movie.totalEps > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                {episodesList.map((ep) => (
                  <Link 
                    to={`/watch-tvshow/${id}?tap=${ep}`} 
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
            
            {/* KHU VỰC BÌNH LUẬN */}
            <div ref={commentSectionRef} className="mt-16 pt-10 border-t border-gray-800">
              <h2 className="text-2xl font-bold mb-8 border-l-4 border-orange-500 pl-3 flex items-center gap-2">
                Bình Luận <span className="text-sm font-normal text-gray-500 bg-gray-800 px-3 py-1 rounded-full">{commentList.length} bình luận</span>
              </h2>
              
              <div className="flex gap-4 mb-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  U
                </div>
                <div className="flex-1">
                  <textarea 
                    value={commentInput} // TRÓI BUỘC Ô NHẬP VỚI STATE
                    onChange={(e) => setCommentInput(e.target.value)} // CẬP NHẬT STATE KHI GÕ
                    placeholder="Thêm bình luận của bạn về chương trình này..." 
                    className="w-full bg-[#212431] border border-gray-700 rounded-xl p-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 resize-none h-28 transition-all placeholder-gray-600"
                  ></textarea>
                  <div className="flex justify-end mt-3">
                    <button 
                      onClick={handlePostComment} // GẮN HÀM XỬ LÝ KHI BẤM NÚT
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-full transition-all shadow-[0_4px_14px_0_rgba(249,115,22,0.39)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.23)] hover:-translate-y-0.5"
                    >
                      Đăng Bình Luận
                    </button>
                  </div>
                </div>
              </div>

              {/* HIỂN THỊ DANH SÁCH BÌNH LUẬN */}
              <div className="space-y-6">
                {commentList.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 italic bg-[#212431]/30 rounded-2xl border border-gray-800 border-dashed">
                    Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                  </p>
                ) : (
                  commentList.map((cmt) => (
                    <div key={cmt.id} className="flex gap-4 animate-fade-in-down">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold">
                        B
                      </div>
                      <div className="flex-1 bg-[#212431]/50 p-4 rounded-2xl rounded-tl-none border border-gray-800/50">
                        <div className="flex items-baseline gap-3 mb-1">
                          <h4 className="font-bold text-gray-200">{cmt.author}</h4>
                          <span className="text-xs text-gray-500">{cmt.time}</span>
                        </div>
                        <p className="text-gray-300 whitespace-pre-wrap">{cmt.text}</p>
                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 font-medium">
                          <button className="hover:text-orange-500 transition-colors flex items-center gap-1"><span className="text-base">👍</span> Thích</button>
                          <button className="hover:text-orange-500 transition-colors flex items-center gap-1"><span className="text-base">👎</span></button>
                          <button className="hover:text-gray-300 transition-colors ml-2">Phản hồi</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
            </div>
          </div>

          <div className="w-full lg:w-80 space-y-6">
            <div className="bg-[#212431] p-6 rounded-2xl border border-gray-800 sticky top-24">
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

export default TvShowDetail;