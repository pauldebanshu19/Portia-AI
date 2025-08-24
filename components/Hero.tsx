import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
// import { Globe } from "./magicui/globe";
import { SparklesText } from "./magicui/sparkles-text";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { AnimatedShinyText } from "./magicui/animated-shiny-text";
import Link from "next/link";

export default function Hero() {
  return (
    
    <div id="hero" className="min-h-screen pb-10 w-full bg-black bg-dot-white/[0.2] flex flex-col items-center justify-center relative px-4">
  {/* Radial gradient for the container */}
  <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
  
  <div className="flex flex-col items-center text-center">
    <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
      <span>✨ Introducing Portia AI</span>
      <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </AnimatedShinyText>

    <SparklesText text="Worried about grades?" />
    {/* <SparklesText className="ml-[455px] text-neutral-600 text-3xl" text="Not anymore " /> */}


    <div className="flex justify-center mt-6">
      <Link href="/dashboard" className="group">
        <button className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
          <div className="px-6 py-2 bg-black dark:bg-white rounded-full relative group-hover:bg-transparent transition duration-200 text-white dark:text-black group-hover:text-black dark:group-hover:text-white flex items-center space-x-2">
            <span>Launch Portia AI</span>
          </div>
        </button>
      </Link>
    </div>
  </div>
</div>

  );
}
