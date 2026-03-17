import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import Pessoas from "./pages/Pessoas";
import Categorias from "./pages/Categorias";
import Transacoes from "./pages/Transacoes";
import Totais from "./pages/Totais";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="content-area">
          <div className="content-panel">
            <Routes>
              <Route path="/" element={<Navigate to="/pessoas" />} />
              <Route path="/pessoas" element={<Pessoas />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/transacoes" element={<Transacoes />} />
              <Route path="/totais" element={<Totais />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
