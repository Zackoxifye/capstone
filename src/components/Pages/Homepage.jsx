import React, { useState, useEffect } from "react";
import {
  fetchAllProducts,
  sortProductsByRatingHighToLow,
  sortProductsByRatingLowToHigh,
  sortProductsByPriceHighToLow,
  sortProductsByPriceLowToHigh,
} from "../../API";
import ProductCard from "../ProductCard";
import { Link, useNavigate } from "react-router-dom";

export default function Homepage() {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  const [sortingMethod, setSortingMethod] = useState("default");

  useEffect(() => {
    async function fetchData() {
      try {
        let sortedProducts;

        switch (sortingMethod) {
          case "highestToLowestRate":
            sortedProducts = await sortProductsByRatingHighToLow();
            break;
          case "lowestToHighestRate":
            sortedProducts = await sortProductsByRatingLowToHigh();
            break;
          case "highestToLowestPrice":
            sortedProducts = await sortProductsByPriceHighToLow();
            break;
          case "lowestToHighestPrice":
            sortedProducts = await sortProductsByPriceLowToHigh();
            break;
          default:
            sortedProducts = await fetchAllProducts();
        }

        setAllProducts(sortedProducts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [sortingMethod]);

  const handleSortByRatingHighToLowRate = () => {
    setSortingMethod("highestToLowestRate");
  };

  const handleSortByRatingLowToHighRate = () => {
    setSortingMethod("lowestToHighestRate");
  };

  const handleSortByRatingHighToLowPrice = () => {
    setSortingMethod("highestToLowestPrice");
  };

  const handleSortByRatingLowToHighPrice = () => {
    setSortingMethod("lowestToHighestPrice");
  };

  const handleSortByDefault = () => {
    setSortingMethod("default");
  };

  return (
    <div className="products-div">
      <div className="sortingButtons">
        <p className="subfilterHeading">Filters:</p>
        <button className="sorting-button" onClick={handleSortByDefault}>
          Default Sorting
        </button>
        <p className="subfilterHeading">By Rating:</p>
        <button
          className="sorting-button"
          onClick={handleSortByRatingHighToLowRate}
        >
          Highest First
        </button>
        <button
          className="sorting-button"
          onClick={handleSortByRatingLowToHighRate}
        >
          Lowest First
        </button>
        <p className="subfilterHeading">By Price:</p>
        <button
          className="sorting-button"
          onClick={handleSortByRatingHighToLowPrice}
        >
          Highest First
        </button>
        <button
          className="sorting-button"
          onClick={handleSortByRatingLowToHighPrice}
        >
          Lowest First
        </button>
      </div>

      <div id="all-products-container">
        {allProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDetailsClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
