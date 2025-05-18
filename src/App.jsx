import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import { store } from "./store/store";
import AppRoutes from "./routes/AppRoutes";
import AuthInit from "./components/auth/AuthInit";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 4,
            colorLink: "#1890ff",
          },
        }}
      >
        <BrowserRouter>
          <AuthInit>
            <div className="app-container">
              <AppRoutes />
            </div>
          </AuthInit>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
