import { Form, Row, Col, Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { customerServices } from "../Services/customers.services";
import InfoModal from "../Common/Modals/InfoModal";

const CustomerCreate = () => {
   const { register, handleSubmit, errors } = useForm();
   const [show, setShow] = useState(false);
   const history = useHistory();

   const onSubmit = (data) => {
      customerServices
         .createCustomer({ ...data, orders: [] })
         .then((res) => {
            if (res.status === 201) {
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

   const handleShow = () => history.push("/");

   return (
      <>
         <InfoModal
            show={show}
            handleShow={handleShow}
            message={"User created successfuly!"}
         />

         <div className="form-container">
            <h2 className="my-4 ">Create customer</h2>
            <Form onSubmit={handleSubmit(onSubmit)}>
               <Form.Label>First Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  name="firstName"
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

               <Form.Label>Last Name</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  name="lastName"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This field should contain only characters",
                     },
                  })}
               />
               {errors.lastName && (
                  <p style={{ color: "red" }}> {errors.lastName.message} </p>
               )}

               <Form.Label>Phone</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter phone"
                  name="phone"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[+0-9][0-9]*$/,
                        message: "Enter valid number",
                     },
                  })}
               />
               {errors.phone && (
                  <p style={{ color: "red" }}>{errors.phone.message}</p>
               )}

               <Form.Label>Email address</Form.Label>
               <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  ref={register({
                     ...defaultValidation,
                  })}
               />
               {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
               )}

               <Form.Label>Street</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter street"
                  name="street"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z0-9\s]+$/i,
                        message: "Enter a valid street name",
                     },
                  })}
               />
               {errors.street && (
                  <p style={{ color: "red" }}>{errors.street.message}</p>
               )}

               <Form.Label>City</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter city"
                  name="city"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This field should contain only characters",
                     },
                  })}
               />
               {errors.city && (
                  <p style={{ color: "red" }}>{errors.city.message}</p>
               )}

               <Form.Label>State</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter state"
                  name="state"
                  ref={register({
                     ...defaultValidation,
                     pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "This field should contain only characters",
                     },
                  })}
               />
               {errors.state && (
                  <p style={{ color: "red" }}>{errors.state.message}</p>
               )}

               <Form.Label>Zip code</Form.Label>
               <Form.Control
                  type="text"
                  placeholder="Enter zip code"
                  name="zipCode"
                  ref={register({
                     ...defaultValidation,
                     minLength: {
                        value: 5,
                        message: "Enter exactly 5 numbers",
                     },
                     maxLength: {
                        value: 5,
                        message: "Enter exactly 5 numbers",
                     },
                     pattern: {
                        value: /^[0-9]+$/i,
                        message: "This field should contain only numbers",
                     },
                  })}
               />
               {errors.zipCode && (
                  <p style={{ color: "red" }}>{errors.zipCode.message}</p>
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

export default CustomerCreate;
