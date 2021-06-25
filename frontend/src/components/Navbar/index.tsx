import { ReactElement } from "react";
import Navbar from "./Navbar";

interface Props {
  children: ReactElement;
}

const NavbarWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default NavbarWrapper;
