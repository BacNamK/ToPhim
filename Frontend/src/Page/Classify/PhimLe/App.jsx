import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SingleMovies from "./pages/PhimLe/SingleMovies";
import MovieDetail from "./pages/PhimLe/MovieDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/" element={<Home />} />

        <Route path="/movies" element={<SingleMovies />} />

        <Route path="/movie/:id" element={<MovieDetail />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;