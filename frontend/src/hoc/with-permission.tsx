import { PermissionType } from "@/constant";
import { usePermissions } from "@/hooks/use-permissions";
import { ReactNode } from "react";

const WithPermission = ({
  permission,
  children,
  fallback = null,
}: {
  permission: PermissionType;
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default WithPermission;
