import React from "react";
import { message } from "antd";

interface AlertProps {
  info: string;
  type: "success";
}

const CustomAlert: React.FC<AlertProps> = ({ info, type }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const display = () => {
    messageApi.open({
      type: type,
      content: info,
    });
  };

  display();
  return <>{contextHolder}</>;
};

export default CustomAlert;
