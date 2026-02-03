'use client'

import { Card, CardHeader, CardBody, CardFooter, Image } from "@heroui/react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

type Props = {
    name: string
    category: string
    type: string
    image: string
}

export default function EventCard({ name, category, type, image }: Props) {
    return (
        <motion.div
            whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 35px 60px -20px rgba(255, 255, 255, 0.15)"
            }}
            whileTap={{ scale: 0.98 }}
            className="group"
        >
            <Card className="w-full h-[360px] sm:h-[380px] overflow-hidden bg-gradient-to-br from-black/90 via-gray-900/50 to-black/70 
                       border border-white/10 backdrop-blur-xl hover:bg-white/5 hover:border-white/20 
                       shadow-2xl hover:shadow-glow transition-all duration-500 relative">

                {/* Gradient Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black backdrop-blur-sm rounded-full border 
                          border-white/20 text-xs font-bold uppercase tracking-wider text-white/80">
                        <span>{category}</span>
                        <span className="text-white/60">·</span>
                        <span className="px-2 py-1 bg-white text-black rounded-full">{type}</span>
                    </div>
                </div>

                {/* Event Image */}
                <CardBody className="p-0 overflow-hidden  w-full">
                    <div className="relative w-full ">
                       <img
  src={image}
  alt={name}
  className="w-full h-80 object-cover rounded-xl mb-[250px]"
/>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                </CardBody>


                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 pointer-events-none">
                    <motion.h4
                        className="font-bold text-xl sm:text-2xl lg:text-3xl text-white drop-shadow-2xl leading-tight bg-gradient-to-r 
                       from-white via-gray-100 to-gray-300 bg-clip-text text-transparent group-hover:from-purple-400 
                       group-hover:to-pink-400 transition-all duration-500"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {name}
                    </motion.h4>
                </div>

                {/* Glass Footer */}
                <CardFooter className="pt-8 pb-6 px-6 border-t border-white/10 bg-black/30 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-col gap-4 w-full ">
                        <Button
                            className="flex-1 h-12 sm:h-14 px-6 
             bg-gradient-to-r from-white/90 to-gray-100/90 
             hover:from-white hover:to-gray-200 
             text-black font-bold shadow-lg hover:shadow-glow 
             rounded-full backdrop-blur-sm 
             border border-white/20 transition-all duration-300 
             group-hover:scale-[1.02]"
                        >
                            Register
                        </Button>

                        <div className="flex items-center justify-center text-xs text-white/60 font-mono tracking-wider">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse" />
                                <span>Open Registrations</span>
                            </div>
                        </div>
                    </div>
                </CardFooter>

                {/* Floating Glow Effect */}
                <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
            </Card>
        </motion.div>
    )
}
