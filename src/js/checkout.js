import { loadHeaderFooter, getSummaryInCart } from "./utils.mjs";

loadHeaderFooter();

{/* <li>Subtotal: </li>
<li>Shipping Estimate: </li>
<li>Tax:</li>
<li>Order Total:</li> */}
const { totalPrice, totalQuantity } = getSummaryInCart();
const shippingTotal = totalQuantity > 0 ? 10 + (totalQuantity - 1) * 2 : 0;
const taxTotal = totalPrice * .06;
const orderTotal = totalPrice + taxTotal + shippingTotal;
const listElement = document.querySelector("#order-summary");
let subtotalElement = document.createElement("li");
subtotalElement.innerHTML = `Subtotal:  $${totalPrice}`;
let shippingElement = document.createElement("li");
// Shipping: Use $10 for the first item plus $2 for each additional item after that.
shippingElement.innerHTML = `Shipping Estimate:  $${shippingTotal}`;
let taxElement = document.createElement("li");
taxElement.innerHTML = `Tax:  $${taxTotal}`;
let orderTotalElement = document.createElement("li");
orderTotalElement.innerHTML = `Order Total:  $${orderTotal}`;

listElement.appendChild(subtotalElement);
listElement.appendChild(shippingElement);
listElement.appendChild(taxElement);
listElement.appendChild(orderTotalElement);