/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';
import config from '../config';

export const CakeDetailsDialog = ( props ) => {

  const { open, cake, onClose } = props;
  
  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-cakedetails-vcenter"
        centered
        show={open}
        backdrop="static"
        onHide={onClose}
      >
        <Modal.Header>
          <Modal.Title>{cake.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Image className={'cake-image'} src={config.backend.server() + '/' + cake.imageUrl} alt={cake.name} fluid />
          </div>
          <div>
            {cake.comment}
          </div>
          <div>
            {cake.yumFactor}
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

CakeDetailsDialog.propTypes = {
  cake: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};