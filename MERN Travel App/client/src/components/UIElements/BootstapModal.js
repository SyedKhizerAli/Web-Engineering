import React from 'react';
import Button from '../FormElements/Button';
import Modal from 'react-bootstrap/Modal'
const BootstapModal = (props) => {
  return (
    <Modal
    show={props.showConfirmModal}
    onHide={props.cancelBookingHandler}
  >
  <Modal.Header closeButton>
      <Modal.Title>Are you Sure?</Modal.Title>
  </Modal.Header>
  <Modal.Body>
      {props.body}
  </Modal.Body>
  <Modal.Footer>
    <Button inverse onClick={props.cancelBookingHandler}>
          Cancel
    </Button>
    <Button danger onClick={props.confirmBookingHandler}>
          {props.action}
    </Button>
  </Modal.Footer>
  </Modal>
  )
}

export default BootstapModal
