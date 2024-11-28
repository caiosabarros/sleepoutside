import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs"

function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error("Bad Response");
    }
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;;
    }

    async init() {
        // use our datasource to get the details for the current product. 
        // findProductById will return a promise! use await or.then() to process it
        let product = await this.dataSource.findProductById(this.productId);

        // once we have the product details we can render out the HTML
        this.product = product;
        this.renderProductDetails('main');

        // once the HTML is rendered we can add a listener to Add to Cart button
        // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    addProductToCart(product) {
        getLocalStorage("so-cart") === null ? setLocalStorage("so-cart", [{ product }]) : setLocalStorage("so-cart", [...getLocalStorage("so-cart"), { product }]);
        alertMessage(`${this.product.NameWithoutBrand} was added to cart!`, false, true);
    }

    async getData() {
        return fetch(this.dataSource)
            .then(convertToJson)
            .then((data) => data);
    }

    renderProductDetails() {
        let element = document.querySelector('title');
        element.textContent = 'Sleep Outside | ' + `${this.product.Name}`;
        element = document.querySelector('.product-detail h3');
        element.textContent = `${this.product.Brand.Name}`;
        element = document.querySelector('.product-detail h2');
        element.textContent = `${this.product.NameWithoutBrand}`;
        element = document.querySelector('.product-detail img');
        element.setAttribute('src', `${this.product.Images.PrimaryLarge}`);
        element.setAttribute('alt', `${this.product.Name}`);
        element = document.querySelector('p.product-card__price');
        element.textContent = `$${this.product.FinalPrice}`;
        element = document.querySelector('p.product__color');
        element.textContent = `${this.product.Colors[0].ColorName}`;
        element = document.querySelector('p.product__description');
        element.innerHTML = `${this.product.DescriptionHtmlSimple}`;
        element = document.querySelector('#addToCart');
        element.setAttribute('data-id', `${this.product.Id}`);

    }

    async findProductById(id) {
        const products = await this.getData();
        return products.find((item) => item.Id === id);
    }
}
