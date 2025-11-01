import { BrowserRouter } from "react-router"
import Router from "./routes"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";


const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <BrowserRouter>
            <Toaster position="top-right" richColors={true} />
            <Router />
          </BrowserRouter>
      </PrimeReactProvider>
    </QueryClientProvider>
 
  )
}

export default App
