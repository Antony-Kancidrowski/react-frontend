/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

export const CakeDetails = ( props ) => {

  const { show, cake, onClose } = props;
  
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-cakedetails-vcenter"
        centered
        show={show}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{cake.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Image className={'cake-image'} src={'http://localhost:3001/' + cake.imageUrl} alt={cake.name} fluid />
          </div>
          <div>
            {cake.comment}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}