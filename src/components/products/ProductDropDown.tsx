import { Row } from "@tanstack/react-table";
import { Product } from "./columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Ellipsis, FilePenLine, Trash } from "lucide-react";
import { useProductStore } from "@/stores/useProductStore";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";

type MenuItem = {
  icon: JSX.Element;
  label: string;
  className: string;
  separator?: undefined;
};

const ProductDropDown = ({ row }: { row: Row<Product> }) => {
  const {
    addProduct,
    setSelectedProduct,
    setOpenDialog,
    setOpenProductDialog,
  } = useProductStore();
  const { toast } = useToast();
  const menuItems: MenuItem[] = [
    { icon: <Copy />, label: "Copy", className: "" },
    { icon: <FilePenLine />, label: "Edit", className: "" },

    { icon: <Trash />, label: "Delete", className: "text-red-600" },
  ];

  async function handleClickedItem(item: MenuItem) {
    if (item.label === "Delete") {
      setOpenDialog(true);
      setSelectedProduct(row.original);
    }

    if (item.label === "Copy") {
      const productToCopy: Product = {
        ...row.original,
        id: nanoid(),
        name: `${row.original.name} (copy)`,
        createdAt: new Date(),
      };

      const result = await addProduct(productToCopy);

      if (result) {
        toast({
          variant: "success",
          title: "Copy successfully!",
          description: "Product has been copied successfully.",
        });
      }
    }
    if (item.label === "Edit") {
      setOpenProductDialog(true);
      setSelectedProduct(row.original);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {menuItems.map((item, index) =>
          item.separator ? (
            <DropdownMenuSeparator key={index} />
          ) : (
            <DropdownMenuItem
              key={index}
              className={`flex items-center gap-1 p-[10px] ${item.className}`}
              onClick={() => handleClickedItem(item)}
            >
              {item.icon}
              <span>{item.label}</span>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProductDropDown;
