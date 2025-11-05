import { useQuery } from "@tanstack/react-query";
import { getProjectsInWorkspaceQueryFn } from "@/lib/api";
import { AllProjectPayloadType } from "@/types/api.type";

export default function useGetProjects(payload: AllProjectPayloadType) {
  return useQuery({
    queryKey: ["projects", payload.workspaceId, payload.pageNumber, payload.pageSize],
    queryFn: () => getProjectsInWorkspaceQueryFn(payload),
    enabled: !!payload.workspaceId,
  });
}
