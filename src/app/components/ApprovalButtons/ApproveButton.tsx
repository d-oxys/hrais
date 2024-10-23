import { Button, ButtonProps, Popconfirm } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import useAccessControl from "@root/libs/hooks/useAccessControl";

interface ApproveButtonProps extends ButtonProps {
  handleApprove: () => void;
}

const ApproveButton = (props: ApproveButtonProps) => {
  const { hasAccessByUrl } = useAccessControl();
  const path = usePathname();

  const onApprove = () => {
    if (props.handleApprove) {
      props.handleApprove();
    }
  };

  return (
    <>
      {hasAccessByUrl(path, "update") ? (
        <Popconfirm
          title="Approve data"
          description="Are you sure to approve this data?"
          onConfirm={(e) => onApprove()}
          okText="Yes"
          cancelText="No"
        >
          <Button className="bg-active/25 rounded-lg text-active cursor-pointer">
            <CheckOutlined />
          </Button>
        </Popconfirm>
      ) : null}
    </>
  );
};
export default ApproveButton;
