/**
 * Copyright (c) 2021 Antony Kancidrowski
 */
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import { CakeDetailsDialog } from './CakeDetailsDialog';
import { CreateCakeDialog } from './CreateCakeDialog';
import { ConfirmationDialog } from './ConfirmationDialog';

import config from '../config';

import './Cakes.css';

export class Cakes extends Component {
  static displayName = Cakes.name;

  constructor(props) {
    super(props);

    this.state = {
      cakes: [],
      detailOpen: false,
      cake: {},
      confirmation: {},
      confirmationOpen: false,
      createOpen: true
    };

    this.handleCreateClose = this.handleCreateClose.bind(this);
    this.handleDetailClose = this.handleDetailClose.bind(this);
    this.handleConfirmationClose = this.handleConfirmationClose.bind(this);
  }

  /**
   * Read the cakes from the backend server
   */
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

  /**
   * 
   * @param {*} value 
   * @param {*} shouldRemove 
   */
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

  /**
   * 
   * @param {*} cake 
   */
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

  /**
   * 
   */
  handleCreateClose = () => {

    this.setState({ createOpen: false });
  };

  /**
   * 
   */
  handleDetailClose = () => {

    this.setState({ detailOpen: false });
  };

  render() {
    return (
      <>
        <CardColumns>

          {this.state.cakes.map((cake, index) => {

            return (
              <Card className="cake-card" key={index} onClick={() => {
                  this.setState({ cake: cake, detailOpen: true });
                }
              }>
                <Card.Header className="header" as="h5">
                  <div className="name">
                    {cake.name}
                  </div>
                  <div className="delete">
                    <Button variant="danger" size="sm" onClick={(e) => {
                        e.stopPropagation();

                        this.handleDelete(cake);
                      }
                    }>Delete</Button>
                  </div>
                </Card.Header>
                <Card.Img className="card-cake-image" variant="top" src={'http://localhost:3001/' + cake.imageUrl} alt={cake.name} />
                <Card.Body>
                  <Card.Text>
                    {cake.comment}
                  </Card.Text>
                 
                </Card.Body>
              </Card>
            );
          })}

        </CardColumns>

        <CakeDetailsDialog open={this.state.detailOpen} cake={this.state.cake} onClose={this.handleDetailClose} />
        <CreateCakeDialog open={this.state.createOpen} onClose={this.handleCreateClose} />
        <ConfirmationDialog confirmation={this.state.confirmation} open={this.state.confirmationOpen} />
        
      </>
    );
  }
}
