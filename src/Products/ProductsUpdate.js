import { productServices } from "../Services/products.services";
import { useEffect, useState } from "react";
import ProductsUpdateForm from "./ProductsUpdateForm";

const ProductsUpdate = (props) => {
   const [preloadedValues, setPreloadedValues] = useState(null);
   useEffect(() => {
      productServices
         .getProductById(props.match.params.id)
         .then((res) => {
            setPreloadedValues({
               productName: res.data.productName,
               brandId: res.data.brandId,
               categoryId: res.data.categoryId,
               modelYear: res.data.modelYear,
               listPrice: res.data.listPrice,
            });
            return preloadedValues;
         })
         .catch((err) => console.log(err));
   }, []);

   return preloadedValues ? (
      <ProductsUpdateForm
         id={props.match.params.id}
         preloadedValues={preloadedValues}
      />
   ) : (
      <h1>Loading...</h1>
   );
};

export default ProductsUpdate;
