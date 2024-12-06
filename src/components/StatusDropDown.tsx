import { Check, GitPullRequestDraft, Inbox, X } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "./ui/command";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

type Status = {
  value: string;
  label: string;
  icon: ReactNode;
};

const statuses: Status[] = [
  {
    value: "Published",
    label: "Published",
    icon: <Check />,
  },
  {
    value: "Inactive",
    label: "Inactive",
    icon: <X />,
  },
  {
    value: "Draft",
    label: "Draft",
    icon: <Inbox />,
  },
];

type StatusDropDownProps = {
  selectedStatuses: string[];
  setSelectedStatuses: Dispatch<SetStateAction<string[]>>;
};

const StatusDropDown = ({
  selectedStatuses,
  setSelectedStatuses,
}: StatusDropDownProps) => {
  const [open, setOpen] = useState(false);

  const returnColor = (status: string) => {
    switch (status) {
      case "Published":
        return "text-green-600 bg-green-100";
      case "Inactive":
        return "text-red-600 bg-red-100";
      case "Draft":
        return "text-gray-600 bg-gray-100";

      default:
        break;
    }
  };

  const handleCheckboxChange = (value: string) => {
    setSelectedStatuses((prev) => {
      const updatedStatuses = prev.includes(value)
        ? prev.filter((status) => status !== value)
        : [...prev, value];

      return updatedStatuses;
    });
  };

  const clearFilters = () => setSelectedStatuses([]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="h-10">
            <GitPullRequestDraft />
            Status
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-48" side="bottom" align="center">
          <Command className="p-1">
            <CommandList>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem className="h-10 mb-2" key={status.value}>
                    <Checkbox
                      checked={selectedStatuses.includes(status.value)}
                      onClick={() => handleCheckboxChange(status.value)}
                      className="size-4 rounded-[4px] mr-2"
                    />
                    <div
                      className={`flex items-center gap-1 ${returnColor(
                        status.value
                      )} p-1 rounded-lg px-4`}
                    >
                      {status.icon}
                      {status.label}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <div className="flex flex-col gap-2">
              <Separator />
              <Button
                variant="ghost"
                className="text-[12px] mb-1"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default StatusDropDown;
