import { Modal, Button } from "react-bootstrap";

const ActionModal = ({ show, handleShow, message, id, action, data }) => {
   return (
      <Modal show={show} onHide={handleShow}>
         <Modal.Header closeButton>
            <Modal.Title>
               {message ? message : "Successfuly created customer"}
            </Modal.Title>
         </Modal.Header>

         <Modal.Footer>
            {id ? (
               <>
                  <Button variant="secondary" onClick={handleShow}>
                     No
                  </Button>
                  <Button
                     variant="primary"
                     onClick={() => {
                        action(id, data);
                     }}
                  >
                     Yes
                  </Button>
               </>
            ) : (
               <Button variant="primary" onClick={handleShow}>
                  Ok
               </Button>
            )}
         </Modal.Footer>
      </Modal>
   );
};

export default ActionModal;
