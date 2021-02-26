import { customerServices } from "../Services/customers.services";
import { useEffect, useState } from "react";
import CustomerUpdateForm from "./CustomerUpdateForm";

const CustomerUpdate = (props) => {
   const [preloadedValues, setPreloadedValues] = useState(null);
   useEffect(() => {
      customerServices
         .getCustomerById(props.match.params.id)
         .then((res) => {
            console.log(res);
            setPreloadedValues({
               firstName: res.data.firstName,
               lastName: res.data.lastName,
               phone: res.data.phone,
               email: res.data.email,
               street: res.data.street,
               city: res.data.city,
               state: res.data.state,
               zipCode: res.data.zipCode,
            });
         })
         .catch((err) => console.log(err));
   }, []);
   return preloadedValues ? (
      <CustomerUpdateForm
         id={props.match.params.id}
         preloadedValues={preloadedValues}
      />
   ) : (
      <h1>Loading...</h1>
   );
};

export default CustomerUpdate;
