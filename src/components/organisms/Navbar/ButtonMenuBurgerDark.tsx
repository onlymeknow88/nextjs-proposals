import { Button } from "@nextui-org/react";
// import { StyledBurgerButton } from "./navbar.styles";
import {BurgerMenuDark} from "@/components/organisms/Icons/Navbar/burger-menu-dark";

export function ButtonMenuDark({...props}) {
  return (
      <Button {...props}>
        <BurgerMenuDark />
      </Button>
  );
}
