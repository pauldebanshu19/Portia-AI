"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../components/ui/bento-grid";
import { HelpCircle, BookOpen, FileText, FileSearch } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Meteors } from "../components/ui/meteors";
import Image from "next/image";

const Lottie = dynamic(() => import("@lottielab/lottie-player/react"), { ssr: false });



export default function BentoGridCustomDemo() {
  return (
    <div id="features" className="px-4 sm:px-6 md:px-8">
      <BentoGrid className="max-w-7xl pb-11 mx-auto md:auto-rows-[22rem] grid grid-cols-1 lg:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg] p-6 sm:p-6 sm:text-sm", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
    </div>
  );
}

const SkeletonOne = () => {
 
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };
  
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="https://i.pinimg.com/736x/d4/76/8c/d4768c0e7d8762294c1f169a6a1d3c27.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
        I need sample papers and notes, to excel my exam?
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        
        <p className="text-xs text-neutral-500">Nw,we got your back!</p>
       
        <Image
          src="https://i.pinimg.com/736x/f1/7d/db/f17ddb244e3f2f6a720e61cd3f8161fb.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
      </motion.div>
    </motion.div>
  );

};

const SkeletonTwo = () => (
  <Lottie src="https://cdn.lottielab.com/l/AjBDKht8s1oUa0.json" autoplay />
);

const SkeletonThree = () => (
  <Image
          src="https://i.pinimg.com/736x/21/77/47/217747ba77843033acffdc614475be56.jpg"
          alt="avatar"
          height="736"
          width="507"
          className="max-h-44 w-full"
        />

);

const SkeletonFour = () => (
  
  <Lottie src="https://cdn.lottielab.com/l/CJZCvDA8pLuwCZ.json" autoplay />
  
);


const SkeletonFive = () => (
  <div className="">
      <div className=" w-full h-full relative max-w-xs">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-purple-500 to-blue-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
        <div className="relative shadow-xl bg-black border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
 
          <h1 className="font-bold text-xl text-white mb-12 relative z-50">
           
             Tests have never been easier
          </h1>
          
          <Meteors number={30} />
        </div>
      </div>
    </div>
);

const items = [
  {
    title: "Instant Doubt Resolution",
    description: "Get precise and clear explanations instantly for any topic.",
    header: <SkeletonOne />, 
    className: "md:col-span-1",  
    icon: <HelpCircle className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "AI-Generated Quizzes",
    description: "Prepare better with structured quizzes tailored to your subject.",
    header: <SkeletonTwo />,
    className: "md:col-span-1 p-6",  
    icon: <BookOpen className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "Custom Question Papers",
    description: "Generate question papers designed for better exam preparation.",
    header: <SkeletonThree />,
    className: "md:col-span-1",  
    icon: <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "Smart PDF Review & Summarization",
    description: "Upload PDFs, get summaries, and AI-generated feedback.",
    header: <SkeletonFour  />,
    className: "md:col-span-2 p-6",  
    icon: <FileSearch className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
  {
    title: "Online Assessment Tools",
    description: "Create multiple-choice, fill-in-the-blank, and short-answer questions.",
    header: <SkeletonFive />,
    className: "md:col-span-1",  
    icon: <FileText className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />,
  },
];





























