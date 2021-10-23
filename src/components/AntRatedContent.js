import React, { Component } from 'react';
import { Content } from 'antd/lib/layout/layout';

export default class AntRatedContent extends Component {
  render() {
    console.log(this.props); // => ratedList
    return <Content>123</Content>;
  }
}
