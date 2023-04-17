import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Select, DatePicker, Alert } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { RangeValue } from "rc-picker/lib/interface";
import CustomSpinner from "./customSpinner";
import { InboxOutlined } from "@ant-design/icons";
import { usePostEvent, useUpdateEvent } from "../../hooks/events";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export interface Field {
  name: string | string[];
  label: string;
  component: "text" | "select" | "textarea" | "range_picker";
  required?: boolean;
  options?: {
    label: string;
    value: string;
  }[];
}

interface Props {
  schema: Field[];
  record?: any;
  onClose: () => void;
  type: string | undefined;
}

const DynamicForm: React.FC<Props> = ({ schema, onClose, record, type }) => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isError, setIsError] = useState(false);
  const [form] = Form.useForm<FormData>();
  const { mutate, isLoading } = usePostEvent();
  const update = useUpdateEvent();

  React.useEffect(() => {
    form.resetFields();
    form.setFieldsValue(record);
    if (type == "edit") {
      const rangePickerData: any = {
        rangePicker: [dayjs(record.startDate), dayjs(record.endDate)],
      };
      form.setFieldsValue(rangePickerData);
    }
  }, [form, record]);

  const onFinish = (values: FormData) => {
    setIsError(false);
    let event = { ...values, startDate, endDate };

    if (type === "edit") {
      update.mutate(
        { ...event, id: record.id },
        {
          onSuccess: () => {
            queryClient.refetchQueries();
            form.resetFields();
            onClose();
            message.success("Event updated");
          },
        }
      );
    } else {
      mutate(event, {
        onSuccess: () => {
          queryClient.refetchQueries();
          form.resetFields();
          onClose();
          message.success("New event added");
        },
      });
    }
  };

  const handleDateChange = (dates: RangeValue<Dayjs>) => {
    const startDate = dates && dates[0] ? dates[0].format("YYYY-MM-DD") : "";
    const endDate = dates && dates[1] ? dates[1].format("YYYY-MM-DD") : "";
    setStartDate(startDate);
    setEndDate(endDate);
    console.log(startDate, endDate);
  };

  const handleFinishFailed = (error: any) => {
    setIsError(true);
  };

  return (
    <>
      <Form
        data-testid="add-event-form"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={handleFinishFailed}
        autoComplete="off"
      >
        {schema.map((field) => {
          switch (field.component) {
            case "text":
              return (
                <Form.Item
                  key={field.name as string}
                  name={field.name}
                  label={field.label}
                  rules={[
                    {
                      required: field.required,
                      message: `Required`,
                    },
                  ]}
                >
                  <Input
                    suffix={<InboxOutlined />}
                    size="large"
                    placeholder={`Enter your ${field.label}`}
                  />
                </Form.Item>
              );
            case "select":
              return (
                <Form.Item
                  key={field.name as string}
                  name={field.name}
                  label={field.label}
                  rules={[
                    {
                      required: field.required,
                      message: `Required`,
                    },
                  ]}
                >
                  <Select size="large">
                    {field.options?.map((option) => (
                      <Select.Option value={option.value} key={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              );
            case "range_picker":
              return (
                <Form.Item
                  key={field.name[0]}
                  name="rangePicker"
                  label={field.label}
                  rules={[
                    {
                      required: field.required,
                      message: `Required`,
                    },
                  ]}
                >
                  <RangePicker
                    key="range"
                    size="large"
                    style={{ width: "100%" }}
                    onChange={handleDateChange}
                  />
                </Form.Item>
              );
            case "textarea":
              return (
                <Form.Item
                  key={field.name as string}
                  name={field.name}
                  label={field.label}
                  rules={[
                    {
                      required: field.required,
                      message: `Please input your ${field.label}`,
                    },
                  ]}
                >
                  <TextArea size="large" key="area" />
                </Form.Item>
              );
            default:
              return null;
          }
        })}
        {isError ? (
          <div className="alert-container">
            <Alert
              message="There are errors in the form. Please correct before saving"
              type="error"
            />
          </div>
        ) : null}

        <div className="button-container">
          <Button type="text" className="btn-secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" className="btn-primary">
            Submit
          </Button>
        </div>
        <></>
      </Form>
      <CustomSpinner isLoading={isLoading} />
    </>
  );
};

export default DynamicForm;
