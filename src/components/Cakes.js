/**
 * Copyright (c) 2021 Antony Kancidrowski
 */
import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardColumns from 'react-bootstrap/CardColumns';

import { CakeDetails } from './CakeDetails';

import config from '../config';

import './Cakes.css';

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

  handleDelete = (id) => {

    console.log(id);
  };

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
                <Card.Header as="h5">{cake.name}</Card.Header>
                <Card.Img className={'card-cake-image'} variant="top" src={'http://localhost:3001/' + cake.imageUrl} alt={cake.name} />
                <Card.Body>
                  <Card.Text>
                    {cake.comment}
                  </Card.Text>
                  <Button variant="danger" size="sm" onClick={(e) => {
                      e.stopPropagation();

                      this.handleDelete(cake.cakeID);
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
