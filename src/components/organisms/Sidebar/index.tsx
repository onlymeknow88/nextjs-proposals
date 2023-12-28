import React from "react";
import { useState, Children } from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../Icons/sidebar/home-icon";
import { BalanceIcon } from "../Icons/sidebar/balance-icon";
import { FileText } from "../Icons/sidebar/file-text";
import { ArrowUp } from "../Icons/sidebar/arrow-up";
import { ArrowDown } from "../Icons/sidebar/arrow-down";
import { AccountsIcon } from "../Icons/sidebar/accounts-icon";
// import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "@/components/organisms/Layout/LayoutContext";
import { useRouter } from "next/router";
import { Button } from "@nextui-org/react";
import NextLink from "next/link";
import clsx from "clsx";
import { PageHeaderFirstSectionColor } from "@/components/organisms/Navbar/PageHeaderFirstSectionColor";
import { ListBars } from "../Icons/sidebar/list-bars";
import AreaMap from "../Icons/sidebar/area-map";
import BoldDot from "../Icons/sidebar/bold-dot";
import BudgetIcon from "../Icons/sidebar/budget-icon";
import WalletIcon from "../Icons/sidebar/wallet-icon";
import ListIcon from "../Icons/sidebar/list-icon";
import PaymentIcon from "../Icons/sidebar/payment-icon";

export const SidebarWrapper = () => {
  const router = useRouter();
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();
  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 bg-white shadow-xl ${
          isLargeOpen ? "hidden" : "lg:flex"
        }`}
      >
        <div className={Sidebar.Body()}>
          <SmallSidebarItem
            icon={<HomeIcon />}
            // isActive={router.pathname === "/"}
            title="Dashboard"
            href="/"
          />
          <SmallSidebarItem
            icon={<FileText />}
            title="Proposals"
            href="/proposal"
          />
          <SmallSidebarItem
            icon={<WalletIcon />}
            title="Amounts"
            href="/amount"
          />
        </div>
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-default-500 opacity-50"
        />
      )}
      <aside
        className={`w-72 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 bg-white shadow-xl ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${
          isSmallOpen ? "flex z-[999] bg-white max-h-screen h-full" : "hidden"
        }`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSectionColor />
        </div>
        <div className={Sidebar.Body()}>
          <LargeSidebarSection>
            <LargeSidebarItem
              isActive={router.pathname === "/"}
              title="Dashboard"
              href="/"
              icon={<HomeIcon />}
            />
          </LargeSidebarSection>
          <LargeSidebarSection title="General" visibleItemCount={5}>
            <LargeSidebarItem
              isActive={
                router.pathname === "/proposal" ||
                router.pathname === "/proposal/c" ||
                router.pathname === "/proposal/e/[id]" ||
                router.pathname === "/proposal/d/[id]"
              }
              title="Proposal"
              icon={<FileText />}
              href="/proposal"
            />
            <LargeSidebarItem
              isActive={
                router.pathname === "/amount" ||
                router.pathname === "/amount/e/[id]" ||
                router.pathname === "/amount/c"
              }
              title="Amount"
              icon={<WalletIcon />}
              href="/amount"
            />
            <LargeSidebarItem
              isActive={
                router.pathname === "/form-nop" ||
                router.pathname === "/form-nop/e/[id]" ||
                router.pathname === "/form-nop/c"
              }
              title="Form NOI"
              icon={<ListBars />}
              href="/form-nop"
            />
            {/* <LargeSidebarItem
              isActive={router.pathname === "/proposal/report"}
              title="Report"
              icon={<ListBars />}
              href="/proposal/report"
            /> */}
          </LargeSidebarSection>
          <LargeSidebarSection title="Setting">
            <LargeSidebarItem
              isActive={
                router.pathname === "/ccow" ||
                router.pathname === "/ccow/e/[id]" ||
                router.pathname === "/ccow/c"
              }
              title="Ccow"
              icon={<ListIcon />}
              href="/ccow"
            />
            <LargeSidebarItem
              isActive={
                router.pathname === "/area" ||
                router.pathname === "/area/e/[id]" ||
                router.pathname === "/area/c"
              }
              title="Area"
              icon={<AreaMap />}
              href="/area"
            />
            <LargeSidebarItem
              isActive={
                router.pathname === "/budget" ||
                router.pathname === "/budget/e/[id]" ||
                router.pathname === "/budget/c"
              }
              title="Budget"
              icon={<BalanceIcon />}
              href="/budget"
            />
            <LargeSidebarItem
              isActive={
                router.pathname === "/gl-account" ||
                router.pathname === "/gl-account/e/[id]" ||
                router.pathname === "/gl-account/c"
              }
              title="GL Account"
              icon={<AccountsIcon />}
              href="/gl-account"
            />
            <LargeSidebarItem
              isActive={
                router.pathname === "/purpay" ||
                router.pathname === "/purpay/e/[id]" ||
                router.pathname === "/purpay/c"
              }
              title="Porpose Payment"
              icon={<PaymentIcon />}
              href="/purpay"
            />

            {/* <CollapseItems
              icon={<BalanceIcon />}
              items={["Banks Accounts", "Credit Cards", "Loans"]}
              title="Balances"
            /> */}
          </LargeSidebarSection>
          {/* <LargeSidebarSection visibleItemCount={5}>
            <LargeSidebarItem
              icon={<AccountsIcon />}
              title="Library"
              href="/"
            />
          </LargeSidebarSection> */}
        </div>
      </aside>
    </>
  );
};

type SmallSidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  href: string;
};

function SmallSidebarItem({
  icon,
  title,
  href,
  isActive = false,
}: SmallSidebarItemProps) {
  return (
    <>
      <NextLink
        href={href}
        className={clsx(
          isActive
            ? "bg-success-100 [&_svg_path]:fill-success-500"
            : "hover:bg-default-100",
          "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
        )}
      >
        {icon}
        <div className="text-sm">{title}</div>
      </NextLink>
    </>
  );
}

type LargeSidebarItemProps = {
  icon: React.ReactNode;
  title: string;
  isActive?: boolean;
  href?: string;
};

function LargeSidebarItem({
  icon,
  title,
  href = "",
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "bg-success-100 [&_svg_path]:fill-success-500"
            : "hover:bg-default-100",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
      >
        {icon}
        <span className="text-default-900">{title}</span>
      </div>
    </NextLink>
  );
}

type LargeSidebarSectionProps = {
  children: React.ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = isExpanded ? <ArrowUp /> : <ArrowDown />;

  return (
    <div>
      {title && <span className="text-xs font-normal ">{title}</span>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((e) => !e)}
          variant="ghost"
          className="w-full border-1 border-default-300 flex items-center rounded-lg gap-4 p-3"
        >
          {ButtonIcon}
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}
