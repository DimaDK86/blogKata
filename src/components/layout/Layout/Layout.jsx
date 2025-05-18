import { Layout } from "antd";
import Header from "../../header/Header";
import styles from "./Layout.module.css";

const { Content, Footer } = Layout;

const AppLayout = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Content className={styles.content}>
        <div className={styles.container}>{children}</div>
      </Content>
      <Footer className={styles.footer}>
        RealWorld Blog ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default AppLayout;
