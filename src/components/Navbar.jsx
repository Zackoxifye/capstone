import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchItemsInCart } from "../API";

const Navbar = ({ token, setToken, allProducts }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  //__________________________________________CART_ITEM_COUNT________________________________

  //   useEffect(() => {
  // //     const fetchCartItems = async () => {
  // //       try {
  // //         const cartItems = await fetchItemsInCart();
  // //         setCartItemCount(cartItems.length);
  // //       } catch (error) {
  // //         console.error("Error fetching cart items:", error);
  // //       }
  // //     };

  // //     fetchCartItems();
  // //   }, []);

  //_____________________________________________________________________________________________

  const handleSearch = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseQuery) ||
        product.description.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(filtered);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch();
  };

  return (
    <div id="navbar">
      <Link to="/">
        <img
          src="/src/images/SadAmazonWhite.png"
          alt="Home"
          className="home-button"
        />
      </Link>
      <input
        className="searchBar"
        type="text"
        placeholder="Search NotAmazon..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      {!token && <Link to="/SignIn">Sign In</Link>}
      {token && (
        <Link
          to="/"
          onClick={() => {
            localStorage.setItem("token", "");
            setToken("");
            console.log("You've been successfully signed out!");
          }}
        >
          Sign Out
        </Link>
      )}
      <Link to="/Cart">
        <img
          src="/src/images/NotAmazonCart.png"
          alt="cart"
          className="cart-icon"
        />
        {cartItemCount > 0 && (
          <span className="cart-item-count">{cartItemCount}</span>
        )}
      </Link>
    </div>
  );
};

export default Navbar;
