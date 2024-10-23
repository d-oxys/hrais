import { Button, ButtonProps, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import useAccessControl from "@root/libs/hooks/useAccessControl";

interface AddButtonListProps extends ButtonProps {
  title?: string;
}

const AddButtonList = (props: AddButtonListProps) => {
  const route = useRouter();
  // const { hasAccessByUrl } = useAccessControl();
  const path = usePathname();
  return (
    <>
      {/* {hasAccessByUrl(path, "create") ? ( */}
      {/* props.title ? ( */}
      <Tooltip title={props.title}>
        <Button
          className="bg-[#D5D5D5] rounded-lg text-white cursor-pointer"
          {...props}
        >
          <PlusOutlined />
        </Button>
      </Tooltip>
      {/* ) : (
      <Button
        className="bg-[#D5D5D5] rounded-lg text-white cursor-pointer"
        {...props}
      >
        <PlusOutlined />
      </Button>
      )) : null} */}
    </>
  );
};
export default AddButtonList;
