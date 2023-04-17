import { Popconfirm } from "antd";

interface Props {
  title: string;
  description: string;
  onSubmit: () => void;
  children: React.ReactNode;
}

const CustomPopconfirm: React.FC<Props> = ({
  children,
  title,
  onSubmit,
  description,
}) => {
  const handleConfirm = () => {
    onSubmit();
  };
  return (
    <Popconfirm
      title={title}
      description={description}
      onConfirm={handleConfirm}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

export default CustomPopconfirm;
