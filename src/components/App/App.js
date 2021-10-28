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

const { TabPane } = Tabs;

export default class App extends Component {
  state = {
    searchQuery: null,
    numberPage: 1,
    genresList: [],
    rateList: [],
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
    });

    // получает список жанров
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

  // клик по табу
  onTabClick = (key) => {
    // получает список оцененных
    if (key === '2') {
      const apiCall = new ApiServise();
      apiCall.getRatedFilms(this.state.token).then((res) => {
        // console.log(res);
        this.setState({
          rateList: [...res.results],
        });
      });
    }
  };

  render() {
    // console.log(this.state.genresList)
    const { searchQuery, numberPage, genresList, token, rateList } = this.state;
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
                  token={token}
                />
              </TabPane>
              <TabPane tab="Rated" key="2">
                <AntRatedContent token={token} rateList={rateList} />
              </TabPane>
            </Tabs>
          </Layout>
        </div>
      </GenresListProvider>
    );
  }
}
