import "./series.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";
import img6 from "./img/6.jpg";
import img7 from "./img/7.jpg";
import img8 from "./img/8.jpg";
import img9 from "./img/9.jpg";
import img10 from "./img/10.jpg";
import img11 from "./img/11.jpg";
import img12 from "./img/12.jpg";
import img13 from "./img/13.jpg";
import img14 from "./img/14.jpg";
import img15 from "./img/15.jpg";
import img16 from "./img/16.jpg";
import img17 from "./img/17.jpg";

function Series() {

  const navigate = useNavigate();

  const [currentPage,setCurrentPage] = useState(1);
  const [hover,setHover] = useState(null);
  const moviesPerPage = 12;

  const movies = [
    { id:1, name:"Bước Chân Vào Đời", poster: img1 },
    { id:2, name:"Đồng Hồ Đếm Ngược", poster: img2 },
    { id:3, name:"Không Giới Hạn", poster: img3 },
    { id:4, name:"Dare you to Death", poster: img4 },
    { id:5, name:"Siêu Nhân Gao", poster: img5 },
    { id:6, name:"Siêu Nhân Cảnh Sát", poster: img6 },
    { id:7, name:"Engine Sentai Go-Onger.", poster: img7},
    { id:8, name:"Siêu nhân Thần Kiếm", poster: img8},
    { id:9, name:"Siêu Nhân Động cơ", poster: img9},
    { id:10, name:"Siêu Nhân Phép Thuật", poster: img10},
    { id:11, name:"Siêu Nhân Thiên Sứ", poster: img11},
    { id:12, name:"Siêu Nhân Tàu lửa", poster: img12},
    { id:13, name:"Siêu Nhân Cuồng Phong", poster: img13},
    { id:14, name:"Doraemon: Nobita và bản giao hưởng Địa Cầu", poster: img14},
    { id:15, name:"Doraemon: Nobita và cuộc đại thủy chiến ở xứ sở người cá", poster: img15},
    { id:16, name:"Doraemon: Nobita và những hiệp sĩ không gian", poster: img16},
    { id:17, name:"Doraemon : Nobita ở vương quốc chó mèo", poster: img17},
  ];

  const indexLast = currentPage * moviesPerPage;
  const indexFirst = indexLast - moviesPerPage;
  const currentMovies = movies.slice(indexFirst,indexLast);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  return (

    <div className="series-container">

      <div className="movie-grid">

        {currentMovies.map(movie => (

          <div
            className="movie-card"
            key={movie.id}
            onMouseEnter={() => setHover(movie.id)}
             onMouseLeave={() => setHover(null)}
            onClick={() => navigate(`/phim/${movie.id}`)}
          >

            <div className="poster">
              <img src={movie.poster} alt={movie.name} />
              <span className="tag">P.Đề</span>
            </div>

            <p className="movie-name">{movie.name}</p>
            {hover === movie.id && (
  <div className="preview-box">
     <img
      src={movie.poster}
      alt={movie.name}
      className="preview-img"
    />

    <h3>{movie.name}</h3>

    <div className="preview-buttons">

      <button
      className="watch"
     onClick={() => navigate(`/phim/${movie.id}`)}
       >
       ▶ Xem ngay
      </button>

      <button onClick={(e)=>e.stopPropagation()}>
      ❤ Thích
      </button>

      <button
      onClick={(e)=>{
        e.stopPropagation();
        navigate(`/phim/${movie.id}`)
      }}
      >
      ⓘ Chi tiết
      </button>

    </div>

    <div className="preview-meta">
      <span className="imdb">IMDb 7.4</span>
      <span>2025</span>
      <span>sắp chiếu</span>
    </div>

  </div>
)}
          </div>

        ))}

      </div>

      {/* PAGINATION */}

      <div className="pagination">

        <button
        onClick={()=>setCurrentPage(currentPage-1)}
        disabled={currentPage===1}
        >
        ◀
        </button>

        {Array.from({length:totalPages},(_,i)=>(
          <button
          key={i}
          className={currentPage===i+1 ? "active" : ""}
          onClick={()=>setCurrentPage(i+1)}
          >
          {i+1}
          </button>
        ))}

        <button
        onClick={()=>setCurrentPage(currentPage+1)}
        disabled={currentPage===totalPages}
        >
        ▶
        </button>

      </div>

    </div>

  );
}

export default Series;