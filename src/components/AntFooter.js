import 'antd/dist/antd.css';
import { Layout, Pagination } from 'antd';

const { Footer } = Layout;

const AntFooter = () => (
  <Footer>
    <Pagination size="small" total={50}></Pagination>
  </Footer>
);

export default AntFooter;
