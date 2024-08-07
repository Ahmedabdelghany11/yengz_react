import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../services/apiProjects";
import { useParams } from "react-router-dom";

export default function useGetProject() {
  const { id } = useParams();
  const { isLoading, data, error } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  return { isLoading, data, error };
}
