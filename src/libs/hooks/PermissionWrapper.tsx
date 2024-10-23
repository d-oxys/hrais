import React from "react";
import { usePermissions } from "@root/libs/contexts/PermissionsContext";

interface PermissionWrapperProps {
  moduleName: string;
  functionName: string;
  action: "create" | "read" | "update" | "delete";
  children: React.ReactNode;
}

const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  moduleName,
  functionName,
  action,
  children,
}) => {
  const permissions = usePermissions();

  // Log the permissions for debugging purposes
  // console.log("Permissions in PermissionWrapper:", permissions);

  // Check if permissions exist for the specified module and function/action
  if (
    !permissions ||
    !permissions[moduleName] ||
    !permissions[moduleName][functionName] ||
    !permissions[moduleName][functionName][action]
  ) {
    return null;
  }

  return <>{children}</>;
};

export default PermissionWrapper;
