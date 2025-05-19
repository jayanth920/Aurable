"use client";
import { useMemo } from "react";
import { MessagesContext } from "@/context/MessagesContext";
import { UserDetailContext } from "@/context/UserDetailContext";
import Colors from "@/data/Colors";
import Lookup from "@/data/Lookup";
import { ArrowRight, Link } from "lucide-react";
import React, { useContext, useState } from "react";
import SignInDialog from "./SignInDialog";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TextShimmerWave } from "../ui/text-shimmer-wave";
import { GradientButton } from "../ui/gradient-button";
import { cn } from "@/lib/utils";
import { SignInDialogContext } from "@/context/SignInDialogContext";

function Hero() {
  const [userInput, setUserInput] = useState();
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const {openDialog, setOpenDialog} = useContext(SignInDialogContext);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if (userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    const msg = {
      role: "user",
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push("/workspace/" + workspaceId);
  };

  const shimmerContent = useMemo(
    () => (
      <TextShimmerWave
        className="[--base-color:white] [--base-gradient-color:black]"
        duration={1.5}
        spread={0.5}
        zDistance={1}
        scaleDistance={1.1}
        rotateYDistance={20}
      >
        {Lookup.HERO_DESC}
      </TextShimmerWave>
    ),
    []
  );

  return (
    <div className="flex flex-col items-center mt-32 gap-2">
      <h2
        className="subpixel-antialiased font-bold text-4xl text-white"
        style={{
          fontFamily: "Gloock",
          textShadow: "0 2px 2px rgba(0, 0, 0, 0.8)",
        }}
      >
        {Lookup.HERO_HEADING}
      </h2>{" "}
      {shimmerContent}
      <div
        className="p-5 rounded-xl max-w-2xl w-full mt-3 border-muted-border h-[20vh]"
        style={{ backgroundColor: "rgba(39, 39, 37, 0.5)" }}
      >
        <div className="flex gap-2">
          <textarea
            placeholder="I want to build a..."
            className="outline-none bg-transparent w-full h-32 max-h-56 resize-none text-white"
            style={{ fontFamily: "monospace" }}
            onChange={(event) => setUserInput(event.target.value)}
          />
          <button
            className={cn(
              "p-2 w-10 h-10 rounded-full cursor-pointer bg-amber-50 shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition-all duration-300 ease-in-out active:translate-y-[1px] active:shadow-sm",
              userInput
                ? "opacity-80 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            )}
            onClick={() => onGenerate(userInput)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 17L17 7M7 7h10v10"
              />
            </svg>
          </button>

          <div>
            <Link className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="flex mt-8 flex-wrap max-w-2xl items-center justify-center gap-3">
        {Lookup.SUGGSTIONS.map((suggestion, index) => (
          <h2
            className="p-1 px-2 border rounded-full text-sm text-gray-400 hover:text-white cursor-pointer"
            key={index}
            onClick={() => onGenerate(suggestion)}
          >
            {suggestion}
          </h2>
        ))}
      </div>
      <SignInDialog/>
    </div>
  );
}

export default Hero;
