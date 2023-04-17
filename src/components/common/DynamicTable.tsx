import { Table } from "antd";

interface PropType {
  columns: [];
  dataSource: [];
}

const DynamicTable = ({ columns, dataSource }: PropType) => {
  return (
    <Table
      data-testid="events-table"
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default DynamicTable;
