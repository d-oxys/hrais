import { Button, ButtonProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import useAccessControl from "@root/libs/hooks/useAccessControl";

interface AddButtonProps extends ButtonProps {
  destinationPage: string;
  label: string;
}

const AddButton = (props: AddButtonProps) => {
  const route = useRouter();
  const { hasAccessByUrl } = useAccessControl();
  const path = usePathname();
  return (
    <>
      {hasAccessByUrl(path, "create") ? (
        <Button
          onClick={() => route.push(props.destinationPage)}
          type="primary"
          className="rounded-full"
        >
          {props.label} <PlusOutlined />
        </Button>
      ) : null}
    </>
  );
};

export default AddButton;
