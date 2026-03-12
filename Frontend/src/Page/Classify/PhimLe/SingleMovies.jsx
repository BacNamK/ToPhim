import "./singleMovies.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import id1 from "../../../image/imagePL/id1.webp";
import id1backgroup from "../../../image/imagePL/id1backgroup.webp";
import id2 from "../../../image/imagePL/id2.webp";
import id2backgroup from "../../../image/imagePL/id2backgroup.webp";
import id3 from "../../../image/imagePL/id3.webp";
import id3background from "../../../image/imagePL/id3background.jpg";
import id4 from "../../../image/imagePL/id4.webp";
import id4background from "../../../image/imagePL/id4background.jpg";
import id5 from "../../../image/imagePL/id5.jpg";
import id5background from "../../../image/imagePL/id5background.jpg";
import id6 from "../../../image/imagePL/id6.webp";
import id6background from "../../../image/imagePL/id6background.webp";
import id7 from "../../../image/imagePL/id7.webp";
import id7background from "../../../image/imagePL/id7background.webp";
import id8 from "../../../image/imagePL/id8.webp";
import id8background from "../../../image/imagePL/id8background.jpg";
import id9 from "../../../image/imagePL/id9.webp";
import id9background from "../../../image/imagePL/id9background.webp";
import id10 from "../../../image/imagePL/id10.webp";
import id10background from "../../../image/imagePL/id10background.webp";
import id11 from "../../../image/imagePL/id11.webp";
import id11background from "../../../image/imagePL/id11background.webp";
import id12 from "../../../image/imagePL/id12.webp";
import id12background from "../../../image/imagePL/id12background.webp";
import id13 from "../../../image/imagePL/id13.jpg";
import id13background from "../../../image/imagePL/id13background.jpg";
import id14 from "../../../image/imagePL/id14.webp";
import id14background from "../../../image/imagePL/id14background.webp";
import id15 from "../../../image/imagePL/id15.webp";
import id15backgroup from "../../../image/imagePL/id15backgroup.webp";
import id16 from "../../../image/imagePL/id16.webp";
import id16background from "../../../image/imagePL/id16background.jpg";
import id17 from "../../../image/imagePL/id17.jpg";
import id17background from "../../../image/imagePL/id17background.jpg";
import id18 from "../../../image/imagePL/id18.jpg";
import id18background from "../../../image/imagePL/id18background.jpg";
import id19 from "../../../image/imagePL/id19.webp";
import id19background from "../../../image/imagePL/id19background.jpg";
import id20 from "../../../image/imagePL/id20.jpg";
import id20background from "../../../image/imagePL/id20background.jpg";
const movies = [
  {
    id: 1,
    title: "Trò Chơi Tìm Xác: Đêm Cuối Cùng",
    sub: "Re/Member: The Last Night",
    img: id1,
    banner: id1backgroup,
    trailer: "https://short.icu/30-evRrEe",
    video: "https://short.icu/30-evRrEe",
    country: "Nhật Bản",
    desc: "Giới thiệu phim Trò Chơi Tìm Xác: Đêm Cuối Cùng Ba năm sau khi hoàn thành một trò chơi chết người, các học giả cấp cao bị mắc kẹt trong một cơn ác mộng luẩn quẩn phải sống sót qua những cuộc chạm trán tàn khốc và giải mã một lời nguyền kinh hoàng. ",
  },
  {
    id: 2,
    title: "Nhịp Điệu Nổi Loạn",
    sub: "Kneecap",
    img: id2,
    banner: id2backgroup,
    trailer: "https://short.icu/QcLQpYsvi",
    video: "https://short.icu/QcLQpYsvi",
    country: "Pháp",
    desc: "Giới thiệu phim Nhịp Điệu Nổi Loạn Ba chàng trai trẻ đầy bất mãn vô tình trở thành những anh hùng bất đắc dĩ trong phong trào bảo vệ ngôn ngữ mẹ đẻ. Đây là bản giao thoa giữa nghệ thuật, bản sắc và tuổi trẻ qua lăng kính điện ảnh.",
  },
  {
    id: 3,
    title: "Hoàng Hôn Buông Xuống",
    sub: "Aftersun",
    img: id3,
    banner: id3background,
    trailer: "https://short.icu/Dv1IKdxF7",
    video: "https://short.icu/Dv1IKdxF7",
    country: "Mỹ",
    desc: "Giới thiệu phim Hoàng Hôn Buông Xuống Nhiều năm trước, Sophie là cô bé hạnh phúc nhất trên đời khi cùng ông bố trẻ của mình ngao du trong kỳ nghỉ. Nhiều năm sau, những ký ức thực và tưởng tượng về bố giày vò cô khi cô tình cờ bắt gặp cảm xúc trong hình hài một người đàn ông khác.",
  },
  {
    id: 4,
    title: "Ông Hoàng Metal",
    sub: "Metal Lords",
    img: id4,
    banner: id4background,
    trailer: "https://short.icu/0kC0jXXJ9",
    video: "https://short.icu/0kC0jXXJ9",
    country: "Mỹ",
    desc: "Giới thiệu phim Ông Hoàng Metal Hai đứa trẻ muốn bắt đầu một ban nhạc heavy metal ở một trường trung học và chúng đều thích heavy metal. Giấc mơ của Hunter là giành chiến thắng trong Trận chiến của các ban nhạc, anh ấy biết rất rõ lịch sử và ngã ba của mình. Kevin được bạn mình mời chơi trống. Rất khó để tìm một người chơi bass vì các bạn cùng trường quan tâm đến ngôi sao nhạc pop hơn Black Sabbath. Emily đang chơi cello thì Kevin tình cờ nghe được cô ấy. Phi hành đoàn motley phải cạnh tranh với trường học, cha mẹ, kích thích tố và những cơn giận dữ của thanh thiếu niên trong khi cố gắng duy trì hòa hợp đủ lâu để Skullf * cker giành chiến thắng trong Trận chiến của các ban nhạc",
  },
  {
    id: 5,
    title: "Giam Cầm Quỷ Dữ",
    sub: "The Devil's Light",
    img: id5,
    banner: id5background,
    trailer: "https://short.icu/dPL-A5_od",
    video: "https://short.icu/dPL-A5_od",
    country: "Mỹ",
    desc: "Giới thiệu phim: Giam Cầm Quỷ Dữ Sau một tai nạn giao thông kinh hoàng cướp đi mạng sống của chồng và khiến con trai bị liệt, Mary Portman, một vị bác sĩ tâm lý sống trong một vùng hẻo lánh của New England và chăm sóc con trai. Bị cách biệt với thế giới bên ngoài trong những ngày bão tuyết, cô bắt đầu tin rằng, có một ai đó trong căn nhà đang tìm cách hãm hại họ.",
  },
  {
    id: 6,
    title: "Không Thể Nhẫn Nhịn",
    sub: "The Unforgiven",
    img: id6,
    banner: id6background,
    trailer: "https://short.icu/0kC0jXXJ9",
    video: "https://short.icu/0kC0jXXJ9",
    country: "Trung Quốc",
    desc: "Giới thiệu phim: Không Thể Nhẫn Nhịn Sau khi bị bắt giữ, một nhóm người bị giam cầm phải đối mặt với những thử thách tàn khốc để sống sót.",
  },
  {
    id: 7,
    title: "Trên Bãi Cát Mùa Hè",
    sub: "On Summer Sand",
    img: id7,
    banner: id7background,
    trailer: "https://short.icu/3wqicMo53",
    video: "https://short.icu/3wqicMo53",
    country: "Nhật Bản",
    desc: "Giới thiệu phim: Trên Bãi Cát Mùa Hè Cuộc đời của Koura Osamu (Odagiri Joe) như ngừng lại kể từ ngày ông mất đi cậu con trai nhỏ. Bị nhấn chìm trong cảm giác mất mát, ông dần xa cách và rồi ly thân với vợ mình, Koura Keiko (Matsu Takako). Xưởng đóng tàu nơi Koura làm việc cũng bị phá sản, nhưng ông vẫn không thể tìm được một công việc mới.",
  },
  {
    id: 8,
    title: "Saipan",
    sub: "Saipan",
    img: id8,
    banner: id8background,
    trailer: "https://short.icu/gemcYZTjOW",
    video: "https://short.icu/gemcYZTjOW",
    country: "Mỹ",
    desc: "Giới thiệu phim: Saipan Trước thềm World Cup 2002, đội trưởng đội tuyển Ireland, Roy Keane, đã từ bỏ vị trí trong đội hình tại trại huấn luyện ở Saipan sau một cuộc tranh cãi gay gắt với huấn luyện viên trưởng Mick McCarthy.",
  },
  {
    id: 9,
    title: "Băng Đảng Đường Phố 3",
    sub: "Street Flow 3",
    img: id9,
    banner: id9background,
    trailer: "https://short.icu/bnig1CPeb",
    video: "https://short.icu/bnig1CPeb",
    country: "Pháp",
    desc: "Giới thiệu phim: Băng Đảng Đường Phố 3 (Những Cậu Bé Vùng Ngoại Ô 3) Đau buồn và đối mặt với hậu quả từ hành vi phạm tội của mình, anh em nhà Traoré có cơ hội cuối để lựa chọn hướng đi mới trong chương cuối của bộ ba phim này.",
  },
  {
    id: 10,
    title: "Băng Đảng Đường Phố 2",
    sub: "Street Flow 2",
    img: id10,
    banner: id10background,
    trailer: "https://short.icu/Tmxuc7Yh1",
    video: "https://short.icu/Tmxuc7Yh1",
    country: "Pháp",
    desc: "Giới thiệu phim: Băng Đảng Đường Phố 2 (Những Cậu Bé Vùng Ngoại Ô 2) Khi một người bạn thân của mình bị giết, một thiếu niên quyết định trả thù, nhưng anh ta phải đối mặt với những hậu quả không lường trước được khi anh ta bị cuốn vào một thế giới tội phạm nguy hiểm.",
  },
  {
    id: 11,
    title: "Băng Đảng Đường Phố",
    sub: "Street Flow",
    img: id11,
    banner: id11background,
    trailer: "https://short.icu/bnig1CPeb",
    video: "https://short.icu/bnig1CPeb",
    country: "Pháp",
    desc: "Giới thiệu phim: Băng Đảng Đường Phố (Những Cậu Bé Vùng Ngoại Ô) Một nhóm thiếu niên sống trong một khu phố nghèo, phải đối mặt với các thử thách và xung đột trong cuộc sống hàng ngày.",
  },
  {
    id: 12,
    title: "Người lạ ở công viên",
    sub: "Stranger in the Park",
    img: id12,
    banner: id12background,
    trailer: "https://short.icu/dU4FQwrrF",
    video: "https://short.icu/dU4FQwrrF",
    country: "Pháp",
    desc: "Giới thiệu phim: Người Lạ Ở Công Viên Một người đàn ông sống một cuộc sống đơn độc và tẻ nhạt, nhưng mọi thứ thay đổi khi anh ta gặp một người lạ trong công viên. Sự kết nối bất ngờ này dẫn đến một cuộc hành trình khám phá bản thân và ý nghĩa của cuộc sống.",
  },
  {
    id: 13,
    title: "Bảo vệ Đặc Biệt",
    sub: "Code: Guardian",
    img: id13,
    banner: id13background,
    trailer: "https://short.icu/dPL-A5_od",
    video: "https://short.icu/dPL-A5_od",
    country: "Mỹ",
    desc: "Giới thiệu phim: Bảo Vệ Đặc Biệt Một cựu đặc vụ CIA phải bảo vệ một cô gái trẻ có khả năng đặc biệt khỏi một tổ chức tội phạm nguy hiểm. Khi họ chạy trốn qua các thành phố khác nhau, họ phải đối mặt với những kẻ săn người và khám phá ra sự thật về quá khứ của cô gái.",
  },
  {
    id: 14,
    title: "Nữ tu ác độc",
    sub: "Evil Nun ",
    img: id14,
    banner: id14background,
    trailer: "https://short.icu/0JG0ycAuf",
    video: "https://short.icu/0JG0ycAuf",
    country: "Mỹ",
    desc: "Giới thiệu phim: Nữ Tu Ác Độc Một nhóm thanh niên Công giáo bị mắc kẹt trong một nhà thờ bỏ hoang ở Mexico bởi hồn ma của một nữ tu đầy thù hận, phải phá bỏ lời nguyền trước khi bà ta chiếm đoạt họ thông qua những tội lỗi chết người.",
  },
  {
    id: 15,
    title: "Bí ẩn ngôi nhà ma ám",
    sub: "The House on Haunted Grounds",
    img: id15,
    banner: id15backgroup,
    trailer: "https://short.icu/avJtOd7Dy",
    video: "https://short.icu/avJtOd7Dy",
    country: "Mỹ",
    desc: "Giới thiệu phim: Ngôi Nhà Trên Mảnh Đất Ma Ám They walked into a haunted house with a history of possession and murder. The victims never came out, but the footage did.",
  },
  {
    id: 16,
    title: "Hierarchy",
    sub: "Hierarchy",
    img: id16,
    banner: id16background,
    trailer: "https://short.icu/CdUvn8nvJ",
    video: "https://short.icu/CdUvn8nvJ",
    country: "Mỹ",
    desc: "Giới thiệu phim: Hierarchy Tại một khu vực bí mật ở Texas, hai anh em nuôi bị vướng vào hoạt động tội phạm, buộc phải trốn tránh lực lượng thực thi pháp luật và băng đảng mafia Nga tham lam.",
  },
  {
    id: 17,
    title: "Hình ảnh phản chiếu trong viên kim cương đã chết",
    sub: "Reflection in a Dead Diamond",
    img: id17,
    banner: id17background,
    trailer: "https://short.icu/dPL-A5_od",
    video: "https://short.icu/dPL-A5_od",
    country: "Pháp/Ý",
    desc: "Giới thiệu phim: Bí Ẩn Viên Kim Cương Chết Reflection in a Dead Diamond kể về một cựu điệp viên già sống ẩn dật bên bờ biển, nhưng khi một người phụ nữ bí ẩn đột nhiên biến mất, ông nghi ngờ quá khứ đầy bạo lực của mình đã quay lại. Bị cuốn vào những ký ức rối loạn về thời làm điệp viên và các vụ kim cương đẫm máu, ông phải đối mặt với sự thật rằng kẻ thù cũ vẫn đang săn …",
  },
  {
    id: 18,
    title: "Cha tôi là găng tơ",
    sub: "Run Papa Run",
    img: id18,
    banner: id18background,
    trailer: "https://short.icu/Bp5dw_fsu",
    video: "https://short.icu/Bp5dw_fsu",
    country: "Hàn Quốc",
    desc: "Giới thiệu phim: Cha Tôi Là Găng Tơ Một găng tơ khét tiếng phải đối mặt với thử thách lớn nhất trong cuộc đời mình khi con gái anh ta bị bắt cóc. Trong nỗ lực giải cứu cô, anh phải hợp tác với một cảnh sát không tin tưởng vào phương pháp của mình, dẫn đến một cuộc rượt đuổi căng thẳng qua thành phố và khám phá ra những bí mật đen tối về quá khứ của anh.",
  },
  {
    id: 19,
    title: "Nụ hôn bạc tỷ",
    sub: "Money Kiss",
    img: id19,
    banner: id19background,
    trailer: "https://short.icu/RERD1kQw9",
    video: "https://short.icu/RERD1kQw9",
    country: "Việt Nam",
    desc: "Câu chuyện xoay quanh Thúy Vân (Thiên Ân) và người chị trời đánh Thúy Kiều (Thu Trang) đang phải đối mặt với món nợ lớn do người tình gây ra. Đứng trước nguy cơ mất trắng, cả hai buộc phải vạch kế hoạch chinh phục Nụ Hôn Bạc Tỷ từ hai chàng thiếu gia Quang (Lê Xuân Tiền) và Tú (Ma Ran Đô).",
  },
  {
    id: 20,
    title: "Đừng Quên Anh Yêu Em",
    sub: "Don't Forget I Love You",
    img: id20,
    banner: id20background,
    trailer: "https://short.icu/RERD1kQw9",
    video: "https://short.icu/RERD1kQw9",
    country: "Trung Quốc",
    desc: "Giới thiệu phim: Đừng Quên Anh Yêu Em Một nhà thiết kế thời trang nổi tiếng và một nghệ sĩ vẽ tranh sống trong cùng một tòa nhà nhưng chưa bao giờ gặp nhau.",
  },
];

function SingleMovies() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const moviesPerPage = 12;
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
            onClick={() =>
              navigate(`/singleMovies/${movie.id}`, { state: { movie } })
            }
          >
            <img src={movie.img} alt={movie.title} />

            <div className="movie-info">
              <h4>{movie.title}</h4>
              <p>{movie.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
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
