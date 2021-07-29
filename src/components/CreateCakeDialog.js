
/**
 * Copyright (c) 2021 Antony Kancidrowski
 */
 import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { Formik } from 'formik';
import * as yup from 'yup';

import config from '../config';

const schema = yup.object().shape({
  name: yup.string().required(),
  comment: yup.string().required(),
  imageUrl: yup.string().required(),
  yumFactor: yup.number().required().min(1).max(5)
});

export const CreateCakeDialog = ( props ) => {

  const { onSuccess } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * 
   * @param {*} event 
   */
  const submit = (cake) => {

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cakeDetails: cake
      }),
    };
    fetch(config.backend.cakeApi() + '/createcake', requestOptions)
      .then(async (data) => {

        if (data.status === 200) {

          onSuccess();
        }
      })
      .catch((e) =>
        console.log(e, "Can’t access response.")
      );

    console.log(cake);

    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Cake
      </Button>

      <Modal
        {...props}
        aria-labelledby="contained-modal-cakedetails-vcenter"
        centered
        show={show}
        backdrop="static"
        onHide={handleClose}
        >
        <Modal.Header>
          <Modal.Title>Create Cake</Modal.Title>
        </Modal.Header>

        <Formik
            validationSchema={schema}
            onSubmit={submit}
            initialValues={{
              name: '',
              comment: '',
              imageUrl: '',
              yumFactor: 1,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (

            <Form noValidate onSubmit={handleSubmit}>

              <Modal.Body>
                      
                <Form.Group className="mb-3" controlId="formCakeName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCakeComent">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Comment"
                    name="comment"
                    value={values.comment}
                    onChange={handleChange}
                    isValid={touched.comment && !errors.comment}
                  />
                <Form.Control.Feedback type="invalid">
                  {errors.comment}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImageURL">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="http://www.leech-images.com/image.jpeg"
                    name="imageUrl"
                    value={values.imageUrl}
                    onChange={handleChange}
                    isValid={touched.imageUrl && !errors.imageUrl}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.imageUrl}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formYumFactor">
                  <Form.Label>Yum Factor</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min={1}
                    max={5}
                    placeholder="5"
                    name="yumFactor"
                    value={values.yumFactor}
                    onChange={handleChange}
                    isValid={touched.yumFactor && !errors.yumFactor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.yumFactor}
                  </Form.Control.Feedback>
                </Form.Group>

              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </Modal.Footer>

            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
}