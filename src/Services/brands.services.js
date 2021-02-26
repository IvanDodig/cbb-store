import axios from "axios";

export const brandServices = {
   getBrands,
   createBrand,
   getBrandById,
   updateBrand,
   deleteBrand,
};

const url = "http://cbb.northeurope.cloudapp.azure.com:85/Brands";

async function getBrands() {
   return axios
      .get(url)
      .then((res) => res)
      .catch((err) => err);
}

async function createBrand(brand) {
   return axios
      .post(url, brand)
      .then((res) => res)
      .catch((err) => err);
}

async function updateBrand(id, brand) {
   return axios
      .put(url + "/" + id, {
         ...brand,
         brandId: id,
      })
      .then((res) => res)
      .catch((err) => err);
}

async function getBrandById(id) {
   return axios
      .get(url + "/" + id)
      .then((res) => res)
      .catch((err) => err);
}

async function deleteBrand(id) {
   return axios
      .delete(url + "/" + id)
      .then((res) => res)
      .catch((err) => err);
}
