import { toast } from "sonner";

export function showError(message : any){
    toast.error(message, {
        closeButton: false
    });
}
export function showSucces(message : any){
    toast.success(message, {
        closeButton: false
    });
}