'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Hash, Home, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react"

type Participant = {
  name: string
  rollNo: string
  house: string
}

export default function RegisterEvent({ event }: { event: any }) {
  const [participants, setParticipants] = useState<Participant[]>([
    { name: "", rollNo: "", house: "" }
  ])
  const [loading, setLoading] = useState(false)

  const max = event.type === "Solo" ? 1 : (event.maxParticipants || 10)

  const addParticipant = () => {
    if (participants.length < max) {
      setParticipants([...participants, { name: "", rollNo: "", house: "" }])
    }
  }

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const newParticipants = participants.filter((_, i) => i !== index)
      setParticipants(newParticipants)
    }
  }

  const update = (i: number, field: keyof Participant, value: string) => {
    const copy = [...participants]
    copy[i] = { ...copy[i], [field]: value }
    setParticipants(copy)
  }

  const submit = async () => {
    const primaryHouse = participants[0].house.trim().toLowerCase()
    
    if (!participants.every(p => p.house.trim().toLowerCase() === primaryHouse)) {
      alert("All participants must be from the same house")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("http://192.168.29.84:8000/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          eventId: event.id,
          participants
        })
      })

      if (response.ok) {
        alert("Registered successfully! Good luck!")
      }
    } catch (error) {
      alert("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-black tracking-tight text-white">EVENT REGISTRATION</h3>
          <p className="text-gray-400 text-sm">{event.name} • {event.type}</p>
        </div>
        <div className="px-4 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
          <span className="text-xs font-bold text-purple-400 uppercase">
            {participants.length} / {max} Slots
          </span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {participants.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative p-5 rounded-2xl bg-black/20 border border-white/5 space-y-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Participant {i + 1}
                </span>
                {i > 0 && (
                  <button onClick={() => removeParticipant(i)} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    placeholder="Full Name"
                    value={p.name}
                    onChange={e => update(i, "name", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-gray-600"
                  />
                </div>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    placeholder="Roll No"
                    value={p.rollNo}
                    onChange={e => update(i, "rollNo", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-gray-600"
                  />
                </div>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    placeholder="House"
                    value={p.house}
                    onChange={e => update(i, "house", e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-white placeholder:text-gray-600"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {event.type === "Group" && participants.length < max && (
        <button
          onClick={addParticipant}
          className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors mb-8 group"
        >
          <div className="w-6 h-6 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20">
            <Plus size={14} />
          </div>
          Add Team Member
        </button>
      )}

      <button
        onClick={submit}
        disabled={loading}
        className="relative w-full group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-2xl font-black text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all active:scale-[0.98] disabled:opacity-50"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? "PROCESSING..." : "CONFIRM REGISTRATION"}
          {!loading && <CheckCircle2 size={18} />}
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
      </button>

      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
        <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
        <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider">
          Double check your Roll Numbers. Registrations are final once submitted. 
          Team members must belong to <span className="text-orange-500 font-bold">{participants[0].house || "the same house"}</span>.
        </p>
      </div>
    </div>
  )
}