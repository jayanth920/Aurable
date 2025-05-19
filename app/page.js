import Hero from "@/components/custom/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Title } from "@/components/custom/Title";
export default function Home() {
  return (
    <div className="mx-auto max-h-1vh overflow-hidden flex flex-col items-center justify-center">
      <Title/>
      <Hero /> 
    </div>
  );
}
