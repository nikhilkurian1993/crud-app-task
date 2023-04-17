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
      onRow={(record: any) => {
        return {
          "data-testid": "event-record",
          id: record.id,
        } as any;
      }}
    />
  );
};

export default DynamicTable;
