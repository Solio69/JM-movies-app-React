import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';

// react context
import { GenresListProvider } from '../GenresListContext';

import AntHeader from '../AntHeader';
import AntSearchContent from '../AntSearchContent';
import AntRatedContent from '../AntRatedContent';

import apiServise from '../../services/ApiServise';

import { Layout } from 'antd';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    searchQuery: null,
    numberPage: 1,
    genresList: [],
    rateList: [],
  };

  componentDidMount() {
    // получает список жанров
    apiServise.getGenres().then((list) => {
      this.setState({
        genresList: [...list],
      });
    });

    // если в localStorage нет токена
    if (!JSON.parse(localStorage.getItem('guestToken'))) {
      // запускает гостевую сессию
      apiServise.creatGuestSession().then((guestToken) => {
        // сохраняет token в localStorage
        localStorage.setItem('guestToken', JSON.stringify(guestToken));
      });
    } else {
      // если есть, то получает список оцененных и записывает в rateList
      this.changeRateList();
    }
  }

  // следит за строкой ввода
  onInputChange = (e) => {
    this.setState({
      searchQuery: e.target.value,
      numberPage: 1,
    });
  };

  // следит за компонентом пагинации
  onPageChange = (page) => {
    this.setState({
      numberPage: page,
    });
  };

  // изменяет массив с оцененными фильмами
  changeRateList = () => {
    // получает список оцененных
    apiServise.getRatedFilms().then((res) => {
      this.setState({
        rateList: [...res.results], // записывает в rateList
      });
    });
  };

  // клик по табу
  onTabClick = (key) => {
    // получает список оцененных и записывает в rateList
    this.changeRateList();
  };

  render() {
    const { searchQuery, numberPage, genresList, rateList } = this.state;
    return (
      <GenresListProvider value={genresList}>
        <div className="container">
          <Layout>
            <Tabs defaultActiveKey="1" onTabClick={this.onTabClick}>
              <TabPane tab="Search" key="1">
                <AntHeader onInputChange={this.onInputChange} />
                <AntSearchContent
                  searchQuery={searchQuery}
                  numberPage={numberPage}
                  onPageChange={this.onPageChange}
                  changeRateList={this.changeRateList}
                  rateList={rateList}
                />
              </TabPane>
              <TabPane tab="Rated" key="2">
                <AntRatedContent rateList={rateList} changeRateList={this.changeRateList} />
              </TabPane>
            </Tabs>
          </Layout>
        </div>
      </GenresListProvider>
    );
  }
}
