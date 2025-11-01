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
export function showLoading(message: any, promisse: Promise<any>){
    toast.promise(promisse, {
        loading: message,
        success: (data) => data,
        error: (data) => data
    })
}   
export function showAlert(message: any){
    toast.warning(message);
}   