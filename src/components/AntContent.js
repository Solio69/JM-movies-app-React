import React, { Component } from 'react';
import ApiServise from './ApiServise';
import AntCard from './AntCard';

import { Content } from 'antd/lib/layout/layout';

export default class AntContent extends Component {
  state = {
    moviesList: [],
  };
  constructor(props) {
    super(props);
    this.getList();
  }

  // получает данные из API и записывает список фильмов в moviesList
  apiCall = new ApiServise();
  getList = () => {
    this.apiCall.getMovies().then((list) => {
      this.setState({
        moviesList: [...list],
      });
    });
  };

  render() {
    const { moviesList } = this.state;
    // console.log(list)

    return (
      <Content>
        {moviesList.map((item, i) => {
          const { id } = item;

          return <AntCard item={item} key={id} />;
        })}
      </Content>
    );
  }
}
