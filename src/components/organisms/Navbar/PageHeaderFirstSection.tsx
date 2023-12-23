import { ButtonMenu } from "./ButtonMenu";
import Image from "next/image";
import Logo from "@/assets/img/logo-ami.png";
import { useState } from "react";
import { useSidebarContext } from "@/components/organisms/Layout/LayoutContext";

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`gap-4 px-2 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <ButtonMenu onClick={toggle} isIconOnly color="white" className="rounded-full"></ButtonMenu>
      <Image src={Logo} width={100} height={60} alt="Logo" />
    </div>
  );
}
