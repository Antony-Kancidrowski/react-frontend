/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import React, { Component } from "react";
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Cakes } from './components/Cakes';

class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Cakes} />
      </Layout>
    );
  }
}

export default App;
