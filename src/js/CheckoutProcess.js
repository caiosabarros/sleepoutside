export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }

    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
        let totalPrice = 0;
        let totalQuantity = 0;
        this.list.forEach((product) => {
            totalPrice += product.product.FinalPrice * product.quantity;
            totalQuantity += product.quantity;
        })

        let subtotalElement = document.createElement("li");
        subtotalElement.innerHTML = `Subtotal:  $${}`;
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

        // display the totals.
        this.displayOrderTotals();
    }

    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

    }
}