// File: hooks/usePermissions.tsx
import { useContext } from 'react';
import { PermissionsContext } from '../contexts/PermissionsContext'; // Pastikan konteks permissions sudah didefinisikan

export const usePermissions = () => {
  return useContext(PermissionsContext);
};
