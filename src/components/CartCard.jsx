import React from "react";
import { Link } from "react-router-dom";
import DropdownQty from "./DropdownQty";

const CartCard = ({ product, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(product.id, newQuantity);
  };

  const handleRemoveItem = () => {
    onRemoveItem(product.id);
  };

  return (
    <div className="cartCard" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="cartCardImage"
        />
        <p className="cartItemTitle">{product.title}</p>
      </Link>
      <p className="cartItemDesc">{product.description}</p>
      <p className="cartItemPrice">
        ${(product.price * product.quantity).toFixed(2)}
      </p>
      <p className="cartItemQuantity">Qty: {product.quantity}</p>
      <DropdownQty
        initialQuantity={product.quantity}
        onQuantityChange={handleQuantityChange}
      />
      <button className="removeItemButton" onClick={handleRemoveItem}>
        Remove Item
      </button>
    </div>
  );
};

export default CartCard;
