import React, { useState, useCallback } from "react";
import { Button, Menu, Dropdown, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import SearchComponent from "../common/Search";
import DynamicForm, { Field } from "../common/DynamicForm";
import CustomModal from "../common/CustomModal";
import CustomPopconfirm from "../common/CustomPopconfirm";
import DynamicTable from "../common/DynamicTable";
import { useGetSchema } from "../../hooks/schema";
import { useGetEvent, useDeleteEvent } from "../../hooks/events";
import CustomSpinner from "../common/customSpinner";

const Events: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: schema,
    isLoading: isSchemaLoading,
    isSuccess: isSchemaSuccess,
  } = useGetSchema();
  const { data, isLoading, isSuccess } = useGetEvent(
    searchTerm,
    !!schema?.length
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [record, setRecord] = useState<Field>();
  const [type, setType] = useState("");
  const [recordId, setRecordId] = useState(null);
  const deleteEvent = useDeleteEvent();
  let column: any = [];

  const handleMenuClick = (key: string, record: any) => {
    setRecordId(record.id);
    if (key === "edit") {
      setType(key);
      setModalTitle("Edit Event");
      setIsModalOpen(true);
      setRecord(record);
    }
  };
  const handlePopSubmit = () => {
    deleteEvent.mutate(Number(recordId));
  };
  const handleAddEvent = () => {
    setModalTitle("CREATE EVENT");
    setIsModalOpen(true);
    setRecord(undefined);
    setType("add");
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  schema?.forEach((filed: Field) => {
    const { name, label } = filed;
    if (typeof name === "string") {
      if (name == "type") {
        let obj = {
          title: label,
          key: name,
          dataIndex: name,
          sorter: (a: any, b: any) => a.title.localeCompare(b.name),
          render: (type: string) => {
            const color = type === "generic" ? "orange" : "green";
            return <Tag color={color}>{type}</Tag>;
          },
        };
        column.push(obj);
      } else {
        let obj = {
          title: label,
          key: name,
          dataIndex: name,
          sorter: (a: any, b: any) => a.title.localeCompare(b.name),
        };
        column.push(obj);
      }
    } else {
      name?.forEach((item: string) => {
        let title;
        if (item.indexOf("start") === 0) {
          title = "Start Date";
        } else {
          title = "End Date";
        }
        let obj = {
          title,
          key: item,
          dataIndex: item,
        };

        column.push(obj);
      });
    }
  });

  column.push({
    title: "Action",
    key: "action",
    render: (record: Field) => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => handleMenuClick(key, record)}>
            <Menu.Item key="edit">Edit Event</Menu.Item>
            <CustomPopconfirm
              title="Delete the event"
              description="Are you sure to delete this event?"
              onSubmit={handlePopSubmit}
              children={<Menu.Item key="delete">Delete</Menu.Item>}
            />
          </Menu>
        }
        trigger={["click"]}
      >
        <EllipsisOutlined style={{ fontSize: 20 }} />
      </Dropdown>
    ),
  });

  return (
    <>
      <div className="content-header">
        <div className="search-container">
          <SearchComponent onSearch={handleSearch} />
        </div>
        <Button onClick={handleAddEvent} className="btn-primary">
          Add Event
        </Button>
      </div>
      {isLoading ? <CustomSpinner isLoading={isLoading} /> : null}
      {data ? <DynamicTable columns={column} dataSource={data} /> : null}
      <CustomModal
        isOpen={isModalOpen}
        title={modalTitle}
        onClose={closeModal}
        children={
          <DynamicForm
            schema={schema}
            onClose={closeModal}
            record={record}
            type={type}
          />
        }
      ></CustomModal>
    </>
  );
};

export default Events;
