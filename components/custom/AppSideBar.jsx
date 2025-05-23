import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Button } from "../ui/button";
import { MessageCircleCodeIcon } from "lucide-react";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
import Link from "next/link";
import { ButtonCta } from "../ui/button-shiny";
import { useSidebar } from "@/components/ui/sidebar";

function AppSideBar() {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-between items-center">
        {/* <Image src={'/logo.png'} alt="logo" width={30} height={30} /> */}
        <Link href={"/"}>
          <ButtonCta className="mt-5 w-fit h-10 text-base font-normal hover:shadow-[0_0_1px_2px_rgba(168,85,247,0.9)] transition-all" label="Start New Chat" onClick={toggleSidebar}>
            <MessageCircleCodeIcon />
          </ButtonCta>
        </Link>
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter></SideBarFooter>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
