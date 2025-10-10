import { BrowserRouter } from "react-router"
import Router from "./routes"
import { Toaster } from "sonner"
import { LoadingDialog } from "./components/Loading/Loading"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors={true} />
      <LoadingDialog></LoadingDialog>
      <Router />
    </BrowserRouter>
  )
}

export default App
