import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Input } from 'antd';

const { Header } = Layout;
export default class AntHeader extends Component {
  render() {
    return (
      <Header>
        {/* страницы */}
        <Input placeholder="Type to search..." onChange={this.props.onInputChange} />
      </Header>
    );
  }
}
