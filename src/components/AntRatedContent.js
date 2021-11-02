import React, { Component } from 'react';
import { Content } from 'antd/lib/layout/layout';

import { GenresListConsumer } from './GenresListContext';
import AntCard from './AntCard';

export default class AntRatedContent extends Component {
  state = {
    showRating: null,
  };

  render() {
    // console.log(this.props.rateList)
    const { rateList } = this.props;

    return (
      <Content>
        <GenresListConsumer>
          {(genresList) => {
            return (
              <React.Fragment>
                {rateList.map((item) => {
                  const { id } = item;
                  return <AntCard item={item} key={id} genresList={genresList} />;
                })}
              </React.Fragment>
            );
          }}
        </GenresListConsumer>
      </Content>
    );
  }
}
