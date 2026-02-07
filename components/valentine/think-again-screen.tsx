"use client"

interface ThinkAgainScreenProps {
  onBack: () => void
}

export function ThinkAgainScreen({ onBack }: ThinkAgainScreenProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-12">
      {/* Playful emoji */}
      <div className="animate-fade-in-up text-7xl sm:text-8xl">
        {"😏"}
      </div>

      {/* Message */}
      <h2
        className="animate-fade-in-up animate-delay-200 text-balance text-center text-3xl font-semibold leading-relaxed tracking-tight text-[hsl(340,40%,20%)] opacity-0 sm:text-4xl"
        style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
      >
        {"Piénsalo bien anda"}
      </h2>

      <p
        className="animate-fade-in-up animate-delay-300 text-center text-lg text-[hsl(340,25%,40%)] opacity-0"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {"Sabes que la respuesta correcta es otra..."}
      </p>

      {/* Back button */}
      <button
        type="button"
        onClick={onBack}
        className="animate-fade-in-up animate-delay-400 cursor-pointer rounded-xl bg-[hsl(340,65%,47%)] px-10 py-4 text-lg font-medium text-white opacity-0 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[hsl(340,70%,42%)] hover:shadow-xl active:scale-95"
        style={{ fontFamily: "var(--font-lora), Georgia, serif" }}
      >
        {"Volver a intentar"}
      </button>
    </div>
  )
}
