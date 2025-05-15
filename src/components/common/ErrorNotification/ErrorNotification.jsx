import { Alert } from "antd";

export const ErrorNotification = ({ error }) => {
  const message =
    error?.data?.errors?.message || error?.message || "Произошла ошибка";
  return (
    <Alert
      message="Ошибка"
      description={message}
      type="error"
      showIcon
      closable
    />
  );
};
