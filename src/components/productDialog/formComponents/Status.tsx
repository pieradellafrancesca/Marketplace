import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dispatch, SetStateAction } from "react";
import { Check, Inbox, X } from "lucide-react";
import { Product } from "@/components/products/columns";

const Status = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<Product["status"]>>;
}) => {
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label className="text-slate-600">Status</Label>
      <Tabs
        value={selectedTab}
        onValueChange={(value: string) =>
          setSelectedTab(value as Product["status"])
        }
      >
        <TabsList className="h-11 px-2">
          <TabsTrigger
            value="Published"
            className={`flex items-center gap-1 ${
              selectedTab === "Published" ? "text-orange-500" : ""
            }`}
          >
            <Check />
            Published
          </TabsTrigger>
          <TabsTrigger
            value="Inactive"
            className={`flex items-center gap-1 ${
              selectedTab === "Inactive" ? "text-orange-500" : ""
            }`}
          >
            <X />
            Inactive
          </TabsTrigger>
          <TabsTrigger
            value="Draft"
            className={`flex items-center gap-1 ${
              selectedTab === "Draft" ? "text-orange-500" : ""
            }`}
          >
            <Inbox />
            Draft
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Status;
