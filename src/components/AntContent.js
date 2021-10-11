import React, { Component } from 'react';
import ApiServise from './ApiServise';
import AntCard from './AntCard';
import AntSpin from './AntSpin';
import AntAlert from './AntAlert';

import { Content } from 'antd/lib/layout/layout';

export default class AntContent extends Component {
  state = {
    moviesList: [],
    loading: true,
    error: false,
  };
  constructor(props) {
    super(props);
    this.getList();
  }

  // получает данные из API и записывает список фильмов в moviesList
  apiCall = new ApiServise();
  getList = () => {
    this.apiCall
      .getMovies()
      .then((list) => {
        this.setState({
          moviesList: [...list],
          loading: false,
        });
      })
      .catch(this.onError);
  };

  // обрабатывает ошибку данных с сервера
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const { loading, moviesList, error } = this.state;

    const errorMessage = error ? <AntAlert /> : null;
    const spinner = loading ? <AntSpin /> : null;
    const content = !(loading || error) ? <ShowList moviesList={moviesList} /> : null;

    return (
      <Content>
        {spinner}
        {content}
        {errorMessage}
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
