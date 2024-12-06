import { Bird } from "lucide-react";

const AppLogo = () => {
  return (
    <div className="flex items-center gap-2 transition-all">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Bird />
      </div>
      <div className="flex items-center gap-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold text-[24px]">BS-Goods</span>
      </div>
    </div>
  );
};

export default AppLogo;
