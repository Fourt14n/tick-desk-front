import { BrowserRouter } from "react-router"
import Router from "./routes"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient();


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
          <Toaster position="top-right" richColors={true} />
          <Router />
        </BrowserRouter>
    </QueryClientProvider>
 
  )
}

export default App
