"use client";
import React from "react";
import { motion  , Transition} from "framer-motion";
import { Link } from "react-router-dom";

const transition :Transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className={`cursor-pointer text-white  hover:opacity-[0.9] dark:text-white 
          ${active == item ? 'font-semibold' : ''}`}
      >
        {item}
      </motion.p>
      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition || undefined}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200 border-black/[0.2] dark:border-white/[0.2] shadow-xl dark:border-neutral-800"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-2"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu_icon = (
  { item,
    active,
    setActive,
    name,
    children
  }:
    {
      item: React.ReactNode,
      active: string | null,
      setActive: React.Dispatch<React.SetStateAction<string | null>>,
      name: string,
      children: React.ReactNode
    }
) => {
  return (
    <div onMouseEnter={() => setActive(name)} className="absolute right-6">
      <motion.div
        className={`cursor-pointer text-white  hover:opacity-[0.9] dark:text-white 
       `}
      >
        {item}
      </motion.div>

      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === name && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-neutral-200 border-black/[0.2] dark:border-white/[0.2] shadow-xl dark:border-neutral-800"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
      </div>
      );
 };


  export const Menu = ({
        setActive,
        children,
}: {
        setActive: (item: string | null) => void;
      children: React.ReactNode;
}) => {
  return (
      <motion.nav
        initial={{ opacity: 0, scale: 0.85, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.5
        }}
        onMouseLeave={() => setActive(null)} // resets the state
        className="relative rounded-full border-0 border-neutral-200  border-transparent bg-gradient-to-br from-black/[0.92] to-gray-800/[0.5]
       dark:bg-black dark:border-white/[0.2] bg-white shadow-input
        flex justify-center space-x-4 mx-4 sm:mx-0 px-8 py-6  dark:border-neutral-800 "
      >
        {children}
      </motion.nav>
      );
};

 export const ProductItem = ({
        title,
        description,
        href,
        src,
}: {
        title: string;
      description: string;
      href: string;
      src: string;
}) => {
  return (
      <a href={href} className="flex space-x-2">
        <img
          src={src}
          width={140}
          height={70}
          alt={title}
          className="shrink-0 rounded-md shadow-2xl"
        />
        <div>
          <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
            {title}
          </h4>
          <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
            {description}
          </p>
        </div>
      </a>
      );
};

      export const HoveredLink = ({to,children, ...rest }: any) => {
  return (
      <Link to={to}
        {...rest}
        className="w-full flex justify-start px-3 py-1 rounded-full cursor-pointer
         text-neutral-700 hover:bg-slate-200 dark:text-neutral-200 hover:text-black"
      >
        {children}
      </Link>
      );
};
