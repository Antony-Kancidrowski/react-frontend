/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import ReactStars from "react-rating-stars-component";

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

import PropTypes from 'prop-types';

export const CakeDetailsDialog = ( props ) => {

  const { open, cake, onClose } = props;

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  
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
            <Image className={'cake-image'} src={cake.imageUrl} alt={cake.name} fluid />
          </div>
          <div>
            {cake.comment}
          </div>
          <div>
            <ReactStars
              count={5}
              value={cake.yumFactor}
              onChange={ratingChanged}
              size={24}
              isHalf={true}
              emptyIcon={<i className="far fa-star"></i>}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              activeColor="#ffd700"
              edit={false}
            />
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