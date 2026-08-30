import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./components/pages/home.jsx";
import Products from "./components/pages/products.jsx";
import Cart from "./components/pages/cart.jsx";
import About from "./components/pages/about.jsx";
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import SellerDashboard from "./components/pages/SellerDashboard.jsx";
import ForgotPassword from "./components/pages/ForgotPassword.jsx";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/About" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>



      <Footer />
    </>
  );
}

export default App;
