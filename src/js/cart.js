import { loadHeaderFooter, getLocalStorage, cartQuantityAndTotal } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";


const cart = new ShoppingCart("so-cart", ".product-list");
cart.renderCartItems();

const { totalPrice } = cartQuantityAndTotal(cart.list);

const totalPriceSelector = document.querySelector("#total-price");
totalPriceSelector.textContent = `Total Price: $${(totalPrice).toFixed(2)}`;

loadHeaderFooter();

