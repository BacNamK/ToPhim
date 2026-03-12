import { useParams } from "react-router-dom";
import "./watchMovie.css";

/* VIDEO */
import v1 from "./video/1.mp4";
import v2 from "./video/2.mp4";
import v3 from "./video/3.mp4";
import v4 from "./video/4.mp4";
import v5 from "./video/5.mp4";
import v6 from "./video/6.mp4";
import v7 from "./video/7.mp4";
import v8 from "./video/8.mp4";
import v9 from "./video/9.mp4";
import v10 from "./video/10.mp4";
import v11 from "./video/11.mp4";
import v12 from "./video/12.mp4";
import v13 from "./video/13.mp4";
import v14 from "./video/14.mp4";
import v15 from "./video/15.mp4";
import v16 from "./video/16.mp4";
import v17 from "./video/17.mp4";

/* POSTER */
import p1 from "./img/1.jpg";
import p2 from "./img/2.jpg";
import p3 from "./img/3.jpg";
import p4 from "./img/4.jpg";
import p5 from "./img/5.jpg";
import p6 from "./img/6.jpg";
import p7 from "./img/7.jpg";
import p8 from "./img/8.jpg";
import p9 from "./img/9.jpg";
import p10 from "./img/10.jpg";
import p11 from "./img/11.jpg";
import p12 from "./img/12.jpg";
import p13 from "./img/13.jpg";
import p14 from "./img/14.jpg";
import p15 from "./img/15.jpg";
import p16 from "./img/16.jpg";
import p17 from "./img/17.jpg";

function WatchMovie(){

const { id } = useParams();
const movieId = Number(id);

const movies = {

1:{ 
name:"Bước Chân Vào Đời",
video:v1,
poster:p1,
year:"2026",
desc:"Bước chân vào đời” kể về hành trình “vào đời” của 3 chị em Thương, Trang, Minh sau biến cố bố mẹ đột ngột qua đời. Dù gia đình không giàu có, nhưng chị em Thương vẫn luôn được nuôi dạy bằng tình yêu thương và sự bao bọc. Họ chưa từng chuẩn bị cho việc phải đối diện với cuộc sống khó khăn ra sao, chưa từng được dạy phải mưu sinh thế nào đã phải đương đầu với muôn ngàn sóng gió của đời sống thị thành cơm áo gạo tiền và những mối quan hệ phức tạp."
},

2:{
name:"Đồng Hồ Đếm Ngược",
video:v2,
poster:p2,
year:"2025",
desc:"phim Đồng hồ đếm ngược bám theo hành trình của Thành, một thanh niên loay hoay đủ nghề ở thành phố, để theo đuổi giấc mơ làm một diễn viên. Thế nhưng cùng lúc ước mơ sụp đổ, bạn gái quay lưng, làm mất khoản tiết kiệm cả đời của mẹ, Thành bị khủng hoảng, trong phút cực đoan, anh tuyệt vọng tìm đến cái chết. Nhưng Coddy, chú chó mà Thành chuộc từ lò mổ, đã cứu sống anh."
},

3:{
name:"Không Giới Hạn",
video:v3,
poster:p3,
year:"2024",
desc:"Bộ phim Không giới hạn khắc họa hình ảnh người lính thời bình trong công tác phòng thủ dân sự, cứu hộ cứu nạn và bảo vệ Tổ quốc trước những thách thức an ninh phi truyền thống."
},

4:{
name:"Dare You To Death",
video:v4,
poster:p4,
year:"2024",
desc:"Dare You To Death (Dám Chơi Đến Chết - Khai Kha Di Pen Hen Kha Di Tai) là bộ phim BL trinh thám, kinh dị Thái Lan năm 2025 do GMMTV sản xuất. Phim kể về cặp đôi trái ngược Đại úy Jade (Archen Aydin) và cảnh sát Kamin (Natachai Boonprasert) hợp lực điều tra cái chết bí ẩn của Puifai sau bữa tiệc"
},

5:{
name:"Siêu Nhân Gao",
video:v5,
poster:p5,
year:"2001",
desc:"Bộ phim lấy bối cảnh vũ trụ bước vào thời kỳ công nghệ tân tiến, cư dân vũ trụ có thể đến những hành tinh khác chung sống hòa bình. Nhưng điều này cũng vô tình tạo điều kiện cho những tên tội phạm vũ trụ được gọi là Alienizer thực hiện các hành vi phạm tội với phạm vi xuyên vũ trụ cùng thủ đoạn vô cùng tinh vi và nguy hiểm. Để ngăn chặn lũ tội phạm cũng như bảo vệ an ninh trên khắp thiên hà, cơ quan cảnh sát vũ trụ S.P.D (Special Police Dekaranger) được thành lập và đặt trụ sở trên mọi hành tinh trong vũ trụ. Bối cảnh chủ yếu của phim là ở phân khu Trái Đất, với các vụ án do Alienizer ở đây gây ra."
},

6:{
name:"Siêu Nhân Cảnh Sát",
video:v6,
poster:p6,
year:"2004",
desc:"Bộ phim lấy bối cảnh vũ trụ bước vào thời kỳ công nghệ tân tiến, cư dân vũ trụ có thể đến những hành tinh khác chung sống hòa bình. Nhưng điều này cũng vô tình tạo điều kiện cho những tên tội phạm vũ trụ được gọi là Alienizer thực hiện các hành vi phạm tội với phạm vi xuyên vũ trụ cùng thủ đoạn vô cùng tinh vi và nguy hiểm. Để ngăn chặn lũ tội phạm cũng như bảo vệ an ninh trên khắp thiên hà, cơ quan cảnh sát vũ trụ S.P.D (Special Police Dekaranger) được thành lập và đặt trụ sở trên mọi hành tinh trong vũ trụ. Bối cảnh chủ yếu của phim là ở phân khu Trái Đất, với các vụ án do Alienizer ở đây gây ra."
},

7:{
name:"Engine Sentai Go-Onger",
video:v7,
poster:p7,
year:"2008",
desc:"Mười ba năm trước theo Tân Tây Lịch (新西暦 Shinseireki?), những máy tinh đang kiểm soát nguồn năng lượng mới phát hiện Enetron (エネトロン Enetoron?) đã bị nhiễm virus máy tính và đã sinh ra một sinh vật năng lượng tên là Messiah, muốn kiểm soát toàn bộ loài người và tạo ra một thế giới máy móc. Dù Messiah đã bị tống vào siêu không gian, hành động của hắn đã buộc Cục Quản lý Energy lập nên Đặc Mệnh Bộ từ ba đứa trẻ sống sót sau sự cố, trở thành Go-Busters. Ngày nay, năm 2012 oNC, thuộc hạ của Messiah, bọn Vaglass, đã cố gắng đánh cắp Enetron để có thể hồi phục chủ nhân của chúng. Tuy nhiên, Go-Busters và các Buddyroid đã được triển khai để đối phó với Metaroid và Megazord của Vaglass để bảo vệ thành phố."
},

8:{
name:"Siêu Nhân Thần Kiếm",
video:v8,
poster:p8,
year:"2009",
desc:"rong suốt mười tám thế hệ, những samurai của gia tộc Shiba (志葉家, Shiba Ke) đã luôn chiến đấu ngăn chặn những mưu đồ xấu xa của thế lực Gedoushu, những linh hồn tà ác với khả năng xuất hiện ở thế giới loài người qua những khe hở trên các công trình kiến trúc. Ở thời điểm hiện tại, Shiba Takeru, vị tộc chủ trẻ tuổi của gia tộc Shiba phải triệu hồi bốn người chư hầu (家臣, kashin) để chiến đấu chống lại bè lũ Gedoushu, nay với tên lãnh đạo Chimatsuri Doukoku đã hồi sinh, dưới tư cách những Shinkenger. Tuy nhiên, khi chiến đội Shinkenger thu nhận thêm thành viên thứ sáu là Umemori Genta, những người chư hầu dần hiểu ra rằng đằng sau sự lạnh lùng, xa cách của tộc chủ Takeru là một lý do gì đó, thứ khiến anh khác biệt hoàn toàn so với những tộc chủ tiền nhiệm."
},

9:{
name:"Siêu Nhân Động Cơ",
video:v9,
poster:p9,
year:"2010",
desc:"Machine World (マシンワールド, Mashin Wārudo) là một trong mười một Braneworld (ブレーンワールド, Burēnwārudo) bên cạnh thế giới của chúng ta, gọi là Human World (ヒューマンワールド, Hyūman Wārudo), và là nơi ở của chủng tộc sinh vật mang hình hài xe cộ khổng lồ gọi là Engine, những người đã tuyên chiến với đế chế Gaiark vì mong muốn làm ô nhiễm thế giới của họ. Trên đà thua trận, ba Bộ trưởng Ô nhiễm của Gaiark phải chuyển mục tiêu xâm lược sang Human World vì ở đó dễ thực hiện hoá mong ước thiên đường ô nhiễm của chúng hơn. Sáu Engine đã kịp truy đuổi bọn chúng đến Human World, chọn ra năm con người để trở thành chiến hữu của họ, thành lập chiến đội Go-Onger. Về sau, chiến đội có thêm sự tham gia của Go-On Wings và các Engine tộc Wings của họ, cũng như những Engine Cổ đại, và họ cùng nhau chiến đấu chống lại bè lũ Gaiark cũng như những thế lực xấu xa từ những Braneworld khác"
},

10:{
name:"Siêu Nhân Phép Thuật",
video:v10,
poster:p10,
year:"2011",
desc:"Theo truyền thuyết từ xa xưa, có một thế giới siêu thực gọi là Magitopia, là ngôi nhà của rất nhiều Thiên Thần, những linh hồn khổng lồ chứa đựng những quyền năng Pháp thuật vô biên. Trái ngược với Magitopia là Infershia - đế chế nằm sâu trong lòng đất, tôn thờ cái ác và sự diệt vong. Kẻ đứng đằng sau mọi tội ác của Infershia là một sinh vật mang trong mình sức mạnh của quỷ dữ và sự xấu xa tên là N Ma. Với âm mưu xâm lược Thế giới mặt đất, N Ma tạo ra một cánh cổng khổng lồ liên thông giữa thế giới Loài người với Thế giới Infershia - Hades Gate. Mục đích của hắn chính là đưa tay chân của mình tràn lên mặt đất, sau đó thuận tay xâm chiếm cả Magitopia."
},

11:{
name:"Siêu Nhân Thiên Sứ",
video:v11,
poster:p11,
year:"2012",
desc:"Từ thuở xa xưa, một nhóm loài người sức mạnh huyền bí từ 10,000 năm trước đã tách ra hình thành một nhóm. Họ đã chuyển tới Hộ Tinh Giới để không gây rắc rối cho con người và tự gọi là Hộ tinh thiên sứ.Các Hộ tinh thiên sứ này sử dụng sức mạnh phép thuật được phong ấn của mình là Thẻ hộ tinh dùng để biến hình thành các siêu nhân để bảo vệ loài người và Trái Đất một cách thầm lặng từ đời này qua đời khác.Đến thời hiện tại, một tộc ngoài hành tinh được gọi là Chiến tinh Warstar xuống xâm chiếm Trái Đất, chúng phá hủy Tháp trời nối Trái Đất với Giới hộ tinh khiến 5 hộ tinh thiên sứ tập sự đang rèn luyện tại Trái Đất không thể quay về chiều không gian của mình."
},

12:{
name:"Siêu Nhân Tàu Lửa",
video:v12,
poster:p12,
year:"2014",
desc:"Rainbow Line (レインボーライン Reinbō Rain?) là tuyến đường sắt ma thuật mà chỉ những ai có Imagination (イマジネーション Imajinēshon?, Trí tưởng tượng) mới nhìn thấy được. Trái ngược với nó là Shadow Line (シャドーライン Shadō Rain?) những kẻ muốn tạo bóng tối từ trái tim con người để mở rộng tuyến đường sắt của chúng, đưa bóng tối cai trị thế giới. Chính vì vậy Rainbow Line đã chọn ra những người có Imagination cao nhất để trở thành TOQger chống lại Shadow Line..."
},

13:{
name:"Siêu Nhân Cuồng Phong",
video:v13,
poster:p13,
year:"2002",
desc:"Ba học viên cá biệt của trường phái nhẫn giả Tật Phong vô tình trở thành ba người sống sót duy nhất của lưu phái khi trốn buổi lễ tốt nghiệp, nơi toàn bộ những học viên còn lại bị thảm sát bởi nhóm nhẫn giả vũ trụ hắc ám Jakanja. Quán trưởng của phái Tật Phong, ông Mugensai, người đã dùng thuật biến hình thành chuột hamster để tránh kẻ thù truy lùng, cùng với con gái của ông, Oboro, đã triệu tập ba học viên cá biệt ấy để trở thành những nhẫn giả kể thừa truyền thuyết của phái Tật Phong, Hurricaneger, chiến đấu chống lại bè lũ Jakanja. Các Hurricaneger sau đó liên minh với các Gouraiger của trường phái Tấn Lôi, dù xưa nay hai học viện luôn là kình địch của nhau, và sau đó là với chiến binh bí ẩn Shurikenger, hợp nhất hai trường phái nhẫn giả để ngăn chặn Jakanja đoạt lấy thứ sức mạnh bí ẩn."
},

14:{
name:"Doraemon: Bản giao hưởng",
video:v14,
poster:p14,
year:"2024",
desc:"Lớp học chuẩn bị cho tiết mục hòa tấu sáo recoder trong buổi hòa nhạc của trường, Nobita thổi sáo tệ đến mức gây cười cho cả lớp. Chỉ vì nốt No lạc quẻ mà Jaian và Suneo còn không buông tha, thậm chí còn chọc cậu ngay cả trên đường về nhà. Về đến nhà, Nobita nhìn thấy Doraemon đã dùng cuốn Nhật kí định sẵn để ăn tháp bánh Dorayaki, nên cậu tận dụng điều đó cùng nỗi sợ chuột cuả Mèo Ú để đánh tráo báo bối đó. Có cuốn nhật kí trong tay, cậu ghi vào đó Hôm nay không có âm nhạc. Thật là vui... để tránh tiết học âm nhạc. Hôm sau, cả thế giới bỗng nhiên náo động vì không còn âm nhạc nữa. Doraemon nhận ra cuốn sổ bị đánh tráo, nên tìm đến Nobita lấy lại cuốn nhật ký định sẵn từ cặp sách. Nhận ra hậu quả từ việc loại bỏ âm nhạc, cả hai liền xé bỏ trang nhật kí mà Nobita đã chép rồi mọi thứ trở về như bình thường. Trong khi đó, tại Viện Khoa học Vũ trụ, một bào tử lạ chui ra từ mẫu đất lấy được ở tiểu hành tinh Urashima đã lợi dụng sự hỗn loạn mà trốn khỏi phòng nghiên cứu."
},

15:{
name:"Doraemon: Đại thủy chiến",
video:v15,
poster:p15,
year:"2004",
desc:"Nobita muốn bơi lặn ngay trong thành phố Tokyo. Vì vậy, Doraemon đã sử dụng Máy bơm mô phỏng nguồn nước biển nhân tạo (架空水面シミュレーター・ポンプ?) để bơm nước ngập đầy thành phố. Đêm đó Doraemon và Nobita sử dụng kính tạo cảm giác và chân vịt bơi lặn để dạo quanh thành phố toàn nước. Bỗng xuất hiện cá mập đe doạ mọi người và Doraemon buộc phải tắt máy bơm. Nhóm bạn phát hiện một cô bé người cá nằm ngất trong lùm cây tên là Sophia. Họ đưa cô về nhà và biết được thân thế công chúa Vương quốc người cá của cô. Nhóm bạn có một chuyến tham quan tại Vương quốc đó. Chẳng may Shizuka bị vua của Quái ngư tộc (Bộ tộc bí ẩn) - Buikin - bắt đi vì cô bị nhầm là Công chúa của Bộ tộc người cá (trước đó cô bé có mượn Sophia chiếc vương miện mà không hay biết rằng vương miện đó là biểu tượng của hoàng gia). Buikin muốn đổi Shizuka để lấy Nhân ngư thần kiếm. Các bạn còn lại tìm mọi cách để tạo ra thanh thần kiếm giả bằng thanh kiếm đồ chơi của Nobita với sự hỗ trợ của Doraemi để trao đổi với Buikin và cứu Shizuka trước khi hết công hiệu của Đèn thích ứng môi trường nước trong 30 phút. Tuy cứu được Shizuka, nhưng khi Buikin phát hiện ra sự thật thì thanh thần kiếm thật đã bị lấy mất. Cả nhóm phải chiến đấu với Buikin và giành chiến thắng. Sau chiến thắng, Sophia được Nữ vương Ondine (bà của Sophia) trao chức Nữ vương cho Sophia. Rồi họ quay về nhà với những kỉ niệm đẹp về Sophia và Nhân ngư tộc.."
},

16:{
name:"Doraemon: Hiệp sĩ không gian",
video:v16,
poster:p16,
year:"2015",
desc:"Một ngày nọ, Suneo, Jaian và Shizuka quyết định làm một bộ phim về anh hùng vũ trụ dựa theo bộ phim Vệ binh dải Ngân Hà kì diệu hiện đang ăn khách hiện tại. Vì bị cho đóng vai quái thú nên Nobita về nhờ Doraemon làm bộ phim riêng cho mình nhưng cậu lại hợp tác với nhóm Suneo. Với món bản bối Đạo diễn Burger, cả nhóm bạn mới có thể tự do tha hồ hóa thân vào những anh hùng vũ trụ. Trong khi đó, vì tưởng nhóm bạn là những anh hùng thật nên một người ngoài hành tinh đến cầu cứu nhóm bạn và họ đồng ý theo người đó. Trên tàu vũ trụ, người ngoài hành tinh đó chính là Aron, cảnh sát trưởng của hành tinh Pokkoru toàn chuột, đã may mắn thoát khỏi sự truy đuổi của nhân viên bảo vệ của khu giải trí Space Land (những tên hải tặc vũ trụ mạo danh) trong khi cậu theo dõi và điều tra khu giải trí này. Đến khi tới nơi, mọi người bị bọn chúng phát hiện nhưng nhóm bạn cứ nghĩ đó chỉ là cảnh trong phim. Đến khi bị tấn công hai ba lần thì nhóm bạn mới biết đây là thật. Sau vài phút thẫn thờ, nhóm bạn liều mình giải vây cho Aron và theo cậu về nơi trú ẩn bí mật của mình. Tại đây, cậu cho nhóm bạn biết kế hoạch của bọn chúng sẽ được thực hiện trong hai ngày nữa, tức ngày khai trương khu giải trí Space Land."
},

17:{
name:"Doraemon: Vương quốc chó mèo",
video:v17,
poster:p17,
year:"2004",
desc:"Truyện bắt đầu khi Nobita bắt gặp một chú chó dễ thương ở sân bóng. Cậu mang nó về nhà và đặt tên là Số Một (Ichi). Trong một đêm mưa, Nobita và Doraemon gặp một con mèo đang dầm mưa, Nobita nhận nuôi nó, đặt tên là Ướt Sũng (Zubu). Tuy nhiên rắc rối xảy ra với Nobita khi mẹ cậu nghi ngờ rằng cậu đang nuôi động vật trong nhà. Khi rắc rối đó được giải quyết bằng một cỗ máy của Doraemon thì lại có một rắc rối khác: Đó là việc các chó mèo bỏ hoang đang bị dồn lên núi vì cảnh sát đang truy nã chúng. Nobita đã đưa chúng về thời điểm 300 triệu năm trước (khi con người và khủng long chưa hề tồn tại). Để các loài vật biết dùng máy để tạo ra thức ăn, Nobita đã dùng tia tiến hoá lên các con vật. Khi chơi đùa ngày hôm ấy, Nobita đã rủ thêm cả Shizuka, Jaian, Suneo và bỏ quên hai vật là một quả cầu của Kendama (một đồ chơi trẻ em Nhật) và máy tia tiến hoá. Nobita hẹn Số Một ngày mai sẽ quay về.."
}

};

const movie = movies[movieId];

if(!movie){
return <h1 style={{color:"white"}}>Không tìm thấy phim</h1>
}

return(

<div className="watch-container">

{/* VIDEO */}
<div className="video-wrapper">

<video controls autoPlay className="video-player">
<source src={movie.video} type="video/mp4"/>
</video>

</div>

{/* ACTION BAR */}
<div className="action-bar">

<span className="vip">VIP 1</span>
<span className="vip">VIP 2</span>

<button>❤ Yêu thích</button>
<button>＋ Thêm vào</button>
<button>🎬 Rạp phim</button>
<button>📤 Chia sẻ</button>
<button>⚠ Báo lỗi</button>

</div>

{/* MOVIE INFO */}
<div className="movie-info">

<img src={movie.poster} className="poster"/>

<div className="movie-detail">

<h3>{movie.name}</h3>

<div className="tags">
<span>IMDb 8.0</span>
<span>{movie.year}</span>
<span>Phần 1</span>
<span>Tập 1</span>
</div>

<p className="desc">
{movie.desc}
</p>

</div>

</div>

{/* DANH SÁCH TẬP */}
<div className="episode-section">

<h2>Danh sách tập</h2>

<div className="episode-grid">

<button className="episode-btn active">
▶ Tập 1
</button>

</div>

</div>

</div>

)

}
export default WatchMovie;