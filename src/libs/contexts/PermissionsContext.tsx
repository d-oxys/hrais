// File: contexts/PermissionsContext.tsx
import React, { createContext, useContext } from 'react';

const PermissionsContext = createContext<any>(null);

export const PermissionsProvider = ({ children, value }: { children: React.ReactNode; value: any }) => {
  return <PermissionsContext.Provider value={value}>{children}</PermissionsContext.Provider>;
};

export const usePermissions = () => {
  return useContext(PermissionsContext);
};
