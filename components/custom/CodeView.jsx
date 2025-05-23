"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { Loader } from "../ui/loader";

import Lookup from "@/data/Lookup";
import { MessagesContext } from "@/context/MessagesContext";
import Prompt from "@/data/Prompt";
import axios from "axios";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { countToken } from "./ChatView";
import { UserDetailContext } from "@/context/UserDetailContext";
import { toast } from "sonner";
import SandpackPreviewClient from "./SandpackPreviewClient";
import { ActionContext } from "@/context/ActionContext";

function CodeViewInner({ initialFiles, onFilesUpdate }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("code");
  const { messages } = useContext(MessagesContext);
  const UpdateFiles = useMutation(api.workspace.UpdateFiles);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { action } = useContext(ActionContext);
  const [loading, setLoading] = useState(false);
  const UpdateToken = useMutation(api.users.UpdateToken);
  const { sandpack } = useSandpack();

  useEffect(() => {
    if (action?.actionType === "deploy" || action?.actionType === "export") {
      setActiveTab("preview");
    }
  }, [action]);

  useEffect(() => {
    const handleKeyDown = async (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        const currentFiles = sandpack?.files;
        await UpdateFiles({
          workspaceId: id,
          files: currentFiles,
        });
        toast.success("Code saved!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sandpack, id]);

  useEffect(() => {
    if (messages?.length > 0) {
      const role = messages[messages.length - 1].role;
      if (role === "user") {
        GenerateAiCode();
      }
    }
  }, [messages]);

  const GenerateAiCode = async () => {
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }

    setLoading(true);

    try {
      const PROMPT = JSON.stringify(messages) + " " + Prompt.CODE_GEN_PROMPT;

      const result = await axios.post("/api/gen-ai-code", {
        prompt: PROMPT,
      });

      const aiResp = result.data;

      console.log(aiResp);

      const mergedFiles = { ...Lookup.DEFAULT_FILE, ...aiResp?.files };

      onFilesUpdate(mergedFiles);

      await UpdateFiles({
        workspaceId: id,
        files: aiResp?.files,
      });

      const respToken = countToken(JSON.stringify(aiResp));
      const token = Number(userDetail?.token) - Number(respToken);
      setUserDetail((prev) => ({ ...prev, token }));

      await UpdateToken({
        token,
        userId: userDetail?._id,
      });
    } catch (err) {
      console.error("❌ AI generation error:", err);
      toast.error("Something went wrong while generating code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="bg-[#181818] w-full p-2 border">
        <div className="flex items-center flex-wrap shrink-0 bg-black p-1 w-[140px] gap-3 justify-center rounded-full">
          <h2
            onClick={() => setActiveTab("code")}
            className={`text-sm cursor-pointer ${
              activeTab === "code" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Code
          </h2>
          <h2
            onClick={() => setActiveTab("preview")}
            className={`text-sm cursor-pointer ${
              activeTab === "preview" &&
              "text-blue-500 bg-blue-500 bg-opacity-25 p-1 px-2 rounded-full"
            }`}
          >
            Preview
          </h2>
        </div>
      </div>

      <SandpackLayout>
        {activeTab === "code" ? (
          <>
            <SandpackFileExplorer style={{ height: "80vh" }} />
            <SandpackCodeEditor style={{ height: "80vh" }} />
          </>
        ) : (
          <SandpackPreviewClient  />
        )}
      </SandpackLayout>

      {loading && (
        <div className="h-full flex justify-center items-center">
          <Loader variant="circular" />
          <h2>Generating your files...</h2>
        </div>
      )}
    </div>
  );
}

export default function CodeViewWrapper() {
  const { id } = useParams();
  const convex = useConvex();
  const [files, setFiles] = useState(null);

  useEffect(() => {
    if (typeof id === "string") {
      const fetchFiles = async () => {
        const result = await convex.query(api.workspace.GetWorkspace, {
          workspaceId: id,
        });
        const mergedFiles = { ...Lookup.DEFAULT_FILE, ...result?.fileData };
        setFiles(mergedFiles);
      };

      fetchFiles();
    }
  }, [id]);

  const handleFilesUpdate = (newFiles) => {
    setFiles(newFiles); // Sync with React state
  };

  if (!files) {
    return <div className="p-10 text-white"><Loader variant="circular" /></div>;
  }

  return (
    <SandpackProvider
      template="react"
      theme="dark"
      customSetup={{
        dependencies: {
          ...Lookup.DEPENDANCY,
        },
      }}
      options={{ externalResources: ["https://cdn.tailwindcss.com"],autoReload:true }}
      files={files}
    >
      <CodeViewInner initialFiles={files} onFilesUpdate={handleFilesUpdate} />
    </SandpackProvider>
  );
}
