import { getLocalStorage } from "./utils.mjs"
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

function packageItems(items) {
    const packedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return packedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
        this.quantity = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        this.list = this.list.filter((item) => !(item.product.isTrusted == true));
        this.list.forEach((product) => {
            this.itemTotal += product.product.FinalPrice * product.quantity;
            this.quantity += product.quantity;
        });

        const subtotalElement = document.querySelector(this.outputSelector + " #checkout-subtotal");
        subtotalElement.innerHTML = `Subtotal:  $${(this.itemTotal).toFixed(2)}`;
        const quantityElement = document.querySelector(this.outputSelector + " #checkout-items-quantity");
        quantityElement.innerHTML = `Quantity: ${this.quantity}`;

        // {/* <li>Subtotal: </li>
        // <li>Shipping Estimate: </li>
        // <li>Tax:</li>
        // <li>Order Total:</li> */}
        // const { totalPrice, totalQuantity } = getSummaryInCart();
        // const shippingTotal = totalQuantity > 0 ? 10 + (totalQuantity - 1) * 2 : 0;
        // const taxTotal = totalPrice * .06;
        // const orderTotal = totalPrice + taxTotal + shippingTotal;
        // const listElement = document.querySelector("#order-summary");
    }

    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * .06).toFixed(2);
        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
        const shippingElement = document.querySelector(this.outputSelector + " #checkout-shipping");

        const taxElement = document.querySelector(this.outputSelector + " #checkout-tax");
        const orderElement = document.querySelector(
            this.outputSelector + " #checkout-total"
        );
        console.log(orderElement);
        this.shipping = this.quantity > 0 ? 10 + (this.quantity - 1) * 2 : 0;
        this.tax = this.itemTotal * .06;
        this.orderTotal = (this.itemTotal + this.tax + this.shipping).toFixed(2);

        // Shipping: Use $10 for the first item plus $2 for each additional item after that.
        console.log(shippingElement);
        console.log(this.shipping);
        shippingElement.innerHTML = `Shipping Estimate $${this.shipping}`;
        console.log(shippingElement);

        taxElement.innerHTML = `Taxes $${(this.tax).toFixed(2)}`;
        orderElement.innerHTML = `<strong>Total Order</strong> $${this.orderTotal}`;

    }

    async checkout() {
        const formElement = document.getElementById("checkout-form");

        const json = formDataToJSON(formElement);
        json.tax = this.tax;
        json.orderTotal = this.orderTotal;
        json.orderDate = new Date();
        json.shipping = this.shipping;
        console.log("this.list", this.list);
        json.items = packageItems(this.list);

        console.log("json", json);
        try {
            const response = await services.checkout(json);
            console.log("response", response);
        } catch (err) {
            console.log(err);
        }
    }
}