import React, { Component } from 'react';
// components
import apiServise from '../services/ApiServise';
import AntCard from './AntCard';
import AntSpin from './AntSpin';

// react context
import { GenresListConsumer } from './GenresListContext';

import { Alert } from 'antd';
import { Pagination } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { debounce } from 'lodash';

export default class AntSearchContent extends Component {
  state = {
    moviesList: [],
    loading: false,
    error: false,
    notFound: false,
    totalPages: null,
  };

  // получить список фильмов
  getList = (searchQuery, numberPage) => {
    apiServise
      // делаем запрос на сервер передаем значение из строки поиска
      .getMovies(searchQuery, numberPage)
      .then((res) => {
        this.setState({
          moviesList: [...res.list],
          loading: false,
          error: false,
          totalPages: res.totalPages,
        });
      })
      .then(() => {
        // если поиск не дал результатов (пустой массив)
        if (this.state.moviesList.length === 0) {
          this.setState({
            notFound: true,
          });
        }
      })
      .catch(this.onError);
  };

  // задержка запроса
  debouncedGetList = debounce(this.getList, 500);

  // обрабатывает ошибку данных с сервера
  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentDidUpdate(perevProps) {
    const { searchQuery, numberPage } = this.props;

    if (searchQuery !== perevProps.searchQuery || numberPage !== perevProps.numberPage) {
      this.setState({
        loading: true,
        error: false,
        notFound: false,
      });
      this.debouncedGetList(searchQuery, numberPage);
    }
  }

  render() {
    const { moviesList, loading, error, notFound, totalPages } = this.state;

    const { searchQuery, numberPage, onPageChange, changeRateList, rateList } = this.props;

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
    const content = !(loading || error) ? (
      <GenresListConsumer>
        {(genresList) => {
          return (
            <React.Fragment>
              {moviesList.map((item) => {
                const { id } = item;
                return (
                  <AntCard
                    item={item}
                    key={id}
                    genresList={genresList}
                    changeRateList={changeRateList}
                    rateList={rateList}
                  />
                );
              })}
            </React.Fragment>
          );
        }}
      </GenresListConsumer>
    ) : null;

    // пагинация
    const quickJumper = totalPages > 5 ? true : false; // показывать ли окно ввода страницы
    const total = totalPages * 10; // сколько всего страниц

    const onPagination =
      moviesList.length !== 0 && searchQuery !== '' && !loading ? (
        <Pagination
          size="small"
          showQuickJumper={quickJumper}
          defaultCurrent={numberPage}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
        ></Pagination>
      ) : null;

    return (
      <React.Fragment>
        <Content>
          {spinner}
          {content}
          {errorMessage}
          {onNotFound}
        </Content>
        {onPagination}
      </React.Fragment>
    );
  }
}
