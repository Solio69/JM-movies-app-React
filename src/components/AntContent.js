import React, { Component } from 'react';
import ApiServise from './ApiServise';
import AntCard from './AntCard';
import AntSpin from './AntSpin';

import { Content } from 'antd/lib/layout/layout';

export default class AntContent extends Component {
  state = {
    moviesList: [],
    loading: true,
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
        loading: false,
      });
    });
  };

  render() {
    const { loading, moviesList } = this.state;
    const spinner = loading ? <AntSpin /> : null;
    const content = !loading ? <ShowList moviesList={moviesList} /> : null;

    return (
      <Content>
        {spinner}
        {content}
      </Content>
    );
  }
}

const ShowList = ({ moviesList }) => {
  return (
    <React.Fragment>
      {moviesList.map((item, i) => {
        const { id } = item;
        return <AntCard item={item} key={id} />;
      })}
    </React.Fragment>
  );
};
