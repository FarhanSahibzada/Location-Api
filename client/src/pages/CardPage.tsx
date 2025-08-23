import { AnimatedTestimonials } from '../components/ui/animated-testimonials';
import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'

const item_varients: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1,

        }
    }
}

export default function CardPage() {

    const section_ref = useRef<HTMLElement | null>(null);
    const use_in_view = useInView(section_ref, { once: false, amount: 0.2 });

       const testimonials = [
        {
            quote:
                "The Karachi API provides real-time data with impressive accuracy. It’s a perfect solution for developers working on location-based services.",
            name: "Karachi API",
            designation: "API for Karachi Region",
            src: "/public/api1.png",
        },
        {
            quote:
                "Lahore API offers seamless integration and reliable endpoints. From weather to traffic, it delivers consistent results for any Lahore-based project.",
            name: "Lahore API",
            designation: "API for Lahore Region",
            src: "/public/api2.png",
        },
        {
            quote:
                "Peshawar API helped streamline our data pipeline effortlessly. Fast, scalable, and secure — ideal for businesses targeting this area.",
            name: "Peshawar API",
            designation: "API for Peshawar Region",
            src: "/public/api3.png",
        },
    ];

    return (
        <section id='card_section' className='relative w-full min-h[100vh] mt-14 mb-10' ref={section_ref}>
            <motion.div
                variants={item_varients}
                initial="hidden"
                animate={use_in_view ? 'visible' : 'hidden'}
                className='text-center '>
                <h1 className='text-3xl md:text-4xl font-bold mb-3 font-montserrat'>Available APIs</h1>
                <div className="h-2 w-36 bg-blue-600 mx-auto rounded-full"></div>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                    Have an idea or want to integrate one of these APIs into your project? Or Looking to use these APIs or collaborate on a project?
                </p>
            </motion.div>
            <AnimatedTestimonials testimonials={testimonials} />
        </section>
    )
}
