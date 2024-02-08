import { Logo } from "./logo";
import Search from "@/components/client/search";
import Actions from "./actions";

export interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  return (
    <nav className="fixed w-full z-[49] bg-[#252731] top-0 h-20 px-2 flex justify-between items-center">
      <Logo />
      <Search pushUrl="/search" />
      <Actions />
    </nav>
  );
}
