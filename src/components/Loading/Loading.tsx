import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useLoadingStore } from '@/store/LoadingStore';
import { Loader2 } from 'lucide-react';

export function LoadingDialog() {
  const { isLoading, message } = useLoadingStore();

  return (
    <Dialog open={isLoading}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <div className="flex flex-col items-center gap-4 py-6">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium">{message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}