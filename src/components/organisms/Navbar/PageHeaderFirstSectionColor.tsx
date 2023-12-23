import { ButtonMenuDark } from "./ButtonMenuBurgerDark";
import Image from "next/image";
import Logo from "@/assets/img/admr.png";
import { useState } from "react";
import { useSidebarContext } from "@/components/organisms/Layout/LayoutContext";

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSectionColor({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`gap-4 px-2 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <ButtonMenuDark onClick={toggle} isIconOnly className="bg-transparent rounded-full"></ButtonMenuDark>
      <Image src={Logo} width={100} height={60} alt="Logo" aria-label="tes"/>
    </div>
  );
}
