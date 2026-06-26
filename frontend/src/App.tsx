import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import Home from "./assets/pages/Home";
import Dataset from "./assets/pages/Dataset";
import Visualization from "./assets/pages/Visualization";
import About from "./assets/pages/About";
import MortalityTableViewer from "./assets/components/Dataset Details/MortalityPerProvince-Districts";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="grow pt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dataset" element={<Dataset />} />
            <Route path="/visualizations" element={<Visualization />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/mortalityperprovince-districts"
              element={<MortalityTableViewer />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
