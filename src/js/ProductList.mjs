import { renderListWithTemplate } from "./utils.mjs"


// This purpose of this script will be to generate a list of product cards in HTML from an array.
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

function productCardTemplate(product) {
  let cardElement = `          <li class="product-card">
          <a href="../product_pages/?product=${product.Id}">
            <img
              src="${product.Images.PrimaryMedium}"
              alt="Image of ${product.Name}"
            />
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.Name}</h2>
            <p class="product-card__price">${product.FinalPrice}</p>
          </a>
        </li>`;
  console.log(cardElement);
  return cardElement;
}

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init(sort = false, sortByName = false, sortByPrice = false, sortedItems = []) {
    let jsonArray = []
    if (!sort) {
      // getData as is if it there is no sorting
      jsonArray = await this.dataSource.getData(this.category);
    } else {
      // have the sorted displayed
      jsonArray = sortedItems;
    }

    this.listElement.innerHTML = ""; // clear the current display to avoid sequential lists

    renderListWithTemplate(productCardTemplate, this.listElement, jsonArray, 'afterbegin', false);
    return jsonArray;
  }

  async getData() {
    return fetch(this.dataSource)
      .then(convertToJson)
      .then((data) => data);
  }

  renderList(list) {
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
  }
}