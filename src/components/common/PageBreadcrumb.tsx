import React from "react";
import { Breadcrumb } from "antd";

const PageBreadcrumb: React.FC = () => {
  const items = [{ title: "Home" }, { title: "List" }, { title: "App" }];
  return (
    <Breadcrumb style={{ margin: "16px 0", padding: "0 50px" }} items={items} />
  );
};

export default PageBreadcrumb;
