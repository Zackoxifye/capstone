import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CartCard from "../CartCard";
import { useNavigate } from "react-router-dom";

export default function Cart({ token, userId }) {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(existingCart);
  }, [token]);

  const handleQuantityChange = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: parseInt(newQuantity) }
          : item
      )
    );
    localStorage.setItem("cart", JSON.stringify([...cart]));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    console.log(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const calculateTotal = () => {
    return cart.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  return (
    <div className="cart-div">
      {token ? (
        <>
          <h1 className="cart-title">Your Cart</h1>
          {cart && cart.length > 0 ? (
            <div className="cart-information">
              {cart.map((product) => (
                <CartCard
                  key={product.id}
                  product={product}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
              <p className="cartTotal">Total: ${calculateTotal().toFixed(2)}</p>
              <button
                className="checkoutPageButton"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          ) : (
            <p className="yourCartIsEmpty">
              Your cart is empty. Add some items!
            </p>
          )}
        </>
      ) : (
        <p className="pleaseLogIn">Please log in to view your cart.</p>
      )}
    </div>
  );
}

Cart.propTypes = {
  token: PropTypes.string,
};
