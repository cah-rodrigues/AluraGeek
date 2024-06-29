import { servicesProducts } from "../serviços/products-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

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
            <button class="delete-button" data-id="${id}" data-delete>
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

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;

    servicesProducts.createProduct(name, price, image)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});

productContainer.addEventListener('click', async (e) => {
    const deleteButton = e.target.closest('[data-delete]');

    if (deleteButton) {
        const cardElement = deleteButton.closest('.card');//Encontra o elemento pai com a classe 'card'
        const id = deleteButton.dataset.id;//Salva o valor da id do produto

        if(cardElement){
            try {
                await servicesProducts.removeProduct(id);
                cardElement.remove();
            } catch (err) {
                console.log(err);
                alert('Erro ao remover o produto. Por favor, tente novamente.')
            }
        }
    }
});

render();