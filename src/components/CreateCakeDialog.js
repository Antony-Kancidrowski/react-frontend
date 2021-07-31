
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

import './CreateCakeDialog.css';

const validationSchema = yup.object().shape({
  name: yup.string()
    .min(2, "* Names must have at least 2 characters")
    .max(30, "* Names can't be longer than 30 characters")
    .required("* Name is required"),
  comment: yup.string()
    .min(2, "* Comment must have at least 2 characters")
    .max(200, "* Comment can't be longer than 200 characters")
    .required("* Comment is required"),
  imageUrl: yup.string()
    .url("* Must enter URL in http://www.example.com format")
    .required("* URL required"),
  yumFactor: yup.number()
    .min(1, "* Yum Factor must be between 1 and 5 inclusive")
    .max(5, "* Yum Factor must be between 1 and 5 inclusive")
    .required("* Yum Factor required"),
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
            validationSchema={validationSchema}
            onSubmit={submit}
            initialValues={{
              name: '',
              comment: '',
              imageUrl: '',
              yumFactor: 1,
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (

            <Form noValidate onSubmit={handleSubmit}>

              <Modal.Body>
                      
                <Form.Group className="mb-3" controlId="formCakeName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    className={touched.name && errors.name ? "error" : null}
                    placeholder="Name"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                  />
                  {touched.name && errors.name ? (
                    <div className="error-message">{errors.name}</div>
                  ): null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCakeComent">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    className={touched.comment && errors.comment ? "error" : null}
                    placeholder="Comment"
                    name="comment"
                    value={values.comment}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={touched.comment && !errors.comment}
                  />
                  {touched.comment && errors.comment ? (
                    <div className="error-message">{errors.comment}</div>
                  ): null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formImageURL">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    className={touched.imageUrl && errors.imageUrl ? "error" : null}
                    placeholder="http://www.leech-images.com/image.jpeg"
                    name="imageUrl"
                    value={values.imageUrl}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={touched.imageUrl && !errors.imageUrl}
                  />
                  {touched.imageUrl && errors.imageUrl ? (
                    <div className="error-message">{errors.imageUrl}</div>
                  ): null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formYumFactor">
                  <Form.Label>Yum Factor</Form.Label>
                  <Form.Control
                    type="number"
                    className={touched.yumFactor && errors.yumFactor ? "error" : null}
                    min={1}
                    max={5}
                    placeholder="5"
                    name="yumFactor"
                    value={values.yumFactor}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    isValid={touched.yumFactor && !errors.yumFactor}
                  />
                  {touched.yumFactor && errors.yumFactor ? (
                    <div className="error-message">{errors.yumFactor}</div>
                  ): null}
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