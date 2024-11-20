import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from './utils.mjs';

const category = getParams('category');

const dataSource = new ProductData();

let listElement = document.querySelector('.product-list');

const list = new ProductListing(category, dataSource, listElement);

const items = list.init();

// Top Products: Category
listElement = document.querySelector('.category');
// capitalize first letter and display the rest as it is
listElement.textContent = `: ${category[0]}`.toUpperCase().concat(category.slice(1));

// listen to click events in the sort buttons
const sortByName = document.querySelector("#sort-by-name");
const sortByPrice = document.querySelector("#sort-by-price");

let sorted = [];

sortByName.addEventListener("click", async () => {
    sortByPrice.checked = false; // avoid both being checked (why would someone be so weird?)
    const products = await items;
    if (sortByName.checked) {
        const sortedByName = products.sort(function (itemA, itemB) {
            return itemA.Name.localeCompare(itemB.Name); // string comparison
        })
        list.init(true, true, false, sortedByName);
    } else {
        // call the database over again... :/
        list.init();
    }
});

sortByPrice.addEventListener("click", async () => {
    sortByName.checked = false;
    const products = await items;
    if (sortByPrice.checked) {
        const sortedByPrice = products.sort(function (itemA, itemB) {
            return itemA.ListPrice - itemB.ListPrice; // string comparison
        })
        list.init(true, false, true, sortedByPrice);
    } else {
        // call the database over again... :/
        list.init();
    }
});



