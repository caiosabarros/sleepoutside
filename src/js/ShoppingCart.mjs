import { getLocalStorage } from "./utils.mjs";
import { cartQuantityAndTotal } from "./utils.mjs";

function cartItemTemplate(cartItem) {
  return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${cartItem.product.Images?.PrimaryMedium || cartItem.product.Image}"
      alt="${cartItem.product.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${cartItem.product.Name}</h2>
  </a>
  <p class="cart-card__color">${cartItem.product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">quantity: ${cartItem.quantity}</p>
  <p class="cart-card__price">$${cartItem.product.FinalPrice}</p>
</li>`;
}

export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.list = [];
  }

  renderCartItems() {
    this.list = getLocalStorage(this.key);
    this.list = this.list.filter((item) => !(item.product.isTrusted == true));
    const builtItems = this.list.map((item) => cartItemTemplate(item));
    document.querySelector(this.parentSelector).innerHTML = builtItems.join("");
  }

}