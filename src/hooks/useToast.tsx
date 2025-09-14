import { toast } from "sonner";

export function showError(message : any){
    toast.error(message, {
        closeButton: false
    });
    
}