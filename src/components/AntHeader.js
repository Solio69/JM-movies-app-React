import 'antd/dist/antd.css';
import { Layout, Input, } from 'antd';

const { Header} = Layout;

const AntHeader = () => (
  <Header>
  {/* страницы */}
    <Input placeholder="Type to search..."/>
  </Header>
);

export default AntHeader;