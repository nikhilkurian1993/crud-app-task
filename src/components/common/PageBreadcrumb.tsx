import React from "react";
import { Breadcrumb } from "antd";
const { Item } = Breadcrumb;
const PageBreadcrumb: React.FC = () => {
  return (
    <Breadcrumb style={{ margin: "16px 0", padding: "0 50px" }}>
      <Item>Home</Item>
      <Item>List</Item>
      <Item>App</Item>
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
