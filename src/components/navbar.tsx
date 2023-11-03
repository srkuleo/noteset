import { LinkButtons } from "./ClientButtons";
import { LogoutButton } from "./ServerButtons";

export const Navbar = () => {
  return (
    <div className="mb-8 flex gap-2">
      <LinkButtons />
      <LogoutButton />
    </div>
  );
};
