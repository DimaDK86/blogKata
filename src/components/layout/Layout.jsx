import { Layout } from 'antd';
import Header from '../header/Header';
import './Layout.module.css';

const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header />
      <Content className="content">
        <div className="container">{children}</div>
      </Content>
      <Footer className="footer">
        RealWorld Blog ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default AppLayout;