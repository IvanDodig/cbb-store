import { Modal, Button } from "react-bootstrap";

const InfoModal = ({ show, handleShow, message }) => {
   return (
      <Modal show={show} onHide={handleShow}>
         <Modal.Header closeButton>
            <Modal.Title>{message}</Modal.Title>
         </Modal.Header>

         <Modal.Footer>
            <Button variant="primary" onClick={handleShow}>
               Ok
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default InfoModal;
