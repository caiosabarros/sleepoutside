import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { getParams } from './utils.mjs';

const category = getParams('category');

const dataSource = new ProductData();

let listElement = document.querySelector('.product-list');

const list = new ProductListing(category, dataSource, listElement);

list.init();

// Top Products: Category
listElement = document.querySelector('.category');
// capitalize first letter and display the rest as it is
listElement.textContent = `: ${category[0]}`.toUpperCase().concat(category.slice(1));



