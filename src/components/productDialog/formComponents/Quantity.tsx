import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";

const Quantity = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="quantity" className="text-slate-600">
        Quantity
      </Label>
      <Input
        {...register("quantity", { valueAsNumber: true })}
        type="text"
        id="quantity"
        className="h-11 shadow-none"
        placeholder="34"
      />
      {errors.quantity && (
        <div className="text-red-500 flex gap-1 items-center text-[14px]">
          <TriangleAlert />
          <p>
            <>{errors.quantity.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

export default Quantity;
