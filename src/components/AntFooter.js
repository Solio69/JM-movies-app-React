import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Pagination } from 'antd';

const { Footer } = Layout;

export default class AntFooter extends Component {
  render() {
    // console.dir(this.props);
    const { searchQuery, numberPage } = this.props;

    const onPagination = searchQuery ? (
      <Pagination size="small" total={50} current={numberPage} onChange={this.props.onPageChange}></Pagination>
    ) : null;

    return <Footer>{onPagination}</Footer>;
  }
}
