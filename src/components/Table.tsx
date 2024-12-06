import ProductTable from "@/components/products/ProductTable";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { columns } from "@/components/products/columns";
import ProductDialog from "./productDialog/ProductDialog";
import { useProductStore } from "@/stores/useProductStore";
import { useEffect } from "react";

const Table = () => {
  const { allProducts, loadProducts } = useProductStore();

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Card className="mt-12 flex flex-col shadow-none border-none">
      <CardHeader className="flex justify-between p-2">
        <div className="flex justify-between items-center">
          <div className="">
            <CardTitle className="font-bold text-[23px]">Products</CardTitle>
            <p className="text-sm text-slate-600">
              {allProducts.length} products
            </p>
          </div>
          <ProductDialog />
        </div>
      </CardHeader>
      <CardContent>
        <ProductTable data={allProducts} columns={columns} />
      </CardContent>
    </Card>
  );
};

export default Table;
