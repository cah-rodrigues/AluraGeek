const productList = () => {
    return fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const createProduct = (name, price, image) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-type":"application/json"
        },
        body: JSON.stringify({
            name,
            image,
            price
        })
    })
    .then((res) => res.json())
.catch((err) => console.log(err));

}
const removeProduct = (id) => {
    return fetch (`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json"
        },
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
};

export const servicesProducts = {
    productList,
    createProduct,
    removeProduct
};