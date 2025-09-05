"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

export default function SecretCode({ onUnlock }) {
  const [code, setCode] = useState("")
  const [isWrong, setIsWrong] = useState(false)

  const secretCode = String.fromCharCode(50, 48, 52, 57) // "2049"

  const heartColors = [
    { id: "white", light: "#ffffff", dark: "#d9d9d9" }, // Pearl White
    { id: "black", light: "#2c2c2c", dark: "#0a0a0a" }, // Onyx Black
    { id: "blue", light: "#93c5fd", dark: "#1e3a8a" }, // Luxury Baby Blue
    { id: "pink", light: "#f9a8d4", dark: "#9d174d" }, // Luxury Baby Pink
  ]

  const handleChange = (e) => setCode(e.target.value)

  const handleUnlock = () => {
    if (code === secretCode) {
      onUnlock()
    } else {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 4000)
      setCode("")
    }
  }

  const maxLength = 4

  // ✅ 3D glossy heart
  const CurvedHeart = ({ colorSet, filled = false, className = "" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <defs>
        <linearGradient id={`grad-${colorSet.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colorSet.light} />
          <stop offset="100%" stopColor={colorSet.dark} />
        </linearGradient>
        <filter id={`bevel-${colorSet.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feOffset dx="0" dy="1" />
          <feGaussianBlur stdDeviation="0.8" result="offset-blur" />
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
          <feFlood floodColor="rgba(0,0,0,0.4)" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <path
        d="M12 21s-6.5-4.33-9.33-8.16C.67 9.67 2.67 4 7.5 4c2.1 0 3.9 1.33 4.5 3.1C12.6 5.33 14.4 4 16.5 4c4.83 0 6.83 5.67 4.83 8.84C18.5 16.67 12 21 12 21z"
        fill={filled ? `url(#grad-${colorSet.id})` : "none"}
        stroke={filled ? "none" : colorSet.dark}
        strokeWidth="2"
        filter={filled ? `url(#bevel-${colorSet.id})` : "none"}
      />
    </svg>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8"
    >
      <div className="w-full max-w-md">
        <motion.div
          animate={{
            rotate: isWrong ? [0, -5, 5, -5, 5, 0] : 0,
            scale: isWrong ? [1, 0.95, 1.05, 0.95, 1] : 1,
          }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 text-center space-y-8">
            <div className="space-y-6">
              <motion.div
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Lock className="w-16 h-16 text-pink-400 mx-auto drop-shadow-lg" />
              </motion.div>
              <div className="space-y-3">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  Secret Gateway
                </h2>
                <motion.p
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-pink-200 text-lg"
                >
                  Enter the code to unlock my heart💕
                </motion.p>
                <p className="text-white/50 text-sm">
                  <span className="text-black/80">💡</span> Hint: My phone password
                </p>
              </div>
            </div>

            {/* Input hearts */}
            <div className="space-y-6">
              <div className="w-full px-6 py-4 bg-white/5 border-2 rounded-2xl text-center text-3xl font-semibold tracking-[0.5em] focus-within:outline-none focus-within:ring-4 transition-all relative">
                {Array.from({ length: maxLength }).map((_, i) =>
                  i < code.length ? (
                    <CurvedHeart
                      key={i}
                      colorSet={heartColors[i % heartColors.length]}
                      filled
                      className="inline w-8 h-8 mx-1"
                    />
                  ) : (
                    <CurvedHeart
                      key={i}
                      colorSet={{ id: "empty", light: "#999", dark: "#444" }}
                      filled={false}
                      className="inline w-8 h-8 mx-1"
                    />
                  )
                )}
                <input
                  type="text"
                  value={code}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault()
                  }}
                  maxLength={maxLength}
                  className="absolute opacity-0 w-full h-full top-0 left-0 cursor-text"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleUnlock}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <CurvedHeart className="w-5 h-5" colorSet={heartColors[0]} filled />
                  Unlock My Heart
                  <CurvedHeart className="w-5 h-5" colorSet={heartColors[0]} filled />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </div>

            {isWrong && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-300 text-sm bg-red-500/10 rounded-full px-4 py-2 border border-red-400/20"
              >
                💕Try again, my love!
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
