import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import InfoModal from "../Common/Modals/InfoModal";
import { productServices } from "../Services/products.services";
import { brandServices } from "../Services/brands.services";
import { categoryServices } from "../Services/categories.services";
import Select from "react-select";

const ProductsUpdateForm = ({ preloadedValues, id }) => {
   const { register, handleSubmit, control, errors } = useForm({
      defaultValues: preloadedValues,
   });

   const history = useHistory();

   const [show, setShow] = useState(false);
   const [brands, setBrands] = useState([]);
   const [brandId, setBrandId] = useState(preloadedValues.brandId);
   const [categories, setCategories] = useState([]);
   const [categoryId, setCategoryId] = useState(preloadedValues.categoryId);

   useEffect(() => {
      brandServices
         .getBrands()
         .then((res) => {
            if (res.status === 200) {
               setBrands(
                  res.data.map((data) => {
                     return {
                        value: data.brandId,
                        label: data.brandName,
                     };
                  })
               );
            }
         })
         .catch((err) => err);
      console.log(brands[1]);

      categoryServices.getCategories().then((res) => {
         if (res.status === 200) {
            setCategories(
               res.data.map((data) => {
                  return {
                     value: data.categoryId,
                     label: data.categoryName,
                  };
               })
            );
         }
      });
   }, []);

   const onSubmit = (data) => {
      const newData = {
         ...data,
         brandId: data.brandId.value || data.brandId,
         categoryId: data.categoryId.value || data.categoryId,
      };
      productServices
         .updateProduct(id, newData)
         .then((res) => {
            if (res.status === 200) {
               console.log("res" + res);
               setShow(true);
            } else {
               console.log("Error " + res.status);
            }
         })
         .catch((err) => console.log(err));
   };

   const defaultValidation = {
      required: {
         value: true,
         message: "This field is required!",
      },
      minLength: {
         value: 3,
         message: "Min length is 3",
      },
      maxLength: {
         value: 20,
         message: "Max length is 20",
      },
   };

   const handleShow = () => history.push("/products/");

   return (
      <>
         <InfoModal
            show={show}
            handleShow={handleShow}
            message="Product updated successfuly"
         />
         <div className="form-container">
            <h2 className="my-4 ">Update product</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Label>Product Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter product name"
                  name="productName"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This field should contain only characters",
                     },
                  })}
               />
               {errors.productName && (
                  <p style={{ color: "red" }}> {errors.productName.message} </p>
               )}

               <Form.Label>Brand</Form.Label>

               {brands.length > 0 ? (
                  <Controller
                     name="brandId"
                     control={control}
                     render={({ onChange }) => (
                        <Select
                           options={brands}
                           onChange={onChange}
                           defaultValue={brands.find(
                              (obj) => obj.value === brandId
                           )}
                        />
                     )}
                  />
               ) : (
                  <p>Loading field...</p>
               )}

               <Form.Label>Category</Form.Label>
               {categories.length > 0 ? (
                  <Controller
                     name="categoryId"
                     control={control}
                     render={({ onChange }) => (
                        <Select
                           options={categories}
                           onChange={onChange}
                           defaultValue={categories.find(
                              (obj) => obj.value === categoryId
                           )}
                        />
                     )}
                  />
               ) : (
                  <p>Loading field..</p>
               )}

               <Form.Label>Year</Form.Label>

               <Form.Control
                  type="number"
                  step="1"
                  min="2000"
                  max="2021"
                  name="modelYear"
                  ref={register({
                     required: {
                        value: true,
                        message: "This field is required!",
                     },
                  })}
               />
               {errors.modelYear && (
                  <p style={{ color: "red" }}> {errors.modelYear.message} </p>
               )}

               <Form.Label>Price</Form.Label>

               <Form.Control
                  type="number"
                  name="listPrice"
                  min="1"
                  step="0.01"
                  ref={register({
                     required: {
                        value: true,
                        message: "This field is required!",
                     },
                  })}
               />
               {errors.listPrice && (
                  <p style={{ color: "red" }}> {errors.listPrice.message} </p>
               )}

               <div className="buttons">
                  <div
                     className="cancel-button"
                     onClick={() => history.push("/")}
                  >
                     Cancel
                  </div>
                  <Form.Control className="my-4 submit" type="submit" />
               </div>
            </Form>
         </div>
      </>
   );
};

export default ProductsUpdateForm;
