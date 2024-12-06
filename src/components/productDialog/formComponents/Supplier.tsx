import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TriangleAlert } from "lucide-react";
import { useFormContext } from "react-hook-form";

const Supplier = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="supplier-name" className="text-slate-600">
        Supplier's name
      </Label>
      <Input
        {...register("supplier")}
        type="text"
        id="supplier-name"
        className="h-11 shadow-none"
        placeholder="TechWorld..."
      />
      {errors.supplier && (
        <div className="text-red-500 flex gap-1 items-center text-[14px]">
          <TriangleAlert />
          <p>
            <>{errors.supplier.message}</>
          </p>
        </div>
      )}
    </div>
  );
};

export default Supplier;
