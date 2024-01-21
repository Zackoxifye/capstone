//_____________________________________________API_PATHS_________________________________________

const allProductsAPI = "https://fakestoreapi.com/products";
const usersAPI = "https://fakestoreapi.com/users";
const loginAPI = "https://fakestoreapi.com/auth/login";
const cartAPI = "https://fakestoreapi.com/carts";
// const cartAPI = "https://fakestoreapi.com/carts/user/2";
const allCategoriesAPI = "https://fakestoreapi.com/products/categories";
const specificCategoryAPI = "https://fakestoreapi.com/products/category";

//____________________________________________FETCH_ALL_PRODUCTS_________________________________

const fetchAllProducts = async () => {
  try {
    const response = await fetch(allProductsAPI);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("Uh oh! There was an issue fetching all Products!", error);
  }
};

//________________________________________FETCH_SINGLE_PRODUCT___________________________________________________

const fetchSingleProduct = async (productId) => {
  console.log(productId);
  try {
    const response = await fetch(`${allProductsAPI}/${productId}`);
    const responseData = await response.json();
    const product = responseData;
    return product;
  } catch (error) {
    console.log("Uh Oh! There was an issue fetching this product!", error);
  }
};

//_____________________________________FETCH_ITEMS_IN_CART_____________________________________

const fetchItemsInCart = async (userId, token) => {
  try {
    const response = await fetch(cartAPI, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch cart");
    }

    const result = await response.json();
    console.log("from fetchitemsincart", result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

//______________________________________GET_ALL_CATEGORIES__________________________________________________

const getAllCategories = async () => {
  try {
    const response = await fetch(allCategoriesAPI);
    const responseData = await response.json();
    const allProductCats = responseData;
    return allProductCats;
  } catch (error) {
    throw error;
  }
};

//_______________________________________GET_SPECIFIC_CATEGORY________________________________

const getSpecificCategory = async (category) => {
  try {
    const response = await fetch(`${specificCategoryAPI}/${category}`);
    const responseData = await response.json();
    const allProductCats = responseData;
    return allProductCats;
  } catch (error) {
    throw error;
  }
};

//______________________________________SORT_HIGH_TO_LOW_RATING______________________________

const sortProductsByRatingHighToLow = async () => {
  try {
    const products = await fetchAllProducts();
    const sortedProductsByRatingHighToLow = products.sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
    return sortedProductsByRatingHighToLow;
  } catch (error) {
    throw error;
  }
};

//______________________________________SORT_LOW_TO_HIGH_RATING_________________________________

const sortProductsByRatingLowToHigh = async () => {
  try {
    const products = await fetchAllProducts();
    const sortedProductsByRatingLowToHigh = products.sort(
      (a, b) => a.rating.rate - b.rating.rate
    );
    return sortedProductsByRatingLowToHigh;
  } catch (error) {
    throw error;
  }
};

//________________________________________SORT_HIGH_TO_LOW_PRICE________________________________

const sortProductsByPriceHighToLow = async () => {
  try {
    const products = await fetchAllProducts();
    const sortedProductsByPriceHighToLow = products.sort(
      (a, b) => b.price - a.price
    );
    return sortedProductsByPriceHighToLow;
  } catch (error) {
    throw error;
  }
};

//________________________________________SORT_LOW_TO_HIGH_PRICE________________________________

const sortProductsByPriceLowToHigh = async () => {
  try {
    const products = await fetchAllProducts();
    const sortedProductsByPriceLowToHigh = products.sort(
      (a, b) => a.price - b.price
    );
    return sortedProductsByPriceLowToHigh;
  } catch (error) {
    throw error;
  }
};

//_________________________________________EXPORT___________________________________________

export { allProductsAPI, usersAPI, loginAPI, cartAPI };
export {
  fetchAllProducts,
  fetchSingleProduct,
  fetchItemsInCart,
  getAllCategories,
  getSpecificCategory,
  sortProductsByRatingHighToLow,
  sortProductsByRatingLowToHigh,
  sortProductsByPriceHighToLow,
  sortProductsByPriceLowToHigh,
};
