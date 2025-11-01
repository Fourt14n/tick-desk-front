import { showError } from "./useToast";

export const onError = (errors: any) => {
    console.log("erros", errors)
        // Pega o primeiro erro que encontrar
        const firstError = Object.values(errors)[0] as any;
        console.log("firstError", firstError)
        showError(firstError?.message);
    };