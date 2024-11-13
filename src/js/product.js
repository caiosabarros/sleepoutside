import { getLocalStorage, setLocalStorage, getParams } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const productId = getParams("product");

const rawProduct = new ProductDetails(productId, "tents");

rawProduct.init();

function addProductToCart(product) {
  getLocalStorage("so-cart") === null
    ? setLocalStorage("so-cart", [{ product }])
    : setLocalStorage("so-cart", [...getLocalStorage("so-cart"), { product }]);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
