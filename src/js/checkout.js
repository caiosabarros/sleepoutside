import { loadHeaderFooter, alertMessage } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess";
loadHeaderFooter();

const checkout = new CheckoutProcess("so-cart", ".checkout-summary");
checkout.init();
checkout.calculateItemSummary();

document.querySelector("#zip").addEventListener("blur", checkout.calculateOrdertotal.bind(checkout));

document.querySelector('#checkout-submit').addEventListener('click', (e) => {
    e.preventDefault();
    const myForm = document.forms[0];
    const chk_status = myForm.checkValidity();
    myForm.reportValidity();
    if (chk_status) {
        try {
            checkout.checkout();

        } catch (error) {
            console.log(error);
            console.log(chk_status, "1");
            console.log(myForm, "2");
        }
    }
});


