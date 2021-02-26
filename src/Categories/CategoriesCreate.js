import { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { categoryServices } from "../Services/categories.services";
import InfoModal from "../Common/Modals/InfoModal";

const CategoriesCreate = () => {
   const { register, handleSubmit, errors } = useForm();
   const [show, setShow] = useState(false);
   const history = useHistory();

   const onSubmit = (data) => {
      categoryServices
         .createCategory({ ...data, orders: [] })
         .then((res) => {
            if (res.status === 200) {
               console.log("res" + res);
               setShow(true);
            } else {
               console.log("Error " + res.status);
            }
         })
         .catch((err) => console.log(err));
      console.log({ ...data });
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

   const handleShow = () => history.push("/categories/");

   return (
      <>
         <InfoModal
            show={show}
            handleShow={handleShow}
            message={"Category created successfuly!"}
         />

         <div className="form-container">
            <h2 className="my-4">Create category</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Label>Category Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter category name"
                  name="categoryName"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This field should contain only characters",
                     },
                  })}
               />
               {errors.categoryName && (
                  <p style={{ color: "red" }}>
                     {" "}
                     {errors.categoryName.message}{" "}
                  </p>
               )}
               <div className="buttons">
                  <div
                     className="cancel-button"
                     onClick={() => history.push("/categories/")}
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

export default CategoriesCreate;
