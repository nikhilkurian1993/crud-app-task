import React, { ReactNode } from "react";
import { Modal } from "antd";

interface Props {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const CustomModal: React.FC<Props> = ({ isOpen, title, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Modal
        title={title}
        centered
        open={isOpen}
        footer={null}
        onCancel={handleClose}
        className="custom-modal"
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;
