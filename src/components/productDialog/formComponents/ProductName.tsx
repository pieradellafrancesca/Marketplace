import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import IconSelector from "../IconSelector";
import { TriangleAlert } from "lucide-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

const ProductName = ({
  onSelectedIcon,
}: {
  onSelectedIcon: (selectedIcon: ReactNode) => void;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getSelectedIcon = (selectedIcon: ReactNode) => {
    onSelectedIcon(selectedIcon);
  };

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="product-name" className="text-slate-600">
        Product's name
      </Label>
      <div className="flex gap-2 items-center">
        <Input
          {...register("productName")}
          type="text"
          id="product-name"
          className="h-11 shadow-none"
          placeholder="Laptop..."
        />
        <IconSelector onUpdateIcon={getSelectedIcon} />
      </div>
      {errors.productName && (
        <div className="text-red-500 flex gap-1 items-center text-[14px]">
          <TriangleAlert />
          <p>
            <>{errors.productName.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductName;
