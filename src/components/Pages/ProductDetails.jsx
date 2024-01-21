import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { cartAPI, fetchSingleProduct } from "../../API";
import SingleProductCard from "../SingleProductCard";

const ProductDetailsPage = ({ token }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function selectedProduct() {
      try {
        const data = await fetchSingleProduct(productId);
        const product = data.product || data;
        setProduct(product);
      } catch (err) {
        console.log(err);
      }
    }
    selectedProduct();
  }, [productId]);

  const addToCart = async (cartItems) => {
    try {
      const existingItem = cartItems.find((item) => item.id == productId);
      console.log(existingItem);
      const response = await fetch(cartAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems }),
      });

      if (existingItem) {
        existingItem.quantity += 1;
        const remainingProducts = cartItems.filter(
          (item) => item.id != productId
        );
        localStorage.setItem(
          "cart",
          JSON.stringify([...remainingProducts, existingItem])
        );
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...cartItems, { ...product, quantity: 1 }])
        );
      }
      if (response.ok) {
        console.log("Item added to cart successfully!");
        alert("Successfully added to cart!");
      } else {
        console.error("Failed to add item to cart:", response.statusText);
        alert("Failed to add item to cart.");
      }
    } catch (error) {
      console.error("Error during addToCart:", error.message);
      console.error("Error while adding to cart.");
    }
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    addToCart(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <div id="singleProductDetails">
      {product && (
        <SingleProductCard
          product={product}
          token={token}
          addToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;
