const productList = () => {
    return fetch("http://localhost:3000/products")
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const servicesProducts = {
    productList,
};