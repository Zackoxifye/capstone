import React from "react";
import { useParams } from "react-router-dom";

const SingleProductCard = ({ product, token, addToCart }) => {
  const { productId } = useParams();
  console.log("token in singleProductCard: ", token);
  const handleAddToCart = () => {
    if (!token) {
      alert("Please log in to add products to your cart.");
      return;
    }
    addToCart(productId, token);
  };

  return (
    <div className="singleProductCard">
      <div className="image-container">
        <img
          src={product.image}
          alt={product.title}
          className="singleProductImage"
        />
      </div>
      <div className="product-info">
        <p className="singleProductTitle">{product.title}</p>
        <p className="singleProductRating">
          {product.rating.rate}/5 from {product.rating.count} ratings
        </p>
        <p className="singleProductPrice">${product.price}</p>
        <p className="singleProductDescription">
          About this item: {product.description}
        </p>
        <div className="buttons-container">
          <button
            className="singleProductButton"
            onClick={() => handleAddToCart(1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
