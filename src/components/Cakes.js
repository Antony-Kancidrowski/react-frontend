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
            <img className={'cake-image'} src={'http://localhost:3001/' + cake.imageUrl} alt={cake.name} />
          </div>
          <div>
            {cake.comment}
          </div>
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
      cake: {}
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
              <Card className={'card'} key={index} onClick={() => {
                  this.setState({ cake: cake, showdetail: true });
                }
              }>
                <Card.Img className={'card-cake-image'} variant="top" src={'http://localhost:3001/' + cake.imageUrl} alt={cake.name} />
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

        <CakeDetails show={this.state.showdetail} cake={this.state.cake} onClose={this.handleClose} />
      </>
    );
  }
}
