import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getPurchasesOrders } from "../../services/apiPurchases";

function useGetPurchases(refetchPage) {
  const [searchParams] = useSearchParams();
  const status =
    searchParams.get("status") && searchParams.get("status").split("-");
  const page = refetchPage ? refetchPage : Number(searchParams.get("page")) || 1;

  const { isLoading, refetch, data, error } = useQuery({
    queryKey: ["purchacesList", status, page],
    queryFn: () => getPurchasesOrders({ page, status }),
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { isLoading, refetch, data, error };
}

export default useGetPurchases;
