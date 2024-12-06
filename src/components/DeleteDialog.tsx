import { useProductStore } from "@/stores/useProductStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const DeleteDialog = () => {
  const { toast } = useToast();
  const {
    isLoading,
    deleteProduct,
    openDialog,
    selectedProduct,
    setOpenDialog,
    setSelectedProduct,
  } = useProductStore();

  async function deleteProductFx() {
    if (selectedProduct) {
      const result = await deleteProduct(selectedProduct.id);
      if (result) {
        toast({
          variant: "success",
          title: "Product Deleted",
          description: `The product [${selectedProduct.name}] has been deleted successfully!`,
        });
      }
    }
  }

  return (
    <AlertDialog open={openDialog} onOpenChange={(open) => setOpenDialog(open)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setSelectedProduct(null)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteProductFx}>
            {isLoading ? "deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
