import type { LoginCredentials } from "@/pages/Login/Login";
import { AlertCircle, X } from "lucide-react";
import { toast } from "sonner"

function showError(message : string){
    toast.error(message, {
        closeButton: false
    });
}

export default function useAuth({email, password} : LoginCredentials){
    console.log(email);
    console.log(password);
    showError("Testando");
}