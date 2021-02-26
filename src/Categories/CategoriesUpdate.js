import { categoryServices } from "../Services/categories.services";
import { useEffect, useState } from "react";
import CategoriesUpdateForm from "./CategoriesUpdateForm";

const CategoriesUpdate = (props) => {
   const [preloadedValues, setPreloadedValues] = useState(null);
   useEffect(() => {
      categoryServices
         .getCategoryById(props.match.params.id)
         .then((res) => {
            console.log(res);
            setPreloadedValues({
               categoryName: res.data.categoryName,
            });
         })
         .catch((err) => console.log(err));
   }, []);
   return preloadedValues ? (
      <CategoriesUpdateForm
         id={props.match.params.id}
         preloadedValues={preloadedValues}
      />
   ) : (
      <h1>Loading...</h1>
   );
};

export default CategoriesUpdate;
