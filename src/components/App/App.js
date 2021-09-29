
import 'antd/dist/antd.css';
import './App.css';
import React, { Component } from 'react';

// components
import AntHeader from '../AntHeader'
import AntContent from '../AntContent'
import AntFooter from '../AntFooter'



import { Layout} from 'antd';


export default class App extends Component {

  render() {
    
    return (
    <div className="container">
      <Layout >
        <AntHeader/>
        <AntContent/>
        <AntFooter/>
      </Layout>
    </div>
    )
    
  }
}


