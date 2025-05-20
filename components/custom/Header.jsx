"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { Button } from "../ui/button";
import Colors from "@/data/Colors";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { Download, Rocket } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { ActionContext } from "@/context/ActionContext";
import { SignInDialogContext } from "@/context/SignInDialogContext";
import { ButtonCta } from "../ui/button-shiny";
import { ShimmerButton } from "../ui/shimmer-button";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { openDialog, setOpenDialog } = useContext(SignInDialogContext);
  const [open, setOpen] = useState(false);
  const { action, setAction } = useContext(ActionContext);

  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };
  return (
    <div className="p-4 flex justify-between items-center">
      {/* <Link href={'/'}> */}
      {/* <Image src={'/logo.png'} alt="logo" width={40} height={40} className='rounded-full' onClick={toggleSidebar}/> */}
      <Button
        className="group"
        variant="outline"
        size="icon"
        onClick={toggleSidebar}
      >
        <svg
          className="pointer-events-none"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12L20 12"
            className="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
          />
          <path
            d="M4 12H20"
            className="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
          />
          <path
            d="M4 12H20"
            className="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
          />
        </svg>
      </Button>
      {/* </Link> */}
      {!userDetail?.name ? (
        <div className="flex gap-5">
          <ShimmerButton
            className="h-10 w-fit text-md hover:shadow-[0_0_2px_2px_rgba(168,85,247,0.9)] transition-all"
            onClick={() => setOpenDialog(true)}
          >
            Sign In
          </ShimmerButton>
        </div>
      ) : (
        <div className="flex gap-5 items-center">
          {pathname.includes("/workspace/") && (
            <>
              <Button variant="ghost" onClick={() => onActionBtn("export")}>
                <Download /> Export
              </Button>
              <Button
                onClick={() => onActionBtn("deploy")}
                className="text-white"
                style={{
                  backgroundColor: Colors.BLUE,
                }}
              >
                <Rocket /> Deploy
              </Button>
            </>
          )}
          {userDetail && (
            <Image
              onClick={toggleSidebar}
              src={userDetail?.picture}
              alt="userImage"
              width={40}
              height={40}
              className="rounded-full cursor-pointer object-cover"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
