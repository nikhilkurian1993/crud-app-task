import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const PageHeader: React.FC = () => {
  return (
    <div className="container">
      <div className="topbar">
        <MenuOutlined style={{ color: "white", fontSize: "23px" }} />
        <div className="logo">
          <strong>WHATS'ON</strong>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
