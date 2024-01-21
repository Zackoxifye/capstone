import React from "react";
import { Link } from "react-router-dom";
import DropdownQty from "./DropdownQty";

const CheckoutCard = ({ product, onQuantityChange, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    onQuantityChange(product.id, newQuantity);
  };

  const handleRemoveItem = () => {
    onRemoveItem(product.id);
  };

  return (
    <div className="checkoutCard" key={product.id}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="checkoutCardImage"
        />
        <p className="checkoutItemTitle">{product.title}</p>
      </Link>
      <p className="checkoutItemPrice">${product.price * product.quantity}</p>
      <p className="checkoutItemQuantity">Qty: {product.quantity}</p>
      <DropdownQty
        initialQuantity={product.quantity}
        onQuantityChange={handleQuantityChange}
      />
      <button className="removeItemButtonCheckout" onClick={handleRemoveItem}>
        Remove Item
      </button>
    </div>
  );
};

export default CheckoutCard;
