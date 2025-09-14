import { BrowserRouter } from "react-router"
import Router from "./routes"
import { Toaster } from "sonner"

function App() {

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors={true} />
      <Router />
    </BrowserRouter>
  )
}

export default App
