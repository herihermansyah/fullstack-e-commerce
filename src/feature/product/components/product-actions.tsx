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
import {deleteProduct} from "../action/deleteProduct.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {MoreHorizontalIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import { ProductType } from "../types/product.type";

export const ProductAction = ({product}: {product: ProductType}) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProduct(product.id);
      if (result?.success) {
        toast.success("The product has been successfully deleted.");
        setOpen(false);
      } else {
        toast.error(result?.error || "Product failed to delete.");
      }
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="text-red-600 cursor-pointer"
          >
            Delete Product
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-purple-600 cursor-pointer"
            onClick={() => router.push(`/admin/${product.id}/productdetail`)}
          >
            View Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are You Sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the product.
              <strong> {product.title}</strong> and all the images will be saved
              permanently.
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
