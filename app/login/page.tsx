'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ThreeDMarquee } from "@/components/ui/3d-marquee"
import Link from "next/link"
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL!
const images = [
  "/col1.jpeg", "/col2.jpeg", "/col3.jpeg", "/col4.jpeg", "/col5.jpeg",
  "/col6.jpeg", "/col7.jpeg", "/col8.jpeg", "/col9.jpeg", "/col10.jpeg",
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") // This is the OTP received during registration
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      let data: any = {}
      try {
        data = await res.json()
      } catch { }

      if (!res.ok) {
        setError(data.error || "Invalid email or password")
        return
      }

      localStorage.setItem("access", data.access)
      localStorage.setItem("refresh", data.refresh)
      localStorage.setItem(
        "kalotsavam_session",
        JSON.stringify(data.user)
      )

      window.location.href = "/events"
    } catch {
      setError("Server not reachable")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Background Marquee */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.35, filter: "blur(1px) brightness(0.95)" }}
          transition={{ duration: 1.2 }}
        >
          <ThreeDMarquee images={images} />
        </motion.div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 to-black/90" />

      {/* Login Card */}
      <motion.div
        className="relative z-20 flex min-h-screen items-center justify-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-md shadow-2xl">
          <h1 className="text-center text-3xl font-bold tracking-tight">Login</h1>
          {/* <p className="mt-3 text-center text-sm text-gray-400">
            Use the credentials sent to your email
          </p> */}

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
            <div>
              <input
                type="email"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/40 transition"
                placeholder="College Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3 text-white outline-none focus:border-white/40 transition"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full bg-white hover:bg-gray-200 text-black font-bold py-6 shadow-lg"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>

          {error && (
            <p className="mt-4 text-sm text-red-400 text-center font-medium">
              {error}
            </p>
          )}

          <div className="mt-8 text-center border-t border-white/5 pt-6">
            <span className="text-sm text-gray-500">Don&apos;t have an account? </span>
            <Link href="/register" className="text-sm font-semibold text-white hover:text-gray-300">
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  )
}