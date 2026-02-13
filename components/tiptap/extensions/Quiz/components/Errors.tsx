import { Ban } from 'lucide-react'

export default function Errors({ messages }: { messages: string[] }) {
  if (!messages.length) return null

  return (
    <div className="space-y-3">
      {messages.map((m, k) => (
        <div className="flex items-center gap-2" key={k}>
          <Ban className="w-4 h-4 text-destructive" />
          <span className="text-destructive text-sm">{m}</span>
        </div>
      ))}
    </div>
  )
}
