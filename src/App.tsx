import React from "react";
import { Layout } from "antd";
import StrategicPlanning from "./components/pages/StrategicPlanning";
import "antd/dist/reset.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Layout>
        <StrategicPlanning />
      </Layout>
    </div>
  );
}

export default App;
