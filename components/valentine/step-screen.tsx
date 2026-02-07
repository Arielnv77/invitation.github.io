"use client"

import React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import Image from "next/image"

interface Step {
  image: string
  question: string
  yesLabel: string
  noLabel: string
}

interface StepScreenProps {
  step: Step
  stepNumber: number
  totalSteps: number
  onYes: () => void
  onNo: () => void
  isFinalStep: boolean
}

function getRandomPosition(
  containerWidth: number,
  containerHeight: number,
  buttonWidth: number,
  buttonHeight: number,
  currentX?: number,
  currentY?: number
) {
  const padding = 8
  const maxX = containerWidth - buttonWidth - padding
  const maxY = containerHeight - buttonHeight - padding
  let newX: number
  let newY: number

  /* Make sure the button moves a meaningful distance from its current spot */
  do {
    newX = Math.random() * Math.max(maxX, 0) + padding
    newY = Math.random() * Math.max(maxY, 0) + padding
  } while (
    currentX !== undefined &&
    currentY !== undefined &&
    Math.abs(newX - currentX) < 60 &&
    Math.abs(newY - currentY) < 60
  )

  return { x: newX, y: newY }
}

export function StepScreen({ step, stepNumber, totalSteps, onYes, onNo, isFinalStep }: StepScreenProps) {
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null)
  const [escapeCount, setEscapeCount] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  /* Reset position when step changes */
  useEffect(() => {
    setNoPosition(null)
    setEscapeCount(0)
  }, [stepNumber])

  const escapeButton = useCallback(() => {
    if (!isFinalStep || !containerRef.current || !noButtonRef.current) return
    const container = containerRef.current.getBoundingClientRect()
    const btn = noButtonRef.current.getBoundingClientRect()

    const pos = getRandomPosition(
      container.width,
      container.height,
      btn.width,
      btn.height,
      noPosition?.x,
      noPosition?.y
    )

    setNoPosition(pos)
    setEscapeCount((c) => c + 1)
  }, [isFinalStep, noPosition])

  /* Prevent touch default so the button escapes before the tap registers */
  const handleTouch = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault()
      escapeButton()
    },
    [escapeButton]
  )

  const escapePhrases = [
    "No",
    "Seguro?",
    "Piensalo...",
    "De verdad??",
    "Imposible",
    "Jajaja no",
    "Nah",
    "Venga ya",
  ]

  const currentNoLabel = isFinalStep && escapeCount > 0
    ? escapePhrases[Math.min(escapeCount, escapePhrases.length - 1)]
    : step.noLabel

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center gap-6"
      style={{ minHeight: isFinalStep && noPosition ? 420 : undefined }}
    >
      {/* Progress dots */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i <= stepNumber - 1 ? "w-6 bg-[hsl(340,65%,47%)]" : "w-2 bg-[hsl(340,30%,75%)]"
            }`}
          />
        ))}
      </div>

      {/* Image */}
      <div className="animate-fade-in-up relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={step.image || "/placeholder.svg"}
          alt={`Momento especial ${stepNumber}`}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 448px) 100vw, 448px"
        />
        <div className="absolute inset-0 rounded-2xl ring-2 ring-[hsl(340,50%,80%)] ring-inset" />
      </div>

      {/* Question */}
      <h2
        className="animate-fade-in-up animate-delay-200 text-balance text-center text-2xl font-semibold leading-relaxed tracking-tight text-[hsl(340,40%,20%)] opacity-0 sm:text-3xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {step.question}
      </h2>

      {/* Buttons */}
      <div className="animate-fade-in-up animate-delay-400 relative flex w-full flex-col items-center gap-3 opacity-0 sm:flex-row sm:justify-center sm:gap-4">
        <button
          type="button"
          onClick={onYes}
          className="w-full cursor-pointer rounded-xl bg-[hsl(340,65%,47%)] px-8 py-3.5 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[hsl(340,70%,42%)] hover:shadow-xl active:scale-95 sm:w-auto"
          style={{ fontFamily: "var(--font-lora), Georgia, serif", animation: "pulse-glow 3s ease-in-out infinite" }}
        >
          {step.yesLabel}
        </button>

        {isFinalStep ? (
          <button
            ref={noButtonRef}
            type="button"
            onMouseEnter={escapeButton}
            onTouchStart={handleTouch}
            className="cursor-pointer select-none rounded-xl border-2 border-[hsl(340,30%,75%)] bg-[hsl(30,40%,96%)] px-8 py-3.5 text-lg font-medium text-[hsl(340,30%,45%)] sm:w-auto"
            style={{
              fontFamily: "var(--font-lora), Georgia, serif",
              ...(noPosition
                ? {
                    position: "absolute",
                    left: `${noPosition.x}px`,
                    top: `${noPosition.y}px`,
                    transition: "left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    zIndex: 50,
                    width: "auto",
                    whiteSpace: "nowrap",
                  }
                : { width: "100%" }),
            }}
          >
            {currentNoLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={onNo}
            className="w-full cursor-pointer rounded-xl border-2 border-[hsl(340,30%,75%)] bg-transparent px-8 py-3.5 text-lg font-medium text-[hsl(340,30%,45%)] transition-all duration-300 hover:scale-105 hover:border-[hsl(340,40%,65%)] hover:bg-[hsl(340,40%,90%)] active:scale-95 sm:w-auto"
            style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
          >
            {step.noLabel}
          </button>
        )}
      </div>
    </div>
  )
}
