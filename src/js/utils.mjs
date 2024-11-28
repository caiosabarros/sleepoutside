// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// animation on backpack for cart
export function animateCart() {
  const cartSvg = document.querySelector(".cart svg");
  cartSvg.classList.add("animate");

  // remove animation after half a second
  setTimeout(() => {
    cartSvg.classList.remove("animate");
  }, 500);
}


export function getParams(param) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const product = params.get(param);
  return product;
}

export function getSummaryInCart() {
  const products = getLocalStorage("so-cart");
  let totalPrice = 0;
  let totalQuantity = 0;
  products.forEach((product) => {
    totalPrice += product.product.FinalPrice * product.quantity;
    totalQuantity += product.quantity;
  })
  return { totalPrice, totalQuantity };
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(templateFn);
  // clear parentElement in case we want to avoid conflicting elements
  if (clear) {
    let element = document.querySelectorAll(`${parentElement}`);
    element.forEach((el) => element.remove());
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

async function convertToText(response) {
  return await response.text();
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export function cartQuantityAndTotal(list) {
  let totalPrice = 0;
  let totalQuantity = 0;
  list?.forEach((product) => {
    totalPrice += product.product.FinalPrice * product.quantity;
    totalQuantity += product.quantity;
  });
  return { totalQuantity, totalPrice }
}

// dynamically load the header and footer
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export function alertMessage(message, scroll = true, time = false) {
  // create element to hold our alert
  const alert = document.createElement('div');
  // add a class to style the alert
  alert.classList.add('alert');
  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function (e) {
    if (e.target.tagName == "SPAN") { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  })
  // add the alert to the top of main
  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll)
    window.scrollTo(0, 0);

  if (time) {
    setTimeout(() => {
      main.removeChild(alert);
    }, 3000);
  }
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => {
    alert.remove(alert);
  })
}