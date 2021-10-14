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
    numberPage: 1,
  };

  onInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
      numberPage: 1,
    });
  };

  onPageChange = (page) => {
    this.setState({
      numberPage: page,
    });
  };

  render() {
    const { searchQuery, numberPage } = this.state;
    // console.log(numberPage);
    return (
      <div className="container">
        <Layout>
          <AntHeader onInputChange={this.onInputChange} />
          <AntContent searchQuery={searchQuery} numberPage={numberPage} />
          <AntFooter onPageChange={this.onPageChange} searchQuery={searchQuery} numberPage={numberPage} />
        </Layout>
      </div>
    );
  }
}
