'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Search, Sparkles, Music, Mic2, Palette, Film, LayoutGrid } from "lucide-react"
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
    section: "OnStage" | "OffStage" | "Literary"
    image: string
}

const ON_STAGE_EVENTS: Event[] = [
  { id: 101, name: "Classical Music Boys", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 102, name: "Classical Music Girls", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 103, name: "Light Music Girls", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 104, name: "Light Music Boys", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 105, name: "Western Solo Girls", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 106, name: "Western Solo Boys", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 107, name: "Ganamela", category: "Music", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 108, name: "Western Group", category: "Music", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 109, name: "Instrumental Solo Percussion", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 110, name: "Instrumental Solo Non-Percussion", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 111, name: "Jugalbandhi", category: "Music", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 112, name: "Karaoke", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 113, name: "Folk Song", category: "Music", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 114, name: "Sanskrit Song", category: "Music", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 115, name: "Patriotic Song", category: "Music", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 116, name: "Ashtapadi (Girls)", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 117, name: "Ashtapadi (Boys)", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 118, name: "Mapilapattu (Girls)", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 119, name: "Mapilapattu (Boys)", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 120, name: "Kathakali Sangeetham (Girls)", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 121, name: "Kathakali Sangeetham (Boys)", category: "Music", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 122, name: "Classical Dance (Solo Girls)", category: "Dance", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 123, name: "Classical Dance (Solo Boys)", category: "Dance", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 124, name: "Classical Dance (Group Girls)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 125, name: "Classical Dance (Group Boys)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 126, name: "Semi-Classical Dance (Solo Girls)", category: "Dance", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 127, name: "Semi-Classical Dance (Solo Boys)", category: "Dance", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 128, name: "Semi-Classical Dance (Group Girls)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 129, name: "Semi-Classical Dance (Group Boys)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 130, name: "Thiruvathira", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 131, name: "Synchro Dance", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 132, name: "Nostalgia Dance (Girls)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 133, name: "Nostalgia Dance (Boys)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 134, name: "Oppana (Girls)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 135, name: "Folk Group Dance (Girls)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 136, name: "Folk Group Dance (Boys)", category: "Dance", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 137, name: "Mono Act (Girls)", category: "Drama", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 138, name: "Mono Act (Boys)", category: "Drama", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 139, name: "English Drama (Girls)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 140, name: "English Drama (Boys)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 141, name: "Malayalam Drama (Girls)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 142, name: "Malayalam Drama (Boys)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 143, name: "Mime (Boys)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 144, name: "Mime (Girls)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 145, name: "Mimicry (Girls)", category: "Drama", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },
  { id: 146, name: "Mimicry (Boys)", category: "Drama", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 147, name: "Tableau", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 148, name: "Kathaprasangam", category: "Drama", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 149, name: "Movie Spoof", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 150, name: "Shakespearean Monologue", category: "Drama", type: "Solo", stage: "OnStage", section: "OnStage", image: "" },

  { id: 151, name: "Skit (Girls)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 152, name: "Skit (Boys)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },

  { id: 153, name: "One-Act Play (Girls)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
  { id: 154, name: "One-Act Play (Boys)", category: "Drama", type: "Group", stage: "OnStage", section: "OnStage", image: "" },
]


const OFF_STAGE_EVENTS: Event[] = [
  { id: 1, name: "Story Writing (English)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 2, name: "Story Writing (Malayalam)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 3, name: "Essay Writing (English)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 4, name: "Essay Writing (Malayalam)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },

  { id: 5, name: "Poetry Writing (English)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 6, name: "Poetry Writing (Hindi)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 7, name: "Poetry Writing (Tamil)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 8, name: "Poetry Writing (Malayalam)", category: "Literary", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },

  { id: 9, name: "Cartooning", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 10, name: "Water Coloring", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 11, name: "Pencil Drawing", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 12, name: "Face Painting", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 13, name: "Poster Making", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 14, name: "Paper Collage", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 15, name: "Clay Modeling", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 16, name: "Rangoli", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
  { id: 17, name: "Mehandi", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },

  { id: 18, name: "Installation", category: "Art", type: "Group", stage: "OffStage", section: "OffStage", image: "" },
  { id: 19, name: "Spot Photography", category: "Art", type: "Solo", stage: "OffStage", section: "OffStage", image: "" },
]

const LITERARY_EVENTS: Event[] = [
  { id: 201, name: "Elocution (English)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 202, name: "Elocution (Malayalam)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 203, name: "Elocution (Telugu)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 204, name: "Elocution (Tamil)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 205, name: "Elocution (Hindi)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 206, name: "Elocution (Sanskrit)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },

  { id: 207, name: "Recitation (English)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 208, name: "Recitation (Malayalam)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 209, name: "Recitation (Telugu)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 210, name: "Recitation (Tamil)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 211, name: "Recitation (Hindi)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },
  { id: 212, name: "Recitation (Sanskrit)", category: "Literary", type: "Solo", stage: "OnStage", section: "Literary", image: "" },

  { id: 213, name: "Debate (English)", category: "Literary", type: "Group", stage: "OnStage", section: "Literary", image: "" },
  { id: 214, name: "Debate (Malayalam)", category: "Literary", type: "Group", stage: "OnStage", section: "Literary", image: "" },
]

const EVENTS: Event[] = [
    ...ON_STAGE_EVENTS,
    ...OFF_STAGE_EVENTS,
    ...LITERARY_EVENTS,
]

const CATEGORIES = ["All", "Dance", "Music", "Literary", "Art", "Media"]

export default function EventsPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [activeCategory, setActiveCategory] = useState("All")
    const [searchQuery, setSearchQuery] = useState("")
    const [activeSection, setActiveSection] =
        useState<"OnStage" | "OffStage" | "Literary">("OnStage")

    useEffect(() => {
        const session = localStorage.getItem("kalotsavam_session")
        if (!session) {
            router.replace("/login")
            return
        }

        fetch("http://192.168.29.84:8000/app/details/", {
            credentials: "include",
        })
            .then(res => {
                if (!res.ok) throw new Error("Unauthorized")
                return res.json()
            })
            .then(data => setUser(data))
            .catch(() => router.replace("/login"))
    }, [router])

    const filteredEvents = EVENTS.filter(event =>
        event.section === activeSection &&
        event.name.toLowerCase().includes(searchQuery.toLowerCase())
    )


    const onStage = filteredEvents.filter(e => e.stage === "OnStage")
    const offStage = filteredEvents.filter(e => e.stage === "OffStage")

    if (!user) return null

    return (
        <main className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full animate-pulse" />
            </div>

            {/* Navigation Bar */}
            <nav className="sticky top-0 z-[100] border-b border-white/5 bg-black/40 backdrop-blur-md px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {/* <div className="w-8 h-8 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-lg flex items-center justify-center font-black">K</div> */}
                        <span className="font-bold tracking-tight hidden sm:block">ARANGU <span className="text-purple-500">26</span></span>
                    </div>

                    <button
                        onClick={() => router.push("/profile")}
                        className="group flex items-center gap-3 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5 hover:bg-white/10 transition-all"
                    >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs ring-2 ring-purple-500/20 group-hover:scale-110 transition-transform">
                            {user.name.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-gray-300 group-hover:text-white">{user.name.split(' ')[0]}</span>
                    </button>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Hero Header */}
                <header className="mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tighter">
                            DISCOVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">EVENTS</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl text-lg leading-relaxed">
                            Welcome, {user.name.split(' ')[0]}. Ready to showcase your talent? Explore the events and register for your house: <span className="text-purple-400 font-bold">{user.house}</span>.
                        </p>
                    </motion.div>

                    {/* Search & Filter Bar */}
                    <div className="mt-10 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                            />
                        </div>

                        {/* <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat
                                        ? "bg-white text-black"
                                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div> */}
                    </div>
                </header>
                {/* Rules & Limits Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    <div className="relative overflow-hidden group p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Palette className="w-12 h-12" />
                        </div>
                        <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Off-Stage</p>
                        <h3 className="text-lg font-bold">Max 3 Events</h3>
                        <p className="text-gray-500 text-xs mt-1">Arts, Photography, Writing, etc.</p>
                    </div>

                    <div className="relative overflow-hidden group p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Mic2 className="w-12 h-12" />
                        </div>
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">On-Stage Solo</p>
                        <h3 className="text-lg font-bold">Max 4 Events</h3>
                        <p className="text-gray-500 text-xs mt-1">Solo Dance, Music, Monoact, etc.</p>
                    </div>

                    <div className="relative overflow-hidden group p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Music className="w-12 h-12" />
                        </div>
                        <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">On-Stage Group</p>
                        <h3 className="text-lg font-bold">Max 3 Events</h3>
                        <p className="text-gray-500 text-xs mt-1">Group Dance, Band, Mime, etc.</p>
                    </div>
                </motion.div>
                <div className="flex gap-3 mb-10">
                    {["OnStage", "OffStage", "Literary"].map(section => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section as any)}
                            className={`px-6 py-2 rounded-xl font-semibold transition ${activeSection === section
                                ? "bg-white text-black"
                                : "bg-white/5 text-gray-400 hover:bg-white/10"
                                }`}
                        >
                            {section === "OnStage" && "🎤 On Stage"}
                            {section === "OffStage" && "🎨 Off Stage"}
                            {section === "Literary" && "📚 Literary"}
                        </button>
                    ))}
                </div>
                {/* Event Sections */}
                <div className="space-y-24">
                    <EventSection title="On-Stage Highlights" icon={<Mic2 />} events={onStage} gradient="from-orange-500 to-red-500" />
                    <EventSection title="Off-Stage Creations" icon={<Palette />} events={offStage} gradient="from-emerald-500 to-teal-500" />
                </div>
            </div>
        </main>
    )
}

function EventSection({ title, icon, events, gradient }: { title: string, icon: any, events: Event[], gradient: string }) {
    if (events.length === 0) return null;

    return (
        <section>
            <div className="flex items-center gap-4 mb-10">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    {icon}
                </div>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <div className={`h-1 w-12 bg-gradient-to-r ${gradient} mt-1 rounded-full`} />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                        >
                            <EventCard {...event} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}