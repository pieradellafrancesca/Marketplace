import { GitPullRequestDraft } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

type Category = {
  value: string;
  label: string;
};

type CategoryDropDownProps = {
  selectedCategories: string[];
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
};

const categories: Category[] = [
  { value: "electronics", label: "Electronics" },
  { value: "furniture", label: "Furniture" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books" },
  { value: "toys", label: "Toys" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports" },
  { value: "others", label: "Others" },
];

const CategoryDropDown = ({
  selectedCategories,
  setSelectedCategories,
}: CategoryDropDownProps) => {
  const [open, setOpen] = useState(false);

  const handleCheckbosChange = (value: string) => {
    setSelectedCategories((prev) => {
      const updatedCategories = prev.includes(value)
        ? prev.filter((category) => category !== value)
        : [...prev, value];

      return updatedCategories;
    });
  };

  const clearFilters = () => setSelectedCategories([]);

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-10">
            <GitPullRequestDraft />
            Categories
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-56" side="bottom" align="end">
          <Command className="p-1">
            <CommandInput placeholder="Category" />
            <CommandList>
              <CommandEmpty className="text-slate-500 text-sm text-center p-5">
                No category found.
              </CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem className="h-9" key={category.value}>
                    <Checkbox
                      checked={selectedCategories.includes(category.value)}
                      onClick={() => handleCheckbosChange(category.value)}
                      className="size-4 rounded-[4px]"
                    />
                    <div className="px-3 ">{category.label}</div>
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

export default CategoryDropDown;
