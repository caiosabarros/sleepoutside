import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess";
loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();
checkout.calculateItemSummary();

document.querySelector("#zip").addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));

document.querySelector("#checkout-submit").addEventListener("click", (e) => {
    e.preventDefault();

    checkout.checkout();
});