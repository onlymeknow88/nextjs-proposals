import React from "react";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

export const LayoutLogin = ({children } : Props) => {
  return <>{children}</>;
};
