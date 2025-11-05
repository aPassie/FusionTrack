import { PermissionType } from "@/constant";
import useAuth from "./api/use-auth";
import useGetWorkspace from "./api/use-get-workspace";
import { useWorkspaceId } from "./use-workspace-id";

export const usePermissions = () => {
  const { data: authData } = useAuth();
  const workspaceId = useWorkspaceId();
  const { data: workspaceData } = useGetWorkspace(workspaceId);

  const userId = authData?.user._id;
  const workspace = workspaceData?.workspace;

  const member = workspace?.members.find((m) => m.userId === userId);
  const permissions = member?.role?.permissions || [];

  const hasPermission = (permission: PermissionType): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList: PermissionType[]): boolean => {
    return permissionList.some((permission) => permissions.includes(permission));
  };

  const hasAllPermissions = (permissionList: PermissionType[]): boolean => {
    return permissionList.every((permission) => permissions.includes(permission));
  };

  return {
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};
