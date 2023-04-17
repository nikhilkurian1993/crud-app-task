import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

interface searchProp {
  onSearch: (key: string) => void;
}

const SearchComponent: React.FC<searchProp> = ({ onSearch }) => {
  const [searchKey, setSearchKey] = useState("");
  const handleSearch = () => {
    onSearch(searchKey);
  };

  return (
    <Search
      size="large"
      placeholder="Search event"
      allowClear
      onSearch={handleSearch}
      onChange={(e) => setSearchKey(e.target.value)}
      className="search-box"
    />
  );
};

export default SearchComponent;
