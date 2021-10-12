import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';

// components
import AntHeader from '../AntHeader';
import AntContent from '../AntContent';
import AntFooter from '../AntFooter';

import { Layout } from 'antd';

export default class App extends Component {
  state = {
    searchQuery: null,
  };

  onInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
    });
  };

  render() {
    const { searchQuery } = this.state;

    return (
      <div className="container">
        <Layout>
          <AntHeader onInputChange={this.onInputChange} />
          <AntContent searchQuery={searchQuery} />
          <AntFooter />
        </Layout>
      </div>
    );
  }
}
