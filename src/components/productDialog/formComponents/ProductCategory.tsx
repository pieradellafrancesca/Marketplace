import { Product } from "@/components/products/columns";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useEffect } from "react";

const ProductCategory = ({
  selectedCategory,
  setSelectedCategory,
}: {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<Product["category"]>>;
}) => {
  const categories = [
    "Electronics",
    "Furniture",
    "Clothing",
    "Books",
    "Toys",
    "Beauty",
    "Sports",
    "Others",
  ];

  useEffect(() => {
    setSelectedCategory("Electronics");
  }, []);

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label className="text-slate-600">Product's category</Label>
      <Select
        value={selectedCategory}
        onValueChange={(value: string) =>
          setSelectedCategory(value as Product["category"])
        }
      >
        <SelectTrigger className="h-[45px] shadow-none">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProductCategory;
