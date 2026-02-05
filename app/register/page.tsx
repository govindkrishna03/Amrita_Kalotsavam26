'use client'

import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"

const images = [
    "/col1.jpeg", "/col2.jpeg", "/col3.jpeg", "/col4.jpeg", "/col5.jpeg",
    "/col6.jpeg", "/col7.jpeg", "/col8.jpeg", "/col9.jpeg", "/col10.jpeg",
]

export default function LoginPage() {
    // Step 1: Email Entry | Step 2: OTP + Profile Details
    const [step, setStep] = useState(1)

    // Form States
    const [username, setName] = useState("")
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("") // This will be sent as 'password'
    const [house, setHouse] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    // Step 1: Request OTP
    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        if (!email.endsWith("@am.students.amrita.edu")) {
            setError("Please use your @am.students.amrita.edu email")
            return
        }

        setLoading(true)
        try {
            const res = await fetch("http://192.168.29.84:8000/app/send-otp/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            if (!res.ok) {
                setStep(2)
            } else {
                const data = await res.json()
                setError(data.error || "Failed to send OTP")
            }
        } catch (err) {
            setError("Server not reachable")
        } finally {
            setLoading(false)
        }
    }

    // Step 2: Register using OTP as Password
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Automatically derive roll number from email
        const derivedRollNumber = email.split("@")[0].toUpperCase();

        const payload = {
            username: username,      // From Name input
            email: email,            // From Email input
            password: otp,           // The OTP is the password
            roll_number: derivedRollNumber,
            house: house             // From Select input
        };

        try {
            const res = await fetch("http://192.168.29.84:8000/app/register/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                // Save user info to session so the Events page can use it
                localStorage.setItem("kalotsavam_session", JSON.stringify({
                    email: email,
                    name: username
                }));
                // Redirect to Events
                window.location.href = "/events";
            } else {
                setError(data.error || "Registration failed. Check if OTP is correct.");
            }
        } catch (err) {
            setError("Connection to server failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
            {/* === BACKGROUND MARQUEE === */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    className="h-full w-full"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.35, filter: "blur(1px) brightness(0.95)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <ThreeDMarquee images={images} />
                </motion.div>
            </div>

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
                    <h1 className="text-center text-3xl font-bold tracking-wide">
                        {step === 1 ? "Register" : "Complete Profile"}
                    </h1>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="mt-8 space-y-4"
                                onSubmit={handleRequestOtp}
                            >
                                <input
                                    className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                                    placeholder="College Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Button type="submit" disabled={loading} className="w-full rounded-full bg-white py-6 text-lg font-bold text-black shadow-xl">
                                    {loading ? "Sending..." : "Send OTP"}
                                </Button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mt-8 space-y-4"
                                onSubmit={handleRegister}
                            >
                                <input
                                    className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                                    placeholder="Full Name"
                                    value={username}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <input
                                    className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white text-center text-xl tracking-widest outline-none focus:border-white/30"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                                <select
                                    className="w-full rounded-lg bg-black border border-white/10 px-4 py-3 text-white outline-none focus:border-white/30"
                                    value={house}
                                    onChange={(e) => setHouse(e.target.value)}
                                    required
                                >
                                    <option value="">Select House</option>
                                    <option value="Anandamayi">Anandamayi</option>
                                    <option value="Chinmayi">Chinmayi</option>
                                    <option value="Jyothirmayi">Jyothirmayi</option>
                                    <option value="Amritamayi">Amritamayi</option>
                                </select>
                                <Button type="submit" disabled={loading} className="w-full rounded-full bg-gradient-to-r from-white to-gray-100 py-6 text-lg font-bold text-black shadow-xl">
                                    {loading ? "Verifying..." : "Complete Registration"}
                                </Button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full text-xs text-gray-500 hover:text-white transition"
                                >
                                    Use different email
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>

                    {error && (
                        <p className="mt-4 text-center text-sm text-red-400 font-medium">{error}</p>
                    )}

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-gray-400 hover:text-white transition">
                            Already a member? <b>Go to Login</b>
                        </Link>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}