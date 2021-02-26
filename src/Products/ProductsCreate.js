import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { productServices } from "../Services/products.services";
import { brandServices } from "../Services/brands.services";
import { categoryServices } from "../Services/categories.services";
import InfoModal from "../Common/Modals/InfoModal";
import Select from "react-select";

const ProductsCreate = () => {
   const { register, handleSubmit, control, errors } = useForm();
   const history = useHistory();

   const [show, setShow] = useState(false);
   const [brands, setBrands] = useState([]);
   const [categories, setCategories] = useState([]);
   const [categoryError, setCategoryError] = useState(null);
   const [brandError, setBrandError] = useState(null);

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

      categoryServices.getCategories().then((res) => {
         if (res.status === 200) {
            setCategories(
               res.data.map((data, index) => {
                  return {
                     id: index,
                     value: data.categoryId,
                     label: data.categoryName,
                  };
               })
            );
         }
      });
   }, []);

   const onSubmit = (data) => {
      if (data.brandId && data.categoryId) {
         setBrandError(null);
         setCategoryError(null);
         productServices
            .createProduct({
               ...data,
               brandId: data.brandId.value || data.brandId,
               categoryId: data.categoryId.value || data.categoryId,
               orders: [],
            })
            .then((res) => {
               if (res.status === 201) {
                  console.log("res" + res);
                  setShow(true);
               } else {
                  console.log("Error " + res.status);
               }
            })
            .catch((err) => console.log(err));
      } else {
         console.log("errrrrroooor");
         console.log(data.brandId);
         if (!data.brandId) {
            setBrandError("This field is required");
         }
         if (!data.catregoryId) {
            setCategoryError("This field is required");
         }
      }
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
            message={"Product created successfuly!"}
         />

         <div className="form-container">
            <h2 className="my-4 ">Create product</h2>
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
                        <Select onChange={onChange} options={brands} />
                     )}
                  />
               ) : (
                  <p>Loading field...</p>
               )}
               {brandError && <p style={{ color: "red" }}> {brandError} </p>}
               <Form.Label>Category</Form.Label>
               {categories.length > 0 ? (
                  <>
                     <Controller
                        name="categoryId"
                        control={control}
                        render={({ onChange }) => (
                           <Select onChange={onChange} options={categories} />
                        )}
                     />
                  </>
               ) : (
                  <p>Loading field..</p>
               )}

               {categoryError && (
                  <p style={{ color: "red" }}> {categoryError} </p>
               )}

               <Form.Label>Year</Form.Label>
               <Form.Control
                  type="number"
                  step="1"
                  name="modelYear"
                  min="2000"
                  max="2021"
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
                  step="0.01"
                  name="listPrice"
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

export default ProductsCreate;
