import { useParams } from "react-router-dom";

const useWorkspaceId = () => {
  const { workspaceId } = useParams();
  return workspaceId as string;
};

export default useWorkspaceId;
