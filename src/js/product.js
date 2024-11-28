import { getLocalStorage, setLocalStorage, getParams, animateCart } from "./utils.mjs";
import ProductDetails from "./ProductDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices("tents");
const productId = getParams("product");

const rawProduct = new ProductDetails(productId, dataSource);

rawProduct.init();

function addProductToCart(product) {
  getLocalStorage("so-cart") === null
    ? setLocalStorage("so-cart", [{ product, quantity: 1 }])
    : addItemToNonEmptyCart(product);

  // since this current fn always increases the quantity of products in the cart, it's the perfect
  // place to add the animation
  animateCart();
}

// increase the quantity of the item in the cart to avoid duplicates
function addItemToNonEmptyCart(product) {
  let items = getLocalStorage("so-cart");

  // check product is there
  const indexItem = items.findIndex((item) => item.product.Id == product.Id);
  // if not, add it to cart
  if (indexItem == -1) setLocalStorage("so-cart", [...items, { product, quantity: 1 }]);
  else { // if so, increase its quantity and leave rest of cart as is
    items[indexItem].quantity += 1;
    setLocalStorage("so-cart", [...items]);
  }
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
