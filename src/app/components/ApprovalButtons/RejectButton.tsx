import { Button, ButtonProps, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import useAccessControl from "@root/libs/hooks/useAccessControl";

interface RejectButtonProps extends ButtonProps {
  handleReject: () => void;
}

const RejectButton = (props: RejectButtonProps) => {
  const { hasAccessByUrl } = useAccessControl();
  const path = usePathname();

  const onReject = () => {
    if (props.handleReject) {
      props.handleReject();
    }
  };

  return (
    <>
      {hasAccessByUrl(path, "update") ? (
        <Popconfirm
          title="Reject data"
          description="Are you sure to reject this data?"
          onConfirm={(e) => onReject()}
          okText="Yes"
          cancelText="No"
        >
          <Button className="bg-danger/25 rounded-lg text-danger cursor-pointer">
            <CloseOutlined />
          </Button>
        </Popconfirm>
      ) : null}
    </>
  );
};
export default RejectButton;
