import {
  Music,
  Mic2,
  Sparkles,
  Palette,
  Film,
  BookOpen,
  Mic,
  Drum,
  Smile,
  Theater,
} from "lucide-react"

export const eventIconMap = (eventName: string) => {
  const name = eventName.toLowerCase()

  if (name.includes("music") || name.includes("song") || name.includes("karaoke"))
    return Music

  if (name.includes("dance") || name.includes("thiruvathira") || name.includes("oppana"))
    return Sparkles

  if (name.includes("mono") || name.includes("skit") || name.includes("drama") || name.includes("mime"))
    return Theater

  if (name.includes("elocution") || name.includes("recitation") || name.includes("debate"))
    return Mic

  if (name.includes("instrument") || name.includes("percussion"))
    return Drum

  if (name.includes("fancy") || name.includes("mimicry"))
    return Smile

  if (name.includes("kathakali") || name.includes("ashtapadi") || name.includes("mapilapattu"))
    return Palette

  return Mic2 // default fallback
}
