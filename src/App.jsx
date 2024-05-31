import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/footer';
import AdminDashboard from "./components/Admin"; // Ensure this import matches your actual file structure

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin" element={<AdminDashboard />} />
      </Routes>
      {!isAdminRoute && <Footer /> }
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
