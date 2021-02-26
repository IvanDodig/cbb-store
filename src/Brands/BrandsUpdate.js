import { brandServices } from "../Services/brands.services";
import { useEffect, useState } from "react";
import BrandsUpdateForm from "./BrandsUpdateForm";

const BrandsUpdate = (props) => {
   const [preloadedValues, setPreloadedValues] = useState(null);
   useEffect(() => {
      brandServices
         .getBrandById(props.match.params.id)
         .then((res) => {
            console.log(res);
            setPreloadedValues({
               brandName: res.data.brandName,
            });
         })
         .catch((err) => console.log(err));
   }, []);

   return preloadedValues ? (
      <BrandsUpdateForm
         id={props.match.params.id}
         preloadedValues={preloadedValues}
      />
   ) : (
      <h1>Loading...</h1>
   );
};

export default BrandsUpdate;
