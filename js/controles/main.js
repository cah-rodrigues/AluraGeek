import { servicesProducts } from "../serviços/products-services.js";

const productContainer = document.querySelector("[data-product]");

function createElement(name, price, image, id) {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML =`
            <div class="img-container">
        <img class="image-width" src="${image}" alt="${name}" >
    </div>
    <div class="card-informations">
        <h2>${name}</h2>
        <div class="card-value">
            <p>R$ ${price}</p>
            <button class="delete-button" data-id="${id}">
                <img src="imagens/🦆 icon _trash 2_.png" alt="Excluir produto">
            </button>
        </div>
    </div>
    `

    productContainer.appendChild(card);
    return card;
}

const render = async () => {
    try {
        const listProduct = await servicesProducts.productList();

        listProduct.forEach(product => {
            productContainer.appendChild(
                createElement(
                    product.name, product.price, product.image, product.id)
            );
        });

        console.log(listProduct);
    } catch (error) {
        console.log(error);
    }
};

render();