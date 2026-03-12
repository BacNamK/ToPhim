import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./singleMovies.css";

const MovieDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const [activeTab, setActiveTab] = useState("episode");

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [version, setVersion] = useState("vietsub");

  /* ⭐ RATING STATE */
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (location.state?.movie) {
      setMovie(location.state.movie);
    }
  }, [location]);

  if (!movie) return null;

  const banner = movie.banner || movie.img;

  /* ===== WATCH MOVIE ===== */

  const handleWatch = (id) => {
    navigate(`/xem-phim/${id}`, { state: { movie: movie } });
  };

  /* ===== ICON FUNCTIONS ===== */

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    const savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    const exist = savedMovies.find((m) => m.title === movie.title);

    if (exist) {
      alert("Phim đã có trong danh sách!");
      return;
    }

    savedMovies.push(movie);

    localStorage.setItem("savedMovies", JSON.stringify(savedMovies));

    setSaved(true);

    alert("Đã thêm vào danh sách!");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Đã copy link phim!");
  };

  /* ===== COMMENT ===== */

  const addComment = () => {
    if (comment.trim() === "") return;

    const newComment = {
      text: comment,
      time: new Date().toLocaleTimeString(),
    };

    setComments([...comments, newComment]);

    setComment("");
  };

  const deleteComment = (index) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  console.log(movie);
  return (
    <div className="detail-page">
      {/* Banner */}
      <div className="banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="overlay"></div>
      </div>

      <div className="info-box">
        {/* LEFT */}
        <div className="left-col text-white">
          <div className="poster">
            <img src={movie.img} alt={movie.title} />
            <p className="poster-title">{movie.title}</p>
            <p className="poster-sub">{movie.sub}</p>
            <p className="poster-country">
              🌍 {movie.country || "Đang cập nhật"}
            </p>

            {/* GIỚI THIỆU */}
            <p className="poster-desc">
              {movie.desc || "Chưa có mô tả cho bộ phim này."}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right-col">
          {/* ACTIONS */}
          <div className="actions">
            <button className="watch-btn" onClick={() => handleWatch(movie.id)}>
              ▶ Xem Ngay
            </button>

            <div className="icons">
              {/* LIKE */}
              <span className="icon-btn" onClick={handleLike}>
                {liked ? "❤️" : "🤍"}
              </span>

              {/* SAVE */}
              <span className="icon-btn" onClick={handleSave}>
                {saved ? "✔" : "➕"}
              </span>

              {/* SHARE */}
              <span className="icon-btn" onClick={handleShare}>
                ↗
              </span>

              {/* COMMENT TAB */}
              <span
                className="icon-btn"
                onClick={() => setActiveTab("comment")}
              >
                💬
              </span>
            </div>

            {/* ⭐ RATING */}
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className="star"
                  onClick={() => setRating(star)}
                >
                  {rating >= star ? "⭐" : "☆"}
                </span>
              ))}

              <span className="rating-number">{rating}.0</span>
            </div>
          </div>

          {/* TABS */}
          <div className="tabs">
            <span
              className={activeTab === "episode" ? "active" : ""}
              onClick={() => setActiveTab("episode")}
            >
              Tập phim
            </span>

            <span
              className={activeTab === "trailer" ? "active" : ""}
              onClick={() => setActiveTab("trailer")}
            >
              Trailer
            </span>

            <span
              className={activeTab === "actor" ? "active" : ""}
              onClick={() => setActiveTab("actor")}
            >
              Diễn viên
            </span>

            <span
              className={activeTab === "suggest" ? "active" : ""}
              onClick={() => setActiveTab("suggest")}
            >
              Đề xuất
            </span>
          </div>

          {/* ===== EPISODE TAB ===== */}

          {activeTab === "episode" && (
            <>
              <h3 className="section-title">Các bản chiếu</h3>

              <div className="episode-select">
                <span
                  className={version === "vietsub" ? "tag active" : "tag"}
                  onClick={() => setVersion("vietsub")}
                >
                  Vietsub
                </span>

                <span
                  className={version === "full" ? "tag active" : "tag"}
                  onClick={() => setVersion("full")}
                >
                  Full
                </span>
              </div>

              <button
                className="watch-ep"
                onClick={() => handleWatch(movie.id)}
              >
                Xem bản này
              </button>
            </>
          )}

          {/* TRAILER */}

          {activeTab === "trailer" && (
            <div className="trailer">
              <iframe
                width="100%"
                height="350"
                src={movie.trailer}
                title="Trailer"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* ACTOR */}

          {activeTab === "actor" && (
            <div>
              <p>Diễn viên: Chưa cập nhật</p>
            </div>
          )}

          {/* SUGGEST */}

          {activeTab === "suggest" && (
            <div>
              <p>Nội dung đang phát triển</p>
            </div>
          )}

          {/* ===== COMMENT ===== */}

          <div className="comment-box">
            <h3>Bình luận</h3>

            <div className="comment-input">
              <input
                type="text"
                placeholder="Nhập bình luận..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addComment()}
              />

              <button onClick={addComment}>Gửi</button>
            </div>

            <div className="comment-list">
              {comments.map((c, index) => (
                <div key={index} className="comment">
                  <div className="comment-avatar">👤</div>

                  <div className="comment-content">
                    <div className="comment-text">{c.text}</div>

                    <div className="comment-time">{c.time}</div>
                  </div>

                  <button
                    className="delete-comment"
                    onClick={() => deleteComment(index)}
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
