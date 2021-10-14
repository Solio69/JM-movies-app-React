import React, { Component } from 'react';
// components
import ApiServise from './ApiServise';
import AntCard from './AntCard';
import AntSpin from './AntSpin';

import { Alert } from 'antd';

import { Content } from 'antd/lib/layout/layout';
import { debounce } from 'lodash';

export default class AntContent extends Component {
  state = {
    moviesList: [],
    loading: false,
    error: false,
    notFound: false,
  };

  // получить список фильмов
  getList = (searchQuery, numberPage) => {
    // инстанс ApiServise
    const apiCall = new ApiServise();
    // делаем запрос а сервер передаем значение из строки поиска
    apiCall
      .getMovies(searchQuery, numberPage)
      .then((list) => {
        this.setState({
          moviesList: [...list],
          loading: false,
          error: false,
          notFound: false,
        });
        if (this.state.moviesList.length === 0) {
          this.setState({
            notFound: true,
          });
        }
      })
      .catch(this.onError);
  };
  // задержка запроса
  debounced = debounce(this.getList, 500);

  // обрабатывает ошибку данных с сервера
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentDidUpdate(perevProps) {
    if (this.props.searchQuery !== perevProps.searchQuery || this.props.numberPage !== perevProps.numberPage) {
      this.setState({
        loading: true,
        error: false,
        // notFound: false,
      });
      this.debounced(this.props.searchQuery, this.props.numberPage);
    }
  }

  render() {
    const { moviesList, loading, error, notFound } = this.state;
    const { searchQuery } = this.props;
    // console.log(moviesList)

    // сообщение об ошибке
    const errorMessage =
      error && searchQuery !== '' ? (
        <Alert message="Error" description="Oops, something went wrong :-(" type="error" showIcon />
      ) : null;

    // сообщение об отсутствии результатов поиска
    const onNotFound =
      !error && !loading && notFound ? (
        <Alert message="No results were found for your search!" type="info" showIcon />
      ) : null;

    // индикатор загрузки
    const spinner = loading ? <AntSpin /> : null;

    // обображенеи списка фильмов
    const content = !(loading || error) ? <ShowList moviesList={moviesList} /> : null;

    return (
      <Content>
        {spinner}
        {content}
        {errorMessage}
        {onNotFound}
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
