import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from "framer-motion";

const text = "Location API";

const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            type: "spring",
            stiffness: 500,
            damping: 30,
            repeat : Infinity,
            repeatType : 'reverse'
        },
    }),
};

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white/60 backdrop-blur-md">
            <div className="text-center">
                <motion.h1
                    className="text-4xl sm:text-6xl font-bold font-baby_bear flex flex-wrap justify-center gap-1"
                >
                    {text.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            custom={i}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.h1>

            </div>
        </div>
    );
}
