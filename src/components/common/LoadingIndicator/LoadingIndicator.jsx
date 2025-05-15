import { Spin } from "antd";

export const LoadingIndicator = ({ fullScreen = false }) => {
  return (
    <div className={`loading-indicator ${fullScreen ? "full-screen" : ""}`}>
      <Spin size="large" />
    </div>
  );
};
