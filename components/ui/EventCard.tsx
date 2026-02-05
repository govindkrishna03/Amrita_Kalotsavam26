'use client'

import { useRouter } from "next/navigation"
import { eventIconMap } from "@/lib/eventicons"

export default function EventCard(event: any) {
  const router = useRouter()
  const Icon = eventIconMap(event.name)

  return (
    <div
      onClick={() => router.push(`/events/${event.id}`)}
      className="cursor-pointer group p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div>
          <h3 className="text-lg font-bold">{event.name}</h3>
          <p className="text-xs text-gray-400">
            {event.category} • {event.type}
          </p>
        </div>
      </div>
    </div>
  )
}
