import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import SingleMovies from "./Page/PhimLe/SingleMovies";
import MovieDetail from "./Page/PhimLe/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/" element={<Home />} />

        <Route path="/movie" element={<SingleMovies />} />

        <Route path="/movie/:id" element={<MovieDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;