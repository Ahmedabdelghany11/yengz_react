import { getCategories } from "../../services/apiCategories";
import { useQuery } from "@tanstack/react-query";

function useCategoriesList() {
  const { isLoading, data, error } = useQuery({
    queryKey: ["categoryList"],
    queryFn: getCategories,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, data, error };
}

export default useCategoriesList;
