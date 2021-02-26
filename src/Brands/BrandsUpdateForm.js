import { Form } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { brandServices } from "../Services/brands.services";
import InfoModal from "../Common/Modals/InfoModal";

const BrandsUpdateForm = ({ preloadedValues, id }) => {
   const [show, setShow] = useState(false);

   const { register, handleSubmit, errors } = useForm({
      defaultValues: preloadedValues,
   });

   const history = useHistory();

   const onSubmit = (data) => {
      brandServices
         .updateBrand(id, { ...data, products: [] })
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

   const handleShow = () => history.push("/brands/");

   return (
      <>
         <InfoModal
            show={show}
            handleShow={handleShow}
            message={"Brand updated successfuly"}
         />
         <div className="form-container">
            <h2 className="my-4">Update brand</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Label>Brand Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="brandName"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This field should contain only characters",
                     },
                  })}
               />
               {errors.firstName && (
                  <p style={{ color: "red" }}> {errors.firstName.message} </p>
               )}

               <div className="buttons">
                  <div
                     className="cancel-button"
                     onClick={() => history.push("/brands/")}
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

export default BrandsUpdateForm;
