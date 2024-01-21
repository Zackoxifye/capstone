import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CheckoutCard from "../CheckoutCard";
import { useNavigate } from "react-router-dom";

export default function Checkout({ token, userId }) {
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
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("cart");
    navigate("/success");
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
    <div className="checkoutDiv">
      {token ? (
        <>
          <div className="checkoutLeftSection">
            <h2 className="checkoutTitle">Checkout</h2>
            <div className="checkout-information">
              {cart.map((product) => (
                <CheckoutCard
                  key={product.id}
                  product={product}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </div>
          </div>
          <div className="checkoutRightSection">
            <h2 className="paymentTitle">Payment Information</h2>
            <form className="paymentForm" onSubmit={handleSubmit}>
              <label htmlFor="cardNumber">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                placeholder="Enter card number"
                required
              />

              <label htmlFor="expiryDate">Expiry Date:</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                required
              />

              <label htmlFor="cvv">CVV:</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                placeholder="Enter CVV"
                required
              />

              <button type="submit">Submit Payment</button>
            </form>

            <p className="checkoutTotal">
              Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
        </>
      ) : (
        <p className="pleaseLogIn">Please log in.</p>
      )}
    </div>
  );
}

Checkout.propTypes = {
  token: PropTypes.string,
};
