import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';

// react context
import { GenresListProvider } from '../GenresListContext';

// components
import AntHeader from '../AntHeader';
import AntSearchContent from '../AntSearchContent';
import AntRatedContent from '../AntRatedContent';
import ApiServise from '../ApiServise';

import { Layout } from 'antd';
import { Tabs } from 'antd';
import { isArgumentPlaceholder } from '@babel/types';
const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    searchQuery: null,
    numberPage: 1,
    ratedList: [],
    genresList: [],
    token: null,
  };

  componentDidMount() {
    // инициализация класса вызова API
    const apiCall = new ApiServise();

    // запускает гостевую сессию
    apiCall.creatGuestSession().then((guestToken) => {
      this.setState({
        token: guestToken,
      });
      console.log(this.state.token);
    });

    apiCall.getGenres().then((list) => {
      this.setState({
        genresList: [...list],
      });
    });
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

  // ТЕСТ по клику передает оценку фильма
  addInRatedList = (id) => {
    // console.log(this.state.token)
    // console.log("id", id, typeof id)
    const apiCall = new ApiServise();

    // оценить фильм
    apiCall.rateFilm(id, this.state.token);
    // получить список оцененных фильмов в пределах госетвой сесии
    apiCall.getRatedFilms(this.state.token);
  };

  render() {
    // console.log(this.state.genresList)
    const { searchQuery, numberPage, ratedList, genresList } = this.state;
    return (
      <GenresListProvider value={this.state.genresList}>
        <div className="container">
          <Layout>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Search" key="1">
                <AntHeader onInputChange={this.onInputChange} />
                <AntSearchContent
                  searchQuery={searchQuery}
                  numberPage={numberPage}
                  onPageChange={this.onPageChange}
                  // ТЕСТ
                  addInRatedList={this.addInRatedList}
                  genresList={genresList}
                />
              </TabPane>
              <TabPane tab="Rated" key="2">
                <AntRatedContent ratedList={ratedList} />
              </TabPane>
            </Tabs>
          </Layout>
        </div>
      </GenresListProvider>
    );
  }
}
