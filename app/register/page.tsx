'use client'

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import { span } from "framer-motion/client"


const images = [
    "/col1.jpeg",
    "/col2.jpeg",
    "/col3.jpeg",
    "/col4.jpeg",
    "/col5.jpeg",
    "/col6.jpeg",
    "/col7.jpeg",
    "/col8.jpeg",
    "/col9.jpeg",
    "/col1.jpeg",
    "/col2.jpeg",
    "/col3.jpeg",
    "/col4.jpeg",
    "/col5.jpeg",
    "/col6.jpeg",
    "/col7.jpeg",
    "/col8.jpeg",
    "/col9.jpeg",
    "/col10.jpeg",

]

export default function LoginPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [house, setHouse] = useState("")
    const [error, setError] = useState("")
    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">

            {/* === BACKGROUND MARQUEE (same as landing, calmer) === */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="h-full w-full"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{
                        scale: 1,
                        opacity: 0.35,
                        filter: "blur(1px) brightness(0.95)",
                    }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <ThreeDMarquee images={images} />
                </motion.div>
            </div>

            {/* === OVERLAYS (same stack as landing) === */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/70 to-black/90" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_65%)]" />

            {/* === LOGIN CARD === */}
            <motion.div
                className="relative z-20 flex min-h-screen items-center justify-center px-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-md shadow-2xl">

                    {/* Title */}
                    <h1 className="text-center text-3xl font-bold tracking-wide">
                        Login
                    </h1>

                    <p className="mt-3 text-center text-sm text-gray-400">
                        Use your official college email to continue
                    </p>

                    {/* Email restriction info */}
                    <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-gray-300">
                        Only emails ending with
                        <span className="mx-1 font-semibold text-white">
                            @am.students.amrita.edu
                        </span>
                        are allowed.
                    </div>

                    <form
                        className="mt-8 space-y-4"
                        onSubmit={async (e) => {
                            e.preventDefault()
                            setError("")

                            if (!name || !email || !house) {
                                setError("All fields are required")
                                return
                            }

                            if (!email.endsWith("@am.students.amrita.edu")) {
                                setError("Please use your college email ID")
                                return
                            }

                            const rollNo = email.split("@")[0].toUpperCase()

                            const user = { name, email, rollNo, house }

                            try {
                                const res = await fetch("http://localhost:8000/api/login/", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(user),
                                })

                                const data = await res.json()

                                if (!res.ok) {
                                    setError(data.message || "Login failed")
                                    return
                                }

                                // ✅ Create frontend session
                                localStorage.setItem("kalotsavam_session", JSON.stringify(data.user))

                                window.location.href = "/events"
                            } catch (err) {
                                setError("Server not reachable")
                            }
                        }}

                    >
                        <input
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                            placeholder="College Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            disabled
                            className="w-full rounded-lg bg-black/20 border border-white/10 px-4 py-3 text-gray-400"
                            placeholder="Roll Number"
                            value={email ? email.split("@")[0].toUpperCase() : ""}

                        />

                        <select
                            className="w-full rounded-lg bg-black  px-4 py-3 text-white"
                            value={house}
                            onChange={(e) => setHouse(e.target.value)}
                        >
                            <option value="">Select House</option>
                            <option value="Anandamayi">Anandamayi</option>
                            <option value="Chinmayi">Chinmayi</option>
                            <option value="Jyothirmayi">Jyothirmayi</option>
                            <option value="Amritamayi">Amritamayi</option>
                        </select>

                        {error && (
                            <p className="text-sm text-red-400">{error}</p>
                        )}

                        <Button
                            type="submit"
                            className="w-full rounded-full bg-gradient-to-r from-white to-gray-100 py-6 text-lg font-bold text-black shadow-xl transition hover:scale-[1.02]"
                        >
                            Continue
                        </Button>
                    </form>


                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3 text-xs text-gray-400">
                        <div className="h-px flex-1 bg-white/10" />
                        secure login
                        <div className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Footer */}
                    {/* <p className="text-center text-xs text-gray-500">
            By continuing, you agree to the Kalotsavam rules and guidelines.
          </p> */}

                    <div className="mt-6 text-center">

                        <span className="text-sm text-gray-400 hover:text-white transition">Already a member?</span>
                        <Link
                            href="/login"
                            className="text-sm text-gray-400 hover:text-white transition"
                        > <b>Go to Login</b>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
