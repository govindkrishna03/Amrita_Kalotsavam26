'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/ui/EventCard"

type User = {
    name: string
    email: string
    rollNo: string
    house: string
}

type Event = {
    id: number
    name: string
    category: string
    type: "Solo" | "Group"
    stage: "OnStage" | "OffStage"
    image: string
}

const EVENTS: Event[] = [
    {
        id: 1,
        name: "Classical Dance",
        category: "Dance",
        type: "Solo",
        stage: "OnStage",
        image: "/classicaldance.png",
    },
    {
        id: 2,
        name: "Group Dance",
        category: "Dance",
        type: "Group",
        stage: "OnStage",
        image: "/classicalgrpdance.jpg",
    },
    {
        id: 3,
        name: "Battle of Bands",
        category: "Music",
        type: "Group",
        stage: "OnStage",
        image: "/events/bands.jpg",
    },
    {
        id: 4,
        name: "Poetry Slam",
        category: "Literary",
        type: "Solo",
        stage: "OffStage",
        image: "/events/poetry.jpg",
    },
    {
        id: 5,
        name: "Photography",
        category: "Art",
        type: "Solo",
        stage: "OffStage",
        image: "/events/photo.jpg",
    },
    {
        id: 6,
        name: "Short Film",
        category: "Media",
        type: "Group",
        stage: "OffStage",
        image: "/events/shortfilm.jpg",
    },
]
const onStage = EVENTS.filter(e => e.stage === "OnStage")
const offStage = EVENTS.filter(e => e.stage === "OffStage")

export default function EventsPage() {
    const [user] = useState<User>({
        name: "Govind Krishna",
        email: "am.en.u4cse22322@am.students.amrita.edu",
        rollNo: "AM.EN.U4CSE22322",
        house: "Anandamayi",
    })

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white 
                         py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Header - Mobile Optimized */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-2xl mx-auto px-4"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-4 sm:px-6 py-4 sm:py-3 
                                   backdrop-blur-sm  mb-6">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold 
                                      bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent 
                                      text-center sm:text-left leading-tight">
                            Welcome {user.name}!
                        </h1>
                    </div>
                    
                    <div className="space-y-1 text-gray-400 text-sm sm:text-base px-2">
                        <p className="font-mono">
                            House: <span className="font-bold text-purple-400 text-base sm:text-lg">{user.house}</span>
                        </p>
                    </div>
                </motion.div>

                {/* ON-STAGE EVENTS */}
                <section className="mb-16 sm:mb-20 lg:mb-28">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 sm:mb-10 lg:mb-12 max-w-2xl px-2"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 
                                       rounded-2xl flex items-center justify-center p-2 backdrop-blur-sm 
                                       border border-orange-500/30 flex-shrink-0">
                            <span className="text-2xl">🎤</span>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold 
                                          bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent 
                                          leading-tight sm:leading-none truncate">
                                On-Stage Events
                            </h2>
                            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-orange-400 to-red-400 mt-2" />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {onStage.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                <EventCard {...event} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* OFF-STAGE EVENTS */}
                <section className="mb-12 sm:mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 sm:mb-10 lg:mb-12 max-w-2xl px-2"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 
                                       rounded-2xl flex items-center justify-center p-2 backdrop-blur-sm 
                                       border border-emerald-500/30 flex-shrink-0">
                            <span className="text-2xl">🎨</span>
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold 
                                          bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent 
                                          leading-tight sm:leading-none truncate">
                                Off-Stage Events
                            </h2>
                            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-emerald-400 to-teal-400 mt-2" />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {offStage.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.08 }}
                            >
                                <EventCard {...event} />
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    )
}
