/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';

import config from '../config';

import './Cakes.css';

export const ConfirmationDialog = ( props ) => {

  const { confirmation, open } = props;

  /**
   * 
   * @param {*} e 
   */
  const handleClose = (e) => {
    const target = e.currentTarget;
    confirmation.handleClose(confirmation.cake.cakeID, target.id === 'ok');
  };

  return (
    <>
      <Modal
        {...props}
        aria-labelledby="contained-modal-cakedetails-vcenter"
        centered
        show={open}
        backdrop="static"
        keyboard={false}
        >
        <Modal.Header>
          <Modal.Title>{confirmation.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="confirmation-container">
            <Image className="confirmation-cake-image" src={config.backend.server() + '/' + confirmation.cake?.imageUrl} alt={confirmation.cake?.name} fluid />
          </div>
          <div className="confirmation-container">
            {confirmation.message}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel" variant="primary" onClick={handleClose}>
            {confirmation.cancel}
          </Button>
          <Button id="ok" variant="danger" onClick={handleClose}>
            {confirmation.ok}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ConfirmationDialog.propTypes = {
  confirmation: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};