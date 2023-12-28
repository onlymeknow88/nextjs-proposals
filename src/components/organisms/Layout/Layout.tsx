import React, { useState } from "react";
import { useRouter } from "next/router";
import { SidebarProvider } from "./LayoutContext";
import { Navbar } from "../Navbar";
import { SidebarWrapper } from "../Sidebar";
import { NextApiRequest } from "next";

interface Props {
  children: React.ReactNode;
}

export const categories = [
  "All",
  "JavaScript",
  "TypeScript",
  "Programming",
  "Weight Lifting",
  "Bowling",
  "Hiking",
  "React",
  "Next.js",
  "Functional Programming",
  "Object Oriented Programming",
  "Frontend Web Development",
  "Backend Web Development",
  "Web Development",
  "Coding",
];

export const Layout = ({ children }: Props) => {
  const router = useRouter();
  const noNav = ["/proposal/pengajuan"];
  const isLoginPage = noNav.includes(router.asPath);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  // if (isLoginPage) {
  //   return (
  //     <SidebarProvider>
  //       <section className="max-h-screen flex flex-col">
  //         <Navbar />
  //         <div className="grid lg:grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-default-50">
  //           <SidebarWrapper />
  //           <div className="overflow-x-hidden px-8 pb-4">

  //             <div className="w-full max-w-full h-screen max-h-full">
  //               <div className="flex flex-col justify-center w-full  py-8 lg:px-0  max-w-[90rem] mx-auto gap-3">
  //                 {children}
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </section>
  //     </SidebarProvider>
  //   );
  // }
  return (
    <>
      <SidebarProvider>
        <section className="max-h-screen flex flex-col">
          <Navbar />
          <div className="grid lg:grid-cols-[auto,1fr] flex-grow-1 overflow-auto bg-blue-50">
            <SidebarWrapper />
            <div className="overflow-x-hidden pb-4 pl-4">{children}</div>
          </div>
        </section>
      </SidebarProvider>
    </>
  );
};
