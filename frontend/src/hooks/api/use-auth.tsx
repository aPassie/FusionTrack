import { useQuery } from "@tanstack/react-query";
import { getCurrentUserQueryFn } from "@/lib/api";

export default function useAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: getCurrentUserQueryFn,
    retry: false,
    refetchOnWindowFocus: false,
  });
}
