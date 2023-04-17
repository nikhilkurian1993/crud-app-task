import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = (
  <LoadingOutlined style={{ fontSize: 50, color: "#000" }} spin />
);
interface SpinnerProps {
  isLoading: boolean;
}

const CustomSpinner: React.FC<SpinnerProps> = ({ isLoading }) => (
  <div className={`my-spinner-wrapper ${isLoading ? "active" : null}`}>
    <Spin indicator={antIcon} />
  </div>
);

export default CustomSpinner;
