import "./singleMovies.css";
import id1 from"../../../image/imagePL/id1.webp";
import id2 from"../../../image/imagePL/id2.webp";
import id3 from"../../../image/imagePL/id3.webp";
import id4 from"../../../image/imagePL/id4.webp";
import id5 from"../../../image/imagePL/id5.jpg";
import id6 from"../../../image/imagePL/id6.webp";
import id7 from"../../../image/imagePL/id7.webp";
import id8 from"../../../image/imagePL/id8.webp";

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
  }

];

function SingleMovies() {
  return (
    <div className="movie-container">
      

      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img src={movie.img} alt={movie.title} />

            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.sub}</p>
            </div>
        
          </div>
        ))}
      </div>

    </div>
  );
}

export default SingleMovies;