import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";

import Attractions from "./pages/Activities";
import Airport from "./pages/Airport";
import { Toaster } from "sonner";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/activities" element={<Attractions />} />
        <Route path="/flight" element={<Airport />} />
      </Routes>
    </Router>
  );
}

export default App;
