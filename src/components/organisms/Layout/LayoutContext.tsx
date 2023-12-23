import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import React from "react";
  
  
  type SidebarProviderProps = {
    children: React.ReactNode;
  };
  
  type SidebarContextType = {
    collapsed: false;
    isLargeOpen: boolean;
    isSmallOpen: boolean;
    setCollapsed: () => void;
    toggle: () => void;
    close: () => void;
  };
  
  export const SidebarContext = createContext<SidebarContextType | null>(null);
  
  export function useSidebarContext() {
    const value = useContext(SidebarContext);
    if (value == null) throw Error("Cannot use outside of SidebarProvider");
  
    return value;
  }
  
  export function SidebarProvider({ children }: SidebarProviderProps) {
    const [isLargeOpen, setIsLargeOpen] = useState(true);
    const [isSmallOpen, setIsSmallOpen] = useState(false);
  
    useEffect(() => {
      const handler = () => {
        if (!isScreenSmall()) setIsSmallOpen(false);
      };
  
      window.addEventListener("resize", handler);
  
      return () => {
        window.removeEventListener("resize", handler);
      };
    }, []);
    
  
    function isScreenSmall() {
      return window.innerWidth < 1024;
    }
  
    function toggle() {
      if (isScreenSmall()) {
        setIsSmallOpen((s) => !s);
      } else {
        setIsLargeOpen((l) => !l);
      }
    }
  
    function close() {
      if (isScreenSmall()) {
        setIsSmallOpen(false);
      } else {
        setIsLargeOpen(false);
      }
    }
  
    return (
      <SidebarContext.Provider
        value={{
          collapsed: false,
          setCollapsed: () => {},
          isLargeOpen,
          isSmallOpen,
          toggle,
          close,
        }}
      >
        {children}
      </SidebarContext.Provider>
    );
  }
  