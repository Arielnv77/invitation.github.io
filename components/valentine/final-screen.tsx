"use client"

import { useEffect, useState } from "react"

function FloatingHeart({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <span
      className="pointer-events-none absolute bottom-0 select-none text-[hsl(340,65%,55%)]"
      style={{
        left,
        fontSize: `${size}px`,
        animation: `floatHearts 3s ease-out ${delay}s infinite`,
        opacity: 0,
      }}
      aria-hidden="true"
    >
      {"♥"}
    </span>
  )
}

export function FinalScreen() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 200)
    return () => clearTimeout(timer)
  }, [])

  if (!showContent) return null

  return (
    <div className="relative flex flex-col items-center gap-6 py-8">
      {/* Floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <FloatingHeart
            key={i}
            delay={i * 0.4}
            left={`${8 + i * 7.5}%`}
            size={16 + (i % 3) * 8}
          />
        ))}
      </div>

      {/* Big heart */}
      <div className="animate-scale-in text-7xl sm:text-8xl" aria-hidden="true">
        {"💕"}
      </div>

      {/* Confirmation message */}
      <h2
        className="animate-fade-in-up animate-delay-200 text-balance text-center text-3xl font-bold leading-snug tracking-tight text-[hsl(340,40%,18%)] opacity-0 sm:text-4xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {"¡Lo sabía, mi amor!"}
      </h2>

      <p
        className="animate-fade-in-up animate-delay-300 max-w-sm text-balance text-center text-lg leading-relaxed text-[hsl(340,25%,35%)] opacity-0"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {"Gracias por estos casi 4 años increíbles. Cada día a tu lado es el mejor regalo. Te amo más de lo que las palabras pueden decir."}
      </p>

      <div
        className="animate-fade-in-up animate-delay-400 mt-2 text-balance text-center text-xl font-semibold italic text-[hsl(340,55%,40%)] opacity-0"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {"Feliz San Valentín, mi vida ♥"}
      </div>

      {/* Decorative divider */}
      <div className="animate-fade-in-up animate-delay-500 flex items-center gap-3 opacity-0">
        <div className="h-px w-12 bg-[hsl(340,40%,70%)]" />
        <span className="text-sm text-[hsl(340,35%,55%)]" style={{ fontFamily: "var(--font-lora), Georgia, serif" }}>
          {"con todo mi amor"}
        </span>
        <div className="h-px w-12 bg-[hsl(340,40%,70%)]" />
      </div>
    </div>
  )
}
