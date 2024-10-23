import * as AntdIcons from "@ant-design/icons";
import { FC } from "react";

const menuIcon = (iconName: string) => {
  const IconComponent = AntdIcons[
    iconName as keyof typeof AntdIcons
  ] as FC<any>;

  return IconComponent ? <IconComponent /> : null;
};

export default menuIcon;
