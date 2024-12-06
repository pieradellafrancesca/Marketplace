import { Label } from "@/components/ui/label";
import { TriangleAlert } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

const Price = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="price" className="text-slate-600">
        Price
      </Label>
      <Input
        {...register("price", { valueAsNumber: true })}
        id="price"
        className="h-11"
        placeholder="Price"
      />
      {errors.price && (
        <div className="text-red-500 flex gap-1 items-center text-[14px]">
          <TriangleAlert />
          <p>
            <>{errors.price.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

export default Price;
