import { showError } from "./useToast";

export const onError = (errors: any) => {
    
        // Pega o primeiro erro que encontrar
        const firstError = Object.values(errors)[0] as any;
        
        showError(firstError?.message);
    };