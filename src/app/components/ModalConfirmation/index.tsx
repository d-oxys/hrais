import React from "react";
import { Modal, Button } from "antd";

interface ModalConfirmationProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      open={visible}
      title="Confirmation"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={onOk}>
          OK
        </Button>,
      ]}
    >
      Are you sure you want to proceed?
    </Modal>
  );
};

export default ModalConfirmation;
