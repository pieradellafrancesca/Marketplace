import {
  ComponentType,
  createContext,
  Dispatch,
  isValidElement,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { icons } from "./Icons";

export type SingleIcon = {
  id: number;
  icon: ReactNode;
  isSelected: boolean;
};

type IconContextType = {
  updateSelectedIcon: (icon: ReactNode) => void;
  openDialog: boolean;
  updateOpenDialog: (openDialog: boolean) => void;
  allIcons: SingleIcon[];
  setAllIcons: Dispatch<SetStateAction<SingleIcon[]>>;
  triggerIconSelection: (icon: string) => void;
};

// Context
const IconContext = createContext<IconContextType | undefined>(undefined);

// Provider Component
export const IconProvider = ({
  children,
  iconsArray,
  onUpdateIcon,
}: {
  children: ReactNode;
  iconsArray: SingleIcon[];
  onUpdateIcon: (selectedIcon: ReactNode) => void;
}) => {
  const [openDialog, updateOpenDialog] = useState(false);
  const [allIcons, setAllIcons] = useState<SingleIcon[]>(iconsArray);

  const updateSelectedIcon = (icon: ReactNode) => {
    onUpdateIcon(icon);
  };

  const triggerIconSelection = (icon: string) => {
    try {
      const iconNode = convertStringToIcon(icon, allIcons);
      if (iconNode) {
        const updateIcons = allIcons.map((singleIcon) => ({
          ...singleIcon,
          isSelected: singleIcon.icon === iconNode,
        }));
        setAllIcons(updateIcons);
        updateSelectedIcon(iconNode);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IconContext.Provider
      value={{
        updateSelectedIcon,
        openDialog,
        updateOpenDialog,
        allIcons,
        setAllIcons,
        triggerIconSelection,
      }}
    >
      {children}
    </IconContext.Provider>
  );
};

// Custom Hook
export const useIconContext = () => {
  const context = useContext(IconContext);
  if (!context) {
    throw new Error("useIconContext must be used within an IconProvider.");
  }
  return context;
};

// Utility functions
// -----------------

// Function to convert icon with a ReactNode type to a string
export function convertIconToString(icon: ReactNode): string | null {
  if (icon && (icon as ReactElement).type) {
    const iconType = (icon as ReactElement).type;
    if (typeof iconType === "function") {
      const iconName = (iconType as ComponentType).displayName || iconType.name;
      return iconName;
    }
  }
  return null;
}

// Function to convert the icon from a string to a React Node
export function convertStringToIcon(
  iconText: string,
  iconArray: SingleIcon[]
): ReactNode {
  if (!iconText || !iconArray) {
    throw new Error("Please set the icon text and the array of icons.");
  }
  for (const iconObj of iconArray) {
    const iconType = (iconObj.icon as ReactElement).type;
    if (typeof iconType === "function") {
      const iconName = iconType.name;
      if (iconText === iconName) {
        return iconObj.icon;
      }
    }
  }
  throw new Error(`Icon with text ${iconText} not found in the icon array.`);
}

// Icon Dialog Box Component
export const IconDialogBox = () => {
  const {
    updateSelectedIcon,
    openDialog,
    updateOpenDialog,
    allIcons,
    setAllIcons,
  } = useIconContext();

  function updateSelection(singleIconProp: SingleIcon) {
    setAllIcons((prev) =>
      prev.map((singleIcon) => {
        if (singleIcon.id === singleIconProp.id) {
          updateSelectedIcon(singleIcon.icon);
          updateOpenDialog(!openDialog);
          return { ...singleIcon, isSelected: true };
        }
        return { ...singleIcon, isSelected: false };
      })
    );
  }

  // Check first if the structure of the all icons array is right
  if (!isAllIconValid(allIcons)) {
    throw new Error("The allIcons array structure is invalid.");
  }

  function isAllIconValid(allIcons: unknown) {
    if (!Array.isArray(allIcons)) {
      throw new Error("Please provide an array.");
    }
    return allIcons.every(
      (icon) =>
        typeof icon.id === "number" &&
        typeof icon.isSelected === "boolean" &&
        isValidElement(icon.icon)
    );
  }

  return (
    <Dialog open={openDialog} onOpenChange={(open) => updateOpenDialog(open)}>
      <DialogTrigger asChild>
        <Button className="h-11">
          {allIcons.find((icon) => icon.isSelected)?.icon}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>
            Pick an icon to represent ypur content. You can update it anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full border rounded-lg p-3 flex flex-wrap gap-2 mt-5">
          {allIcons.map((singleIcon, index) => (
            <div
              key={index}
              onClick={() => updateSelection(singleIcon)}
              className={`border rounded-md p-3 hover:bg-primary hover:text-white ${
                singleIcon.isSelected
                  ? "bg-primary text-white border-none"
                  : "text-slate-400"
              }`}
            >
              {singleIcon.icon}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const IconSelector = ({
  onUpdateIcon,
}: {
  onUpdateIcon: (selectedIcon: ReactNode) => void;
}) => {
  function updateIcon(selectedIcon: ReactNode) {
    onUpdateIcon(selectedIcon);
  }

  return (
    <IconProvider iconsArray={icons} onUpdateIcon={updateIcon}>
      <ParentComponent />
    </IconProvider>
  );

  function ParentComponent({ iconToSelected }: { iconToSelected?: string }) {
    const { triggerIconSelection } = useIconContext();

    useEffect(() => {
      if (iconToSelected) {
        triggerIconSelection(iconToSelected);
      }
    }, [iconToSelected]);

    return <IconDialogBox />;
  }
};

export default IconSelector;
