import axios from "axios";

export const customerServices = {
   getCustomers,
   createCustomer,
   getCustomerById,
   updateCustomer,
   deleteCustomer,
};

async function getCustomers() {
   return axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Customers")
      .then((res) => res)
      .catch((err) => err);
}

async function createCustomer(customer) {
   return axios
      .post("http://cbb.northeurope.cloudapp.azure.com:85/Customers", customer)
      .then((res) => res)
      .catch((err) => err);
}

async function updateCustomer(id, customer) {
   return axios
      .put("http://cbb.northeurope.cloudapp.azure.com:85/Customers/" + id, {
         ...customer,
         customerId: id,
      })
      .then((res) => res)
      .catch((err) => err);
}

async function getCustomerById(id) {
   return axios
      .get("http://cbb.northeurope.cloudapp.azure.com:85/Customers/" + id)
      .then((res) => res)
      .catch((err) => err);
}

async function deleteCustomer(id) {
   return axios
      .delete("http://cbb.northeurope.cloudapp.azure.com:85/Customers/" + id)
      .then((res) => res)
      .catch((err) => err);
}
