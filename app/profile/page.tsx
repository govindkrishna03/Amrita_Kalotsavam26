'use client'

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { User as UserIcon, Mail, Hash, Castle, LogOut, ArrowLeft, Loader2 } from "lucide-react"

type User = {
  name: string
  email: string
  roll_number: string
  house: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://192.168.29.84:8000/app/details/", {
          method: "GET",
          credentials: "include",
        })

        if (res.status === 401) {
          router.push("/login")
          return
        }

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to load")
        
        setUser(data)
      } catch (err) {
        setError("Could not connect to the server. Check your connection.")
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [router])

  const logout = () => {
    localStorage.removeItem("kalotsavam_session")
    window.location.href = "/login"
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
      <p className="text-gray-400 font-medium animate-pulse">Fetching your details...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-sm">
        <p className="text-red-400 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()} variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
          Try Again
        </Button>
      </div>
    </div>
  )

  if (!user) return null

  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-950 via-gray-950 to-black text-white px-4 py-12 flex items-center justify-center">
      {/* Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-1">
          <div className="bg-gradient-to-b from-white/10 to-transparent p-8 rounded-[inherit]">
            
            {/* Header / Avatar */}
            <div className="flex flex-col items-center mb-8">
              <motion.div 
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                className="relative mb-4"
              >
                <div className="w-28 h-28 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 p-1 rotate-3 shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full rounded-[20px] bg-neutral-900 flex items-center justify-center -rotate-3 overflow-hidden">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-white to-gray-400">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-neutral-950" title="Online" />
              </motion.div>
              
              <h1 className="text-2xl font-bold tracking-tight text-white">{user.name}</h1>
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
                <Mail className="w-3 h-3" /> {user.email}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-3">
              <ProfileItem icon={<Hash className="w-4 h-4" />} label="Roll Number" value={user.roll_number} />
              <ProfileItem 
                icon={<Castle className="w-4 h-4" />} 
                label="House" 
                value={user.house} 
                highlight 
              />
            </div>

            {/* Actions */}
            <div className="mt-10 space-y-3">
              <Button
                onClick={() => router.push("/events")}
                className="w-full h-12 rounded-2xl bg-white text-black hover:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Events
              </Button>

              <button
                onClick={logout}
                className="w-full h-12 rounded-2xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-medium flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout Session
              </button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        {/* <p className="text-center text-gray-500 text-xs mt-6 uppercase tracking-widest font-medium">
          Kalotsavam 2026 • Digital Identity
        </p> */}
      </motion.div>
    </main>
  )
}

function ProfileItem({ icon, label, value, highlight = false }: { icon: any, label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-sm font-medium text-gray-400">{label}</span>
      </div>
      <span className={`text-sm font-mono ${highlight ? 'text-purple-400 font-bold' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}