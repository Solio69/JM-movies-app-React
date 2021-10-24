import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';

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
    ratedList: [],
    genresList: [],
  };

  componentDidMount() {
    // получаем список жанров
    const apiCall = new ApiServise();
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

  // ТЕСТ добавляет id элемента в массив ratedList (через AntSearchContent, addInRatedList)
  addInRatedList = (id) => {
    this.setState(({ ratedList }) => {
      const newArr = [...ratedList];
      newArr.push(id);
      return {
        ratedList: newArr,
      };
    });
  };

  // ТЕСТ получает moviesList из AntSearchContent
  getMoviesList = (list) => {
    // console.log(list);
  };

  render() {
    // console.log(this.state.genresList)
    const { searchQuery, numberPage, ratedList, genresList } = this.state;
    return (
      <div className="container">
        <Layout>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Search" key="1">
              <AntHeader onInputChange={this.onInputChange} />
              <AntSearchContent
                searchQuery={searchQuery}
                numberPage={numberPage}
                onPageChange={this.onPageChange}
                addInRatedList={this.addInRatedList}
                getMoviesList={this.getMoviesList}
                genresList={genresList}
              />
            </TabPane>
            <TabPane tab="Rated" key="2">
              <AntRatedContent ratedList={ratedList} />
            </TabPane>
          </Tabs>
        </Layout>
      </div>
    );
  }
}
