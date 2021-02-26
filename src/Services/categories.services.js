import axios from "axios";

export const categoryServices = {
   getCategories,
   createCategory,
   getCategoryById,
   updateCategory,
   deleteCategory,
};

const url = "http://cbb.northeurope.cloudapp.azure.com:85/Categories";

async function getCategories() {
   return axios
      .get(url)
      .then((res) => res)
      .catch((err) => err);
}

async function createCategory(categorie) {
   return axios
      .post(url, categorie)
      .then((res) => res)
      .catch((err) => err);
}

async function updateCategory(id, category) {
   return axios
      .put(url + "/" + id, {
         ...category,
         categoryId: id,
      })
      .then((res) => res)
      .catch((err) => err);
}

async function getCategoryById(id) {
   return axios
      .get(url + "/" + id)
      .then((res) => res)
      .catch((err) => err);
}

async function deleteCategory(id) {
   return axios
      .delete(url + "/" + id)
      .then((res) => res)
      .catch((err) => err);
}
