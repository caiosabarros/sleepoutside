import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartItems();

loadHeaderFooter();

