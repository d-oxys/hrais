import { Button, ButtonProps } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import useAccessControl from "@root/libs/hooks/useAccessControl";

interface EditButtonProps extends ButtonProps {
  destinationPage?: string;
}

const EditButton = (props: EditButtonProps) => {
  const route = useRouter();
  // const { hasAccessByUrl } = useAccessControl();
  const path = usePathname();
  return (
    <>
      {/* {hasAccessByUrl(path, "update") ? ( */}
      <Button
        className="bg-primary/25  rounded-lg text-primary cursor-pointer"
        onClick={() =>
          props.destinationPage && route.push(props.destinationPage)
        }
        // {...props}
      >
        <FormOutlined />
      </Button>
      {/* ) : null} */}
    </>
  );
};
export default EditButton;
