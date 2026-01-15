import {useState, useTransition} from "react";
import {toast} from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {DropdownMenu, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

type DeleteDataProps = {
  id: string;
  label: string;
  onDelete: (id: string) => Promise<{success?: boolean; error?: string} | void>;
};

export const DeleteData = ({label, onDelete, id}: DeleteDataProps) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result = await onDelete(id);

      if (result?.success) {
        toast.success(`deleted successfully : ${label}`);
        setOpen(false);
      }

      switch (result?.error) {
        case "USED":
          toast.warning(
            `${label} Failed to delete because it is still being used in a transaction.`
          );
          break;
        case "NOT_FOUND":
          toast.error(`${label} no longer found in the database.`);
          break;
        default:
          toast.error(`Terjadi kesalahan sistem saat menghapus. ${label}.`);
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="bg-red-600 hover:bg-red-700"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete .
              <strong> {label}</strong> and all will be saved permanently.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 hover:bg-red-700"
              disabled={isPending}
            >
              {isPending ? "Delete..." : "Delete Now"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
