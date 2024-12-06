import AppLogo from "./AppLogo";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="p-2 flex justify-between items-center w-full">
      <AppLogo />
      <ModeToggle />
    </div>
  );
};

export default Header;
