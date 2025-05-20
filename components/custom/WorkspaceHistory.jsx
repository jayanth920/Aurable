"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";

function WorkspaceHistory() {
  const convex = useConvex();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [workspaceList, setWorkSpaceList] = useState();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    userDetail && GetAllWorkspace();
  }, [userDetail]);

  const GetAllWorkspace = async () => {
    if (!userDetail?._id) return;
    const result = await convex.query(api.workspace.GetAllWorkspace, {
      userId: userDetail._id,
    });
    setWorkSpaceList(result);
  };

  return (
    <div>
      <h2 className="font-medium text-lg ml-3">Your Chats</h2>
      <div>
        {workspaceList &&
          workspaceList?.map((workspace, index) => (
            <Link key={index} href={"/workspace/" + workspace?._id}>
              <h2
                onClick={toggleSidebar}
                className="text-sm text-gray-400 mt-2 ml-6 font-light hover:text-white cursor-pointer"
              >
                {workspace?.messages[0]?.content.length > 20
                  ? workspace?.messages[0]?.content.slice(0, 30) + "..."
                  : workspace?.messages[0]?.content}
              </h2>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default WorkspaceHistory;
