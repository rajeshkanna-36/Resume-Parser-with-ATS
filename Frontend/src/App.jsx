import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import HeroSection from "./Components/HeroSection";
import Uploadpage from "./Pages/Uploadpage";

function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/upload" element={<Uploadpage/>} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;