import { useQuery } from "@tanstack/react-query";
import { getMembersInWorkspaceQueryFn } from "@/lib/api";

export default function useGetWorkspaceMembers(workspaceId: string) {
  return useQuery({
    queryKey: ["workspace-members", workspaceId],
    queryFn: () => getMembersInWorkspaceQueryFn(workspaceId),
    enabled: !!workspaceId,
  });
}
