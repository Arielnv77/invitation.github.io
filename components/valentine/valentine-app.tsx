"use client"

import { useState, useCallback } from "react"
import { StepScreen } from "./step-screen"
import { ThinkAgainScreen } from "./think-again-screen"
import { FinalScreen } from "./final-screen"
import { RomanticBackground } from "./romantic-background"

interface Step {
  image: string
  question: string
  yesLabel: string
  noLabel: string
}

const steps: Step[] = [
  {
    image: "/foto1.jpg",
    question: "¿Te acuerdas de la primera vez que nos vimos?",
    yesLabel: "Cada detalle",
    noLabel: "No mucho...",
  },
  {
    image: "/foto2.jpg",
    question: "¿Sabías que cada día te quiero más que el anterior?",
    yesLabel: "Lo sé, lo siento",
    noLabel: "No me había dado cuenta",
  },
  {
    image: "/foto3.jpg",
    question: "Estos casi 4 años han sido los mejores de mi vida... ¿y los tuyos?",
    yesLabel: "Sin duda alguna",
    noLabel: "Mmm, no sé...",
  },
  {
    image: "/foto4.jpg",
    question: "¿Quieres ser mi San Valentín este año y todos los que vengan?",
    yesLabel: "¡Sí, mi amor!",
    noLabel: "No",
  },
]

export function ValentineApp() {
  const [currentStep, setCurrentStep] = useState(0)
  const [screen, setScreen] = useState<"step" | "think-again" | "final">("step")
  const [isTransitioning, setIsTransitioning] = useState(false)

  const transition = useCallback((callback: () => void) => {
    setIsTransitioning(true)
    setTimeout(() => {
      callback()
      setIsTransitioning(false)
    }, 500)
  }, [])

  const handleYes = useCallback(() => {
    if (currentStep === steps.length - 1) {
      transition(() => setScreen("final"))
    } else {
      transition(() => {
        setCurrentStep((prev) => prev + 1)
        setScreen("step")
      })
    }
  }, [currentStep, transition])

  const handleNo = useCallback(() => {
    transition(() => setScreen("think-again"))
  }, [transition])

  const handleThinkAgainBack = useCallback(() => {
    transition(() => setScreen("step"))
  }, [transition])

  const isFinalStep = currentStep === steps.length - 1

  return (
    <main className="relative flex min-h-svh items-center justify-center overflow-hidden px-4 py-8">
      <RomanticBackground />

      <div
        className={`relative z-10 w-full max-w-lg transition-all duration-500 ${
          isTransitioning ? "animate-fade-out" : "animate-scale-in"
        }`}
      >
        {screen === "step" && (
          <StepScreen
            step={steps[currentStep]}
            stepNumber={currentStep + 1}
            totalSteps={steps.length}
            onYes={handleYes}
            onNo={handleNo}
            isFinalStep={isFinalStep}
          />
        )}

        {screen === "think-again" && <ThinkAgainScreen onBack={handleThinkAgainBack} />}

        {screen === "final" && <FinalScreen />}
      </div>
    </main>
  )
}
