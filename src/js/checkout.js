import { getLocalStorage } from "./utils.mjs"; // Assumes a utility for accessing localStorage.
import ExternalServices from "./externalsecvice.mjs"; // External services for POSTing orders.

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = document.querySelector(outputSelector);
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  // Initialize the process
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  // Calculate and display the subtotal for items in the cart
  calculateItemSummary() {
    this.itemTotal = this.list.reduce((total, item) => total + item.price * item.quantity, 0);
    this.outputSelector.querySelector(".item-subtotal").textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  // Calculate and display the order totals (shipping, tax, and overall total)
  calculateOrderTotal(zip) {
    this.calculateShipping();
    this.calculateTax();
    this.orderTotal = this.itemTotal + this.shipping + this.tax;
    this.displayOrderTotals();
  }

  calculateShipping() {
    const itemCount = this.list.reduce((total, item) => total + item.quantity, 0);
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
  }

  calculateTax() {
    this.tax = this.itemTotal * 0.06;
  }

  displayOrderTotals() {
    this.outputSelector.querySelector(".shipping-cost").textContent = `$${this.shipping.toFixed(2)}`;
    this.outputSelector.querySelector(".tax-amount").textContent = `$${this.tax.toFixed(2)}`;
    this.outputSelector.querySelector(".order-total").textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  // Prepare the items for submission
  packageItems() {
    return this.list.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));
  }

  // Handle checkout process
  async checkout(form) {
    const formData = new FormData(form);
    const payload = {
      orderDate: new Date().toISOString(),
      fname: formData.get("fname"),
      lname: formData.get("lname"),
      street: formData.get("street"),
      city: formData.get("city"),
      state: formData.get("state"),
      zip: formData.get("zip"),
      cardNumber: formData.get("cardNumber"),
      expiration: formData.get("expiration"),
      code: formData.get("code"),
      items: this.packageItems(),
      orderTotal: this.orderTotal.toFixed(2),
      shipping: this.shipping,
      tax: this.tax.toFixed(2),
    };

    try {
      const response = await ExternalServices.checkout(payload);
      alert("Order submitted successfully!");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Please try again.");
    }
  }
}
