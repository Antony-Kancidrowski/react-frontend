/**
 * Copyright (c) 2021 Antony Kancidrowski
 */
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';
import Modal from 'react-bootstrap/Modal';

import config from '../config';

import './Cakes.css';

const CakeDetails = ( props ) => {

  const { show, title, text, onClose } = props;
  
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
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export class Cakes extends Component {
  static displayName = Cakes.name;

  constructor(props) {
    super(props);

    this.state = {
      cakes: [],
      showdetail: false,
      title: 'Title',
      text: 'I will not close if you click outside me. Don\'t even try to press escape key.'
    };

    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(config.backend.cakeApi() + '/getcakes', requestOptions)
      .then(async (data) => {

        if (data.status === 200) {
          data.json().then(( { cakes }) => {

            this.setState({ cakes: cakes });

            console.log(this.state.cakes);
          });
        }
      })
      .catch((e) =>
        console.log(e, "Can’t access response.")
      );
  }

  handleClose = () => {

    this.setState({ showdetail: false });
  };

  render() {
    return (
      <>
        <CardColumns>

          {this.state.cakes.map((cake, index) => {

            return (
              <Card key={index} onClick={() => {
                  this.setState({ showdetail: true });
                }
              }>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>{cake.name}</Card.Title>
                  <Card.Text>
                    {cake.comment}
                  </Card.Text>
                </Card.Body>
              </Card>
            );
          })}

        </CardColumns>

        <CakeDetails show={this.state.showdetail} title={this.state.title} text={this.state.text} onClose={this.handleClose} />
      </>
    );
  }
}