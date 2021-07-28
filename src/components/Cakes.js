/**
 * Copyright (c) 2021 Antony Kancidrowski
 */
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import { CakeDetails } from './CakeDetails';
import { ConfirmationDialog } from './ConfirmationDialog';

import config from '../config';

import './Cakes.css';

export class Cakes extends Component {
  static displayName = Cakes.name;

  constructor(props) {
    super(props);

    this.state = {
      cakes: [],
      showdetail: false,
      cake: {},
      confirmation: {},
      confirmationOpen: false
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmationClose = this.handleConfirmationClose.bind(this);
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

  handleConfirmationClose = (value, shouldRemove) => {

    if (shouldRemove === true) {

      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      };
      fetch(config.backend.cakeApi() + '/deletecake/'+ value, requestOptions)
        .then(async (data) => {

          if (data.status === 200) {

            var removeIndex = this.state.cakes.findIndex((cake) => cake.cakeID === value);

            const cks = [...this.state.cakes];
            cks.splice(removeIndex, 1);

            this.setState({ cakes: cks });

          }
        })
        .catch((e) =>
          console.log(e, "Can’t access response.")
        );
    }

    this.setState({ confirmationOpen: false });
  };

  handleDelete = (cake) => {

    this.setState({ confirmation: {
      title: 'Delete Cake',
      message: 'Are you sure that you want to delete ' + cake.name + '?',
      target: cake.cakeID,
      ok: 'Delete',
      cancel: 'Cancel',
      handleClose: this.handleConfirmationClose
    }, confirmationOpen: true });

  };

  handleClose = () => {

    this.setState({ showdetail: false });
  };

  render() {
    return (
      <>
        <ConfirmationDialog confirmation={this.state.confirmation} open={this.state.confirmationOpen} />

        <CardColumns>

          {this.state.cakes.map((cake, index) => {

            return (
              <Card className={'card'} key={index} onClick={() => {
                  this.setState({ cake: cake, showdetail: true });
                }
              }>
                <Card.Header as="h5">{cake.name}</Card.Header>
                <Card.Img className={'card-cake-image'} variant="top" src={'http://localhost:3001/' + cake.imageUrl} alt={cake.name} />
                <Card.Body>
                  <Card.Text>
                    {cake.comment}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={(e) => {
                      e.stopPropagation();

                      this.handleDelete(cake);
                    }
                  }>Delete</Button>
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
