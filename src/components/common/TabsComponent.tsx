import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import TabContent from "./TabContent";
import Events from "../pages/Events";

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Dropdowns`,
    children: <TabContent />,
  },
  {
    key: "2",
    label: `Templates`,
    children: <TabContent />,
  },
  {
    key: "3",
    label: `Tab Events`,
    children: (
      <TabContent>
        <Events />
      </TabContent>
    ),
  },
];

const TabsComponent: React.FC = () => (
  <Tabs
    defaultActiveKey="3"
    items={items}
    onChange={onChange}
    className="tabs-style"
  />
);

export default TabsComponent;
