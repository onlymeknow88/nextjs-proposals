import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import React from "react";
import cx from "classnames";

interface BreadCumbCustomProps {
  label: string;
  dashboardOnly?: boolean;
  labelPage?: string;
  labelDetail?: string;
  iconHome: React.ReactNode;
  iconPage?: React.ReactNode;
}

export const BreadCumbCustom = (props: Partial<BreadCumbCustomProps>) => {
  const { label, labelPage, labelDetail, iconHome, iconPage, dashboardOnly } =
    props;

  const classDashboard = cx({
    hidden: dashboardOnly,
  });
  return (
    <Breadcrumbs
      classNames={{
        list: "bg-white rounded-md px-4 py-2",
      }}
      variant="solid"
      // underline="hover"
      separator="/"
      itemClasses={{
        item: "text-black/60 data-[current=true]:text-black",
        separator: "px-2",
      }}
    >
      <BreadcrumbItem
        href="/"
        className={`${classDashboard ? "font-bold" : ""} !text-stone-700`}
        startContent={iconHome}
      >
        {label}
      </BreadcrumbItem>
      <BreadcrumbItem
        className={`${classDashboard} !text-stone-700`}
        startContent={iconPage}
      >
        {labelPage}
      </BreadcrumbItem>
      <BreadcrumbItem className={`font-bold ${classDashboard}`}>
        {labelDetail}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCumbCustom;
