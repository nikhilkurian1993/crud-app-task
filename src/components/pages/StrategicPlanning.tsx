import React from "react";
import PageHeader from "../common/PageHeader";
import PageBreadcrumb from "../common/PageBreadcrumb";
import PageBanner from "../common/PageBanner";
import { Layout } from "antd";
const { Header, Content } = Layout;

const StrategicPlanning: React.FC = () => {
  return (
    <>
      <Header style={{ backgroundColor: "#322C2C" }}>
        <PageHeader />
      </Header>
      <Content style={{ backgroundColor: "#fff" }}>
        <PageBreadcrumb />
        <PageBanner />
      </Content>
    </>
  );
};

export default StrategicPlanning;
