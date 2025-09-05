"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock, Heart } from "lucide-react"

export default function SecretCode({ onUnlock }) {
  const [code, setCode] = useState("")
  const [isWrong, setIsWrong] = useState(false)

  const secretCode = String.fromCharCode(50, 48, 52, 57) // "2049"
  const heartColors = ["#f472b6", "#facc15", "#60a5fa", "#a78bfa"] // typed hearts colors

  const handleChange = (e) => {
    setCode(e.target.value)
  }

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8"
      style={{ background: "radial-gradient(circle at top left, #1a0b1f, #000000 80%)" }}
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
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
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
                  <span className="text-black/80">💡</span>
                  Hint: My phone password
                </p>
              </div>
            </div>

            {/* Removed onSubmit, handled only by button */}
            <div className="space-y-6">
              <div className="w-full px-6 py-4 bg-white/5 border-2 rounded-2xl text-center text-3xl font-semibold tracking-[0.5em] focus-within:outline-none focus-within:ring-4 transition-all relative">
                {/* Display typed hearts + remaining placeholders */}
                {Array.from({ length: maxLength }).map((_, i) => {
                  if (i < code.length) {
                    return (
                      <Heart
                        key={i}
                        className="inline w-7 h-7 mx-1"
                        style={{ color: heartColors[i % heartColors.length] }}
                        fill="currentColor"
                      />
                    )
                  } else {
                    return (
                      <Heart
                        key={i}
                        className="inline w-7 h-7 mx-1 text-white/40"
                        fill="none"
                      />
                    )
                  }
                })}

                {/* Invisible input */}
                <input
                  type="text"
                  value={code}
                  onChange={handleChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault() // disable Enter key
                    }
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
                  <Heart className="w-5 h-5 fill-current" />
                  Unlock My Heart
                  <Heart className="w-5 h-5 fill-current" />
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
