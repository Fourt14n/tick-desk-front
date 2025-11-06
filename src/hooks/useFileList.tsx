import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState, type JSX } from "react";

export default function useFileList() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: '',
    description: (
      <div>
        <p>Sem arquivos para listar.</p>
      </div>
    ),
    variant: 'default' as 'default' | 'destructive'
  });

  const open = (params: {
    title: string;
    description?: JSX.Element;
    variant?: 'default' | 'destructive';
  }) => {
    setConfig({
      title: params.title,
      description: params.description || <p>Sem arquivos para listar</p>,
      variant: params.variant || 'default'
    });
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  // JSX que será renderizado
  const DialogComponent = (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          {config.description && (
            <DialogDescription>{config.description}</DialogDescription>
          )}
        </AlertDialogHeader>
        <DialogFooter>
          <button 
            onClick={close}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
          >
            Fechar
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return {
    open,
    close,
    DialogComponent // ← Retorna o JSX pronto
  };
}