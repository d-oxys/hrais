import { Button, Modal, ModalProps } from "antd";
import { useState } from "react";

interface DynamicModalProps extends ModalProps {
  isVisible: boolean;
  title: string;
  onHideModal: () => void;
  content?: any;
  className?: string;
}

const DynamicModal: React.FC<DynamicModalProps> = ({
  isVisible,
  title,
  content,
  onHideModal,
  className,
  ...rest
}) => {
  const [modalContent, setModalContent] = useState(
    "Initial content of the modal"
  );

  const showModal = () => {
    // Update modal content dynamically here
    // For example, fetching data from an API and then setting it as modal content
    setModalContent("Updated content of the modal");
  };

  const handleOk = () => {
    onHideModal();
  };

  const handleCancel = () => {
    onHideModal();
  };

  return (
    <Modal
      title={title}
      open={isVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      className={className}
      {...rest}
    >
      <p>{content}</p>
    </Modal>
  );
};

export default DynamicModal;
