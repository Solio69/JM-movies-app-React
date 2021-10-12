import React, { Component } from 'react';
import ApiServise from './ApiServise';
import AntCard from './AntCard';
import AntSpin from './AntSpin';
import AntAlert from './AntAlert';

import { Content } from 'antd/lib/layout/layout';

export default class AntContent extends Component {
  state = {
    moviesList: [],
    loading: false,
    error: false,
  };

  getList = (searchQuery) => {
    // инстанс ApiServise
    const apiCall = new ApiServise();
    // делаем запрос а сервер передаем значение из строки поиска
    apiCall
      .getMovies(searchQuery)
      .then((list) => {
        this.setState({
          moviesList: [...list],
          loading: false,
          error: false,
        });
        // console.log(this.state.moviesList)
      })
      // обрабатывает ошибку
      .catch(this.onError);
  };

  // обрабатывает ошибку данных с сервера
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentDidUpdate(perevProps) {
    if (this.props.searchQuery !== perevProps.searchQuery) {
      this.setState({
        loading: true,
      });
      this.getList(this.props.searchQuery);
    }
  }

  render() {
    const { moviesList, loading, error } = this.state;

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
