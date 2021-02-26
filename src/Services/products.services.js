import axios from "axios";

export const productServices = {
   getProducts,
   createProduct,
   getProductById,
   updateProduct,
   deleteProduct,
};

const url = "http://cbb.northeurope.cloudapp.azure.com:85/Products";

async function getProducts() {
   return axios
      .get(url)
      .then((res) => res)
      .catch((err) => err);
}

async function createProduct(product) {
   return axios
      .post(url, product)
      .then((res) => res)
      .catch((err) => err);
}

async function updateProduct(id, product) {
   return axios
      .put(url + "/" + id, {
         ...product,
         productId: id,
      })
      .then((res) => res)
      .catch((err) => err);
}

async function getProductById(id) {
   return axios
      .get(url + "/" + id)
      .then((res) => res)
      .catch((err) => err);
}

async function deleteProduct(id) {
   return axios
      .delete(url + "/" + id)
      .then((res) => res)
      .catch((err) => err);
}
