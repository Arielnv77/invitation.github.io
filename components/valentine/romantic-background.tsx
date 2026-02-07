"use client"

const hearts = [
  { left: "5%", delay: 0, duration: 14, size: 18 },
  { left: "15%", delay: 2, duration: 18, size: 14 },
  { left: "25%", delay: 5, duration: 16, size: 20 },
  { left: "35%", delay: 1, duration: 20, size: 12 },
  { left: "45%", delay: 7, duration: 15, size: 22 },
  { left: "55%", delay: 3, duration: 17, size: 16 },
  { left: "65%", delay: 6, duration: 19, size: 14 },
  { left: "75%", delay: 4, duration: 14, size: 18 },
  { left: "85%", delay: 8, duration: 16, size: 12 },
  { left: "95%", delay: 1.5, duration: 21, size: 20 },
]

const bokehLights = [
  { left: "10%", top: "20%", size: 120, delay: 0, color: "rgba(190, 80, 110, 0.12)" },
  { left: "70%", top: "15%", size: 160, delay: 2, color: "rgba(210, 140, 120, 0.10)" },
  { left: "30%", top: "60%", size: 100, delay: 4, color: "rgba(180, 100, 130, 0.10)" },
  { left: "80%", top: "70%", size: 140, delay: 1, color: "rgba(200, 120, 100, 0.08)" },
  { left: "50%", top: "40%", size: 180, delay: 3, color: "rgba(190, 90, 120, 0.06)" },
]

export function RomanticBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Radial gradient overlay: warm cream center fading to soft rose edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, hsl(30, 40%, 96%) 0%, hsl(340, 40%, 90%) 50%, hsl(340, 45%, 85%) 100%)",
        }}
      />

      {/* Bokeh glow circles */}
      {bokehLights.map((light, i) => (
        <div
          key={`bokeh-${i}`}
          className="absolute rounded-full"
          style={{
            left: light.left,
            top: light.top,
            width: light.size,
            height: light.size,
            background: light.color,
            filter: "blur(40px)",
            animation: `bokehGlow ${6 + i * 1.5}s ease-in-out ${light.delay}s infinite`,
          }}
        />
      ))}

      {/* Floating tiny hearts */}
      {hearts.map((heart, i) => (
        <div
          key={`heart-${i}`}
          style={{
            position: "absolute",
            left: heart.left,
            bottom: "-5%",
            animation: `floatUp ${heart.duration}s ease-in-out ${heart.delay}s infinite, driftSide ${heart.duration * 0.7}s ease-in-out ${heart.delay}s infinite`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="hsl(340, 55%, 60%)"
            opacity={0.15}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      {/* Subtle noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  )
}
