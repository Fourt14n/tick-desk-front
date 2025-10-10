import { useLoadingStore } from "@/store/LoadingStore";

export const useLoading = () => {
  const { setLoading } = useLoadingStore();
  return {
    showLoading: (message?: string) => setLoading(true, message),
    hideLoading: () => setLoading(false),
  };
};