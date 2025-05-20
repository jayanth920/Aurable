import React from "react";
import { GradientText } from "../ui/gradient-text";
import { SparklesText } from "@/components/ui/sparkles-text";

export const Title = () => {
  return(
  <div
    className="w-full flex justify-center items-baseline leading-none"
    style={{
      fontFamily: "Gloock",
      textShadow: "0 2px 2px rgba(0, 0, 0, 0.8)",
    }}
  >
    <p className="leading-none text-amber-300 subpixel-antialiased font-medium tracking-widest">
      <span className="text-[5rem] align-baseline tracking-widest">A</span>
      <span className="text-[3rem] align-baseline tracking-widest font-bold">
        URABLE
      </span>
    </p>
  </div>
  );
};
