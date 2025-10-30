import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRef, useState, type JSX } from "react";

export default function useFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: '',
    description: '',
    body: <></>,
    onConfirm: () => {},
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    variant: 'default' as 'default' | 'destructive',
  });

  const open = (params: {
    title: string;
    description: string
    body: JSX.Element;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'default' | 'destructive';
  }) => {
    setConfig({
      title: params.title,
      body: params.body,
      description: params.description,
      onConfirm: params.onConfirm,
      confirmText: params.confirmText || 'Confirmar',
      cancelText: params.cancelText || 'Cancelar',
      variant: params.variant || 'default',
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
        <DialogHeader>
          {config.body}
        </DialogHeader>
        <DialogFooter>
          <button 
            onClick={close}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer"
          >
            {config.cancelText}
          </button>
          <button 
          onClick={config.onConfirm}
          type="button"
            className={`px-4 py-2 rounded text-[#135C04] cursor-pointer ${
              config.variant === 'destructive' 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-(--weakGreen) hover:bg-(--mediumGreen)'
            }`}
          >
            {config.confirmText}
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