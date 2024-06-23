import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function StaticExample({ onClose }) {
  return (
    <Modal show={true} onHide={onClose}> {/* Usa el prop show para controlar la visibilidad */}
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to SuperUseful!</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Just a heads up—some of the product links you click might be affiliate links, including Amazon Associates links, which means we may earn a small commission if you decide to make a purchase. Don’t worry, it won’t cost you anything extra, and it helps us keep bringing you awesome products!</p>
          <p>Enjoy discovering great finds!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}

export default StaticExample;
