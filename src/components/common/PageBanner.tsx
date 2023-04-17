import React from "react";
import TabsComponent from "./TabsComponent";

const PageBanner: React.FC = () => {
  return (
    <div className="banner-container">
      <div className="banner">
        <div className="banner-title">Configuration</div>
        <TabsComponent />
      </div>
    </div>
  );
};

export default PageBanner;
