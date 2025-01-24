import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Hotel from "./pages/Hotel";

import Attractions from "./pages/Activities";
import Airport from "./pages/Airport";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotel />} />
        <Route path="/activities" element={<Attractions />} />
        <Route path="/flight" element={<Airport/>}/>
      </Routes>
    </Router>
  );
}

export default App;
