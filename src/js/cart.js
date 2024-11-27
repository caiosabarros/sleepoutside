import { loadHeaderFooter, getLocalStorage, getSummaryInCart } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartItems();

const { totalPrice, } = getSummaryInCart();

const totalPriceSelector = document.querySelector("#total-price");
totalPriceSelector.textContent = `Total Price: ${totalPrice}`;

loadHeaderFooter();

