  import "./singleMovies.css";
 import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import id1 from"../../../image/imagePL/id1.webp";
  import id2 from"../../../image/imagePL/id2.webp";
  import id3 from"../../../image/imagePL/id3.webp";
  import id4 from"../../../image/imagePL/id4.webp";
  import id5 from"../../../image/imagePL/id5.jpg";
  import id6 from"../../../image/imagePL/id6.webp";
  import id7 from"../../../image/imagePL/id7.webp";
  import id8 from"../../../image/imagePL/id8.webp";
  import id9 from"../../../image/imagePL/id9.webp";
  import id10 from"../../../image/imagePL/id10.webp";
  import id11 from"../../../image/imagePL/id11.webp";
  import id12 from"../../../image/imagePL/id12.webp";
const movies = [
  {
    id: 1,
    title: "Trò Chơi Tìm Xác: Đêm Cuối Cùng",
    sub: "Re/Member: The Last Night",
    img: id1,
    
  },
  {
    id: 2,
    title: "Nhịp Điệu Nổi Loạn ",
    sub: "Kneecap",
    img: id2,
  },
  {
    id: 3,
    title: "Hoàng Hôn Buông Xuống",
    sub: "Aftersun",
    img: id3,
  },
  {
    id: 4,
    title: "Ông Hoàng Metal",
    sub: "Metal Lords",
    img: id4,
  },
  {
    id: 5,
    title:"Giam Cầm Quỷ Dữ",
    sub: "The Devil's Light",
    img: id5,
  },
  {
    id: 6,
    title:"Không Thể Nhẫn Nhịn",
    sub:"The Unforgiven",
    img:id6,
  },
  {
    id:7,
    title:"Trên Bãi Cát Mùa Hè",
    sub:"On Summer Sand (Natsu no Suna no Ue)",
    img:id7,

  },
  {
    id:8,
    title:"Saipan",
    sub:"Saipan",
    img:id8,
  },
{
    id: 9,
    title:"Băng Đảng Đường Phố 3 (Những Cậu Bé Vùng Ngoại Ô 3)",
    sub:"Street Flow 3 (Banlieusards 3)",
    img:id9,
  },
  {
    id: 10,
    title:"Băng Đảng Đường Phố 2 (Những Cậu Bé Vùng Ngoại Ô 2)",
    sub:"Street Flow 2 (Banlieusards 2)",
    img:id10,
  },
  {
    id: 11,
    title:"Băng Đảng Đường Phố (Những Cậu Bé Vùng Ngoại Ô)",
    sub:"Street Flow (Banlieusards)",
    img:id11,
  },
  {
    id: 12,
    title:"Người lạ ở công viên",
    sub:"Stranger in the Park",
    img:id12,
  }
];

function SingleMovies() {

  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const moviesPerPage = 12; // 1 trang 12 phim
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="movie-container">

      <div className="movie-grid">
        {currentMovies.map((movie) => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img src={movie.img} alt={movie.title} />

            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ←
        </button>

        <div className="page-box">
          Trang {page} / {totalPages}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          →
        </button>
      </div>

    </div>
  );
}

export default SingleMovies;