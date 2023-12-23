import { Button } from "@nextui-org/react";
// import { StyledBurgerButton } from "./navbar.styles";
import {BurgerMenu} from "@/components/organisms/Icons/Navbar/burger-menu";

export function ButtonMenu({...props}) {
  return (
      <Button {...props}>
        <BurgerMenu />
      </Button>
  );
}
