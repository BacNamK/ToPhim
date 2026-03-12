import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Series from "./series";
import MovieDetail from "./MovieDetail";
import Footer from "./Footer";
import WatchMovie from "./pages/WatchMovie";

function App() {
  return (
    <Router>

     <Routes>
  <Route path="/" element={<Series />} />
  <Route path="/movie/:id" element={<MovieDetail />} />
  <Route path="/watch/:id" element={<WatchMovie />} />
</Routes>
      <Footer />

    </Router>
  );
}

export default App;