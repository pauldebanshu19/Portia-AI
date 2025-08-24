"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, animate } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    id: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - (scrollYProgress.getPrevious() || 0);
      setTimeout(() => {
        setVisible(scrollYProgress.get() < 0.05 || direction < 0);
      }, 100);
    }
  });

  // useEffect(() => {
  //   return scrollYProgress.onChange((current) => {
  //     const direction = current - (scrollYProgress.getPrevious() || 0);
  //     setTimeout(() => {
  //       setVisible(scrollYProgress.get() < 0.05 || direction < 0);
  //     }, 100);
  //   });
  // }, [scrollYProgress]);

  

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: 1 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {isMounted &&
          navItems.map((navItem, idx) => (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              onClick={(e) => {
                if (navItem.id) {
                  e.preventDefault();
                  const element = document.getElementById(navItem.id);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  } else {
                    console.warn(`Element with id ${navItem.id} not found.`);
                  }
                }
              }}
              className="relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}

        <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl relative">
            <Link href="/dashboard">Launch</Link>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
          </span>
        </button>
      </motion.div>
    </AnimatePresence>
  );
};





























// "use client";
// import React, { useState } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useMotionValueEvent,
// } from "framer-motion";
// import { cn } from "@/lib/utils";
// import Link from "next/link";

// export const FloatingNav = ({
//   navItems,
//   className,
// }: {
//   navItems: {
//     name: string;
//     link: string;
//     id: string;
//     icon?: JSX.Element;
//   }[];
//   className?: string;
// }) => {
//   const { scrollYProgress } = useScroll();
//   const [visible, setVisible] = useState(false);

//   useMotionValueEvent(scrollYProgress, "change", (current) => {
//     if (typeof current === "number") {
//       const direction = current! - scrollYProgress.getPrevious()!;

//       if (scrollYProgress.get() < 0.05) {
//         setVisible(true);
//       } else {
//         setVisible(direction < 0);
//       }
//     }
//   });

//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         initial={{ opacity: 1, y: 1 }}
//         animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
//         transition={{ duration: 0.2 }}
//         className={cn(
//           "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
//           className
//         )}
//       >
//         {navItems.map((navItem: any, idx: number) => (
//           <Link
//             key={`link=${idx}`}
//             href={navItem.link}
//             onClick={(e) => {
//               e.preventDefault(); // Prevent default link behavior
//               const idd = navItem.id;
//               const element = document.getElementById(idd);
//               if (element) {
//                 element.scrollIntoView({ behavior: "smooth", block: "start" });
//               } else {
//                 console.warn(`Element with id ${idd} not found.`);
//               }
//             }}
//             className="relative text-neutral-50 items-center flex space-x-1 hover:text-neutral-300"
//           >
//             <span className="block sm:hidden">{navItem.icon}</span>
//             <span className="hidden sm:block text-sm">{navItem.name}</span>
//           </Link>
//         ))}

//         {/* <button className="border text-sm font-medium relative border-white/[0.2] text-white px-4 py-2 rounded-full">
//           <Link href="/dashboard">Launch</Link>
//           <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
//         </button> */}
//         <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//           <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
//           <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-xs font-medium text-white backdrop-blur-3xl relative">
//             <Link href="/dashboard">Launch</Link>
//             <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
//           </span>
//         </button>
//       </motion.div>
//     </AnimatePresence>
//   );
// };


