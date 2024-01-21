import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="productCard">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <p>{product.title}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
