import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home_page from "./Pages/Home_page";
import CoinPage from "./Pages/CoinPage";
import AlertMessage from "./Components/AlertMessage";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          backgroundColor: "#384154ff",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <Header />

        {/* 🔥 Add this line */}
        <AlertMessage />

        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/coin/:id" element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
