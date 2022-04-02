/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { CakeFooter } from './CakeFooter';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Container>
          {this.props.children}
        </Container>
        <CakeFooter />
      </div>
    );
  }
}