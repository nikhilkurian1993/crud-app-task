import { message, Popconfirm } from "antd";
const confirm = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.success("Click on Yes");
};

const cancel = (e: React.MouseEvent<HTMLElement>) => {
  console.log(e);
  message.error("Click on No");
};
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
      //onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

export default CustomPopconfirm;
