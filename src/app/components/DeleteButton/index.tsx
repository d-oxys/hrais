import { Button, ButtonProps, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import useAccessControl from "@root/libs/hooks/useAccessControl";

interface DeleteButtonProps extends ButtonProps {
  handleDelete: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  // const { hasAccessByUrl } = useAccessControl();
  const path = usePathname();

  const onDelete = () => {
    if (props.handleDelete) {
      props.handleDelete();
    }
  };

  return (
    <>
      {/* {hasAccessByUrl(path, "delete") ? ( */}
      <Popconfirm
        title="Delete data"
        description="Are you sure to delete this data?"
        onConfirm={(e) => onDelete()}
        okText="Yes"
        cancelText="No"
      >
        <Button className="bg-danger/25 rounded-lg text-danger cursor-pointer">
          <DeleteOutlined />
        </Button>
      </Popconfirm>
      {/* ) : null} */}
    </>
  );
};
export default DeleteButton;
