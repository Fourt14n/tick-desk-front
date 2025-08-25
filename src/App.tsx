import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

function App() {

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>Abrir Modal</DialogTrigger>
          <DialogContent>
            <DialogTitle>Teste com modal no SHADCN</DialogTitle>
            <DialogDescription>
              Testando o modal aqui vamos ver se fica bom
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}

export default App
