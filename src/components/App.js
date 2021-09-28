
import 'antd/dist/antd.css';
import './App.css';
import { Layout,  Pagination, Input, Card,  } from 'antd';
import {
  // StarOutlined,
  StarFilled
} from '@ant-design/icons';



function App() {
  const { Header, Footer, Content,} = Layout;


    return (
    <div className="container">
      <Layout >
          <Header>
            {/* страницы */}
            <Input placeholder="Type to search..."/>
          </Header>
          <Content className="ant-layout-content">
            <Card
              className="ant-card"
              hoverable
              cover={<img alt="example" src="./images/Rectangle.jpg"/>}
              >
              <div className="ant-card-body_rating">6.6</div>
              <div className="ant-card-body_title">The way back</div>
              <div className="ant-card-body_data">March 5, 2020</div>
              <div className="ant-card-body_genres">
                <span className="ant-card-body_genre-item">Action</span>
                <span className="ant-card-body_genre-item">Drama</span>
              </div>
              
              <p className="ant-card-body_text"> A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...
              </p>
              
              <div className="ant-card-body_genre-stars">
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
              </div>
            </Card>
            <Card
              className="ant-card"
              hoverable
              cover={<img alt="example" src="./images/Rectangle.jpg"/>}
              >
              <div className="ant-card-body_rating">6.6</div>
              <div className="ant-card-body_title">{}</div>
              <div className="ant-card-body_data">March 5, 2020</div>
              <div className="ant-card-body_genres">
                <span className="ant-card-body_genre-item">Action</span>
                <span className="ant-card-body_genre-item">Drama</span>
              </div>
              
              <p className="ant-card-body_text"> A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction attempts to regain his soul  and salvation by becoming the coach of a disparate ethnically mixed high ...</p>
              
              <div className="ant-card-body_genre-stars">
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#E9D100' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
                <StarFilled style={{ fontSize: '16px', color: '#DCDCDC' }}/>
              </div>
            </Card>
                 
                  
            
          </Content>
          <Footer>
            <Pagination size="small" total={50}></Pagination>
          </Footer>
      </Layout>
    </div>
    
  );
}

export default App;
