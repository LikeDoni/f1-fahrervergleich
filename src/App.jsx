import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import ComparePage from "./pages/ComparePage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import DriverFormPage from "./pages/DriverFormPage.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vergleich" element={<ComparePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/neu" element={<DriverFormPage />} />
          <Route path="/admin/bearbeiten/:id" element={<DriverFormPage />} />
        </Routes>
      </main>
    </div>
  );
}
