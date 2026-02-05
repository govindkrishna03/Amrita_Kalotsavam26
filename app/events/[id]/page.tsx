'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import RegisterEvent from "@/components/events/RegisterEvent"
import { MOCK_EVENTS } from "@/lib/mockevents"

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState<any>(null)

  useEffect(() => {
    // 🔹 Try backend later – for now fallback to mock
    const mock = MOCK_EVENTS.find(e => e.id === id)
    setEvent(mock)
  }, [id])

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Event not found
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black mb-2">{event.name}</h1>

      <p className="text-gray-400 mb-4">
        {event.category} • {event.type}
      </p>

      <div className="mb-6 space-y-2">
        <p><b>Stage:</b> {event.stage}</p>
        <p><b>Max Participants:</b> {event.maxParticipants}</p>
        <p><b>House Restriction:</b> Same house only</p>
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-2">Coordinators</h3>
        <ul className="list-disc ml-6 text-gray-300">
          {event.coordinators.map((c: any) => (
            <li key={c.phone}>
              {c.name} – {c.phone}
            </li>
          ))}
        </ul>
      </div>

      <RegisterEvent event={event} />
    </main>
  )
}
