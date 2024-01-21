import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Pages/Homepage";
import ProductDetailsPage from "./components/Pages/ProductDetails";
import Register from "./components/Pages/Register";
import SignIn from "./components/Pages/SignIn";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import Success from "./components/Pages/Success";
import Navbar from "./components/Navbar";
import CatNavbar from "./components/CatNavbar";
import CategoryPage from "./components/Pages/CategoryPage";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Navbar token={token} setToken={setToken} />
        <CatNavbar token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/products/:productId"
            element={<ProductDetailsPage token={token} />}
          />
          <Route path="/Register" element={<Register setToken={setToken} />} />
          <Route path="/SignIn" element={<SignIn setToken={setToken} />} />
          <Route path="/Cart" element={<Cart token={token} />} />
          <Route path="/checkout" element={<Checkout token={token} />} />
          <Route path="/success" element={<Success token={token} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
