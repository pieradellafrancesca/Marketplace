import { ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import Price from "./formComponents/Price";
import ProductCategory from "./formComponents/ProductCategory";
import ProductName from "./formComponents/ProductName";
import Quantity from "./formComponents/Quantity";
import Sku from "./formComponents/SKU";
import Status from "./formComponents/Status";
import Supplier from "./formComponents/Supplier";
import { Product } from "../products/columns";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useToast } from "@/hooks/use-toast";
import { useProductStore } from "@/stores/useProductStore";
import { icons } from "./Icons";

const ProductSchema = z.object({
  productName: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name must be 100 characters or less"),
  sku: z
    .string()
    .min(1, "SKU is required")
    .regex(/^[a-zA-Z0-9-_]+$/, "SKU must be alphanumeric"),
  supplier: z
    .string()
    .min(1, "Supplier is required")
    .max(100, "Supplier name must be 100 characters or less"),
  quantity: z
    .number()
    .int("Quantity must be an integer")
    .nonnegative("Quantity cannot be negative"),
  price: z
    .union([z.string(), z.number()])
    .refine((val) => val !== "", {
      message: "Price is required",
    })
    .transform((val) => {
      if (val === "") return undefined;
      const num = Number(val);
      return Number(num.toFixed(2));
    })
    .pipe(
      z
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a number",
        })
        .nonnegative("Price cannot be negative")
    ),
});

type ProductFormData = z.infer<typeof ProductSchema>;

const ProductDialog = () => {
  const methods = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      productName: "",
      sku: "",
      supplier: "",
      quantity: 0,
      price: 0.0,
    },
  });

  const { reset } = methods;

  const [selectedTab, setSelectedTab] =
    useState<Product["status"]>("Published");
  const [selectedCategory, setSelectedCategory] =
    useState<Product["category"]>("Electronics");
  const [selectedIcon, setSelectedIcon] = useState<null | ReactNode>(
    icons.find((icon) => icon.isSelected === true)?.icon
  );

  const {
    addProduct,
    isLoading,
    openProductDialog,
    setOpenProductDialog,
    selectedProduct,
    setSelectedProduct,
    updateProduct,
  } = useProductStore();
  const { toast } = useToast();
  const dialogCloseRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      reset({
        productName: selectedProduct.name,
        sku: selectedProduct.sku,
        supplier: selectedProduct.supplier,
        quantity: selectedProduct.quantityInStock,
        price: selectedProduct.price,
      });
      setSelectedTab(selectedProduct.status);
      setSelectedCategory(selectedProduct.category);
      setSelectedIcon(selectedProduct.icon);
    } else {
      reset({
        productName: "",
        sku: "",
        supplier: "",
        quantity: 0,
        price: 0.0,
      });
      setSelectedTab("Published");
      setSelectedCategory("Electronics");
    }
  }, [selectedProduct, openProductDialog]);

  const onSubmit = async (data: ProductFormData) => {
    console.log("Submitted data", data);

    if (!selectedProduct) {
      const newProduct: Product = {
        id: nanoid(),
        supplier: data.supplier,
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon,
        createdAt: new Date(),
      };

      const result = await addProduct(newProduct);

      if (result) {
        toast({
          variant: "success",
          title: "Success",
          description: "Product added successfully!",
        });
        dialogCloseRef.current?.click();
      }
    } else {
      const productToUpdate: Product = {
        id: selectedProduct.id,
        supplier: data.supplier,
        name: data.productName,
        price: data.price,
        quantityInStock: data.quantity,
        sku: data.sku,
        status: selectedTab,
        category: selectedCategory,
        icon: selectedIcon,
        createdAt: selectedProduct.createdAt,
      };

      const result = await updateProduct(productToUpdate);
      if (result.success) {
        toast({
          variant: "success",
          title: "Success",
          description: "Product updated successfully!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong while updating the product.",
        });
      }
    }
  };

  const handleReset = () => {
    reset();
    setSelectedProduct(null);
  };

  const onSelectedIcon = (icon: ReactNode) => {
    console.log(icon);

    // Ensuring that the state update happens outside of render flow
    setTimeout(() => {
      setSelectedIcon(icon);
    }, 0);
  };

  return (
    <Dialog open={openProductDialog} onOpenChange={setOpenProductDialog}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="p-7 px-8 max-w-5xl w-full">
        <DialogHeader>
          <DialogTitle className="text-[22px]">
            {selectedProduct ? "Edit Product" : "Add Product"}
          </DialogTitle>
          <DialogDescription>
            Fill in the form to add a new product
          </DialogDescription>
        </DialogHeader>
        <Separator />

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mt-1">
              <div className="grid grid-cols-2 gap-7">
                <ProductName onSelectedIcon={onSelectedIcon} />
                <Sku />
              </div>
              <div className="grid grid-cols-2 gap-5 items-start mt-4">
                <Supplier />
                <ProductCategory
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-lg:gap-1 max-sm:grid-cols-1">
                <Status
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                />
                <Quantity />
                <Price />
              </div>
            </div>

            <DialogFooter className="mt-9 mb-4 flex items-center gap-4 ">
              <DialogClose asChild ref={dialogCloseRef} onClick={handleReset}>
                <Button variant="secondary" className="h-11 px-11">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="h-11 px-11">
                {isLoading
                  ? "loading..."
                  : ` ${selectedProduct ? "Edit" : "Add"}`}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
