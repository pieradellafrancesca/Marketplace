import { ColumnDef } from "@tanstack/react-table";
import { Check, Inbox, X } from "lucide-react";
import { ReactNode } from "react";
import ProductDropDown from "./ProductDropDown";

import { SortableHeader } from "./SortableHeader";

export type Product = {
  id: string;
  name: string;
  supplier: string;
  sku: string;
  category:
    | "Electronics"
    | "Furniture"
    | "Clothing"
    | "Books"
    | "Toys"
    | "Beauty"
    | "Sports"
    | "Others";
  status: "Published" | "Inactive" | "Draft";
  quantityInStock: number;
  price: number;
  icon: ReactNode;
  createdAt: Date;
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",

    cell: ({ row }) => {
      const Icon = row.original.icon;
      const name = row.original.name;
      return (
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-sm text-primary bg-primary/10">
            {Icon}
          </div>
          <span>{name}</span>
        </div>
      );
    },
    header: ({ column }) => <SortableHeader column={column} label="Name" />,
  },
  {
    accessorKey: "sku",
    header: ({ column }) => <SortableHeader column={column} label="SKU" />,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <SortableHeader column={column} label="Created At" />
    ),
    cell: ({ getValue }) => {
      const date = getValue<Date>();
      return (
        <span>
          {date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <SortableHeader column={column} label="Price" />,
    cell: ({ getValue }) => `${getValue<number>().toFixed(2)}`,
  },
  {
    accessorKey: "category",
    filterFn: "multiSelect",
    header: ({ column }) => <SortableHeader column={column} label="Category" />,
  },
  {
    accessorKey: "status",
    filterFn: "multiSelect",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass;
      let icon: ReactNode;

      switch (status) {
        case "Published":
          colorClass = "text-green-600 bg-green-100";
          icon = <Check />;
          break;
        case "Draft":
          colorClass = "text-gray-600 bg-gray-200";
          icon = <Inbox />;
          break;
        case "Inactive":
          colorClass = "text-red-600 bg-red-100";
          icon = <X />;
          break;
        default:
          colorClass = "text-gray-600 bg-gray-200";
          icon = <Inbox />;
      }

      return (
        <span
          className={`px-3 py-[2px] flex items-center gap-1 ${colorClass} rounded-full w-fit`}
        >
          {icon}
          <span>{status}</span>
        </span>
      );
    },
  },
  {
    accessorKey: "quantityInStock",
    header: ({ column }) => (
      <SortableHeader column={column} label="Quantity In Stock" />
    ),
  },
  {
    accessorKey: "supplier",
    header: ({ column }) => <SortableHeader column={column} label="Supplier" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ProductDropDown row={row} />;
    },
  },
];
