import { create } from 'zustand';

// Store para controlar o loading global
interface LoadingStore {
  isLoading: boolean;
  message: string;
  setLoading: (loading: boolean, message?: string) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  message: 'Carregando...',
  setLoading: (loading, message = 'Carregando...') => 
    set({ isLoading: loading, message }),
}));