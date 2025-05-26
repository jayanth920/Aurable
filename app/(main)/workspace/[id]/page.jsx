"use client";
import ChatView from "@/components/custom/ChatView";
import CodeViewWrapper from "@/components/custom/CodeView";
import React, { useContext, useEffect } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";

function Workspace() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();

  useEffect(() => {
    if (userDetail === null) return;
    if (!userDetail || Object.keys(userDetail).length === 0) {
      router.push("/");
    }
  }, [userDetail, router]);

  if (userDetail === null) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader variant="circular" />
      </div>
    );
  }

  return (
    <div className="p-3 pr-10 mt-3 flex flex-col items-center justify-center">
      <p className="mb-5 text-center font-semibold">
        In case the code doesn't run, click
        <button
          className="bg-gray-700 border border-neutral-600 w-[3rem] rounded-3xl font-thin text-sm ml-1 mr-1"
          type="button"
        >
          Run
        </button>
        button on the bottom of the preview tab to run your code !
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ChatView />
        <div className="col-span-2">
          <CodeViewWrapper />
        </div>
      </div>
    </div>
  );
}

export default Workspace;
