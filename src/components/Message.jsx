"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Heart, Sparkles, RotateCcw } from "lucide-react"

export default function Message({ message }) {
  const [currentText, setCurrentText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const lines = message.split("\n")

  // Typing effect inside popup
  useEffect(() => {
    if (isPopupOpen) {
      let index = 0
      const timer = setInterval(() => {
        if (index < message.length) {
          setCurrentText(message.slice(0, index + 1))
          index++
        } else {
          clearInterval(timer)
          setShowCursor(false)

          // ✅ Notify Android that typing is complete
          if (window.AndroidInterface && typeof window.AndroidInterface.showNextButton === "function") {
            window.AndroidInterface.showNextButton()
          }
        }
      }, 35)
      return () => clearInterval(timer)
    }
  }, [isPopupOpen, message])

  // Floating hearts positions and animations
  const floatingHearts = useMemo(() => {
    return Array.from({ length: 8 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      emoji: ["❤️", "💕", "💖", "💘", "💝"][Math.floor(Math.random() * 5)],
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }))
  }, [])

  const typedLines = currentText.split("\n")

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="my-20 max-w-3xl mx-auto relative"
    >
      {!isPopupOpen ? (
        // CLOSED LETTER BOX
        <div className="w-full flex justify-center">
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsPopupOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-80 h-52 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl shadow-2xl border-2 border-pink-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-26 bg-gradient-to-br from-pink-300 to-purple-300 transform origin-top"></div>
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-br from-pink-100 to-purple-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Mail className="w-16 h-16 text-pink-500" />
              </div>
              <div className="absolute top-4 right-4">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Sparkles className="w-6 h-6 text-yellow-500" />
              </div>
              <motion.div
                className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-pink-700 text-base font-semibold"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Click to open
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : (
        // POPUP LETTER
        <AnimatePresence>
          <motion.div
            key="letter"
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl relative z-50"
          >
            {/* Decorative background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-purple-50 opacity-50 pointer-events-none" />

            {/* Border gradients */}
            <div className="absolute top-0 left-0 w-full h-2 rounded-se-lg bg-gradient-to-r from-pink-400 to-purple-400 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-2 rounded-bl-lg bg-gradient-to-r from-purple-400 to-pink-400 pointer-events-none" />

            {/* Decorative circles */}
            <div className="absolute -top-5 -left-5 w-16 h-16 bg-pink-200 rounded-full flex items-center justify-center transform rotate-12 pointer-events-none">
              <span className="text-3xl">💌</span>
            </div>
            <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center transform -rotate-12 pointer-events-none">
              <span className="text-3xl">❤️</span>
            </div>

            {/* Floating hearts */}
            {floatingHearts.map((heart, i) => (
              <motion.div
                key={i}
                className="absolute text-xl pointer-events-none"
                style={{ top: heart.top, left: heart.left, opacity: 0.2 }}
                animate={{ y: [0, -15, 0], rotate: [0, 10, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: heart.duration, repeat: Infinity, ease: "easeInOut", delay: heart.delay }}
              >
                {heart.emoji}
              </motion.div>
            ))}

            {/* Typing text */}
            <div className="relative z-10 text-gray-700 leading-relaxed space-y-4">
              {lines.map((line, index) => {
                const currentLineLength = typedLines.slice(0, index).join("\n").length
                const remainingChars = currentText.length - currentLineLength
                const displayText = remainingChars > 0 ? line.slice(0, remainingChars) : ""

                return (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.08 }}
                    className={`${line.trim() === "" ? "h-4" : ""} ${index === 0 ? "text-xl font-medium text-pink-600" : ""}`}
                  >
                    {displayText}
                    {index === typedLines.length - 1 && showCursor && (
                      <motion.span
                        className="inline-block w-0.5 h-5 bg-purple-600 ml-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    )}
                  </motion.p>
                )
              })}
            </div>

            {/* Close / Reset button */}
            {currentText === message && (
              <motion.div
                className="text-center mt-6 relative z-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  onClick={() => {
                    setIsPopupOpen(false)
                    setCurrentText("")
                    setShowCursor(true)
                  }}
                  className="inline-flex items-center gap-2 bg-white/60 text-pink-600 font-medium border border-pink-400 px-5 py-2 rounded-full hover:bg-pink-100 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Close Letter
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  )
}
