// hooks/useAccessControl.js

const useAccessControl = () => {
  const roles: any = JSON.parse(localStorage.getItem("roles") ?? "[]");

  const hasAccessByUrl = (functionUrl: string, operation: string) => {
    if (!roles) {
      return false;
    }

    for (const role of roles) {
      if (role && role.functions) {
        for (const func of role.functions) {
          if (func.url === functionUrl && func.role) {
            return !!func.role[operation];
          }
        }
      }
    }
    return true;
  };

  return { hasAccessByUrl };
};

export default useAccessControl;
