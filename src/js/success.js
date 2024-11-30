import { loadHeaderFooter, getLocalStorage, setLocalStorage } from "./utils.mjs";

// build basic
loadHeaderFooter();
// clear cart
setLocalStorage("so-cart", null);

