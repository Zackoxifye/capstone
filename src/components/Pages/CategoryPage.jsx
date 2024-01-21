import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSpecificCategory } from "../../API";
import ProductCard from "../ProductCard";

export default function CategoryPage() {
  const { category } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getSpecificCategory(category);
        console.log(products);
        setCategoryProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [category]);

  return (
    <div>
      <h2>Browsing {category}</h2>
      <div id="all-products-container">
        {categoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
