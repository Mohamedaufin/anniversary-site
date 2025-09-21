"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Loader1 from "@/components/Loader1" // 🔥 NEW Loader1 import
import SecretCode from "@/components/SecretCode" // 🔥 SecretCode import
import Loader from "@/components/Loader"
import Countdown from "@/components/Countdown"
import DaysTogether from "@/components/DaysTogether"
import PhotoGallery from "@/components/PhotoGallery"
import Message from "@/components/Message"
import MusicPlayer from "@/components/MusicPlayer"
import FloatingElements from "@/components/FloatingElements"
import TapToReveal from "@/components/TapToReveal"

// Change this to your anniversary date
const ANNIVERSARY_DATE = "2025-08-05T00:00:00"
// Change this to the date you got together
const TOGETHER_DATE = "2023-05-25T00:00:00"

export default function Home() {
  const [showLoader1, setShowLoader1] = useState(true) // 🔥 Track Loader1
  const [showSecretCode, setShowSecretCode] = useState(false) // 🔥 Track SecretCode
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [showTapToReveal, setShowTapToReveal] = useState(false)
  const [playSong, setPlaySong] = useState(false)

  useEffect(() => {
    const loader1Timer = setTimeout(() => {
      setShowLoader1(false)
      setShowSecretCode(true) // 🔥 Show SecretCode after Loader1
    }, 4000) // 🔥 Loader1 duration
    return () => clearTimeout(loader1Timer)
  }, [])

  useEffect(() => {
    if (!showLoader1 && !showSecretCode) {
      const timer = setTimeout(() => {
        setLoading(false)
      }, 4000) // 🔥 Original Loader duration
      return () => clearTimeout(timer)
    }
  }, [showLoader1, showSecretCode])

  useEffect(() => {
    const now = new Date()
    const anniversary = new Date(ANNIVERSARY_DATE)
    if (now >= anniversary) {
      setShowContent(true)
      setShowTapToReveal(true)
    }
  }, [])

  const handleCountdownComplete = () => {
    setShowContent(true)
    setShowTapToReveal(true)
  }

  const handleReveal = () => {
    setShowTapToReveal(false)
    setShowContent(true)
    setTimeout(() => {
      setPlaySong(true)
    }, 1000)
  }

  const handleUnlock = () => {
    setShowSecretCode(false) // 🔥 Hide SecretCode when correct code is entered
  }

  const photos = [
    { src: "/image2.png", alt: "Special moment" },
    { src: "/image3.png", alt: "Us together" },
    { src: "/image7.png", alt: "Memories" },
    { src: "/image.png", alt: "Happy Times" },
  ]

  const message = `Dear Arshewww,
This journey with you has been the most beautiful adventure of my life. Every moment spent with you feels like a blessing, and I cherish each day we've been together.
From our first meeting to today, you've filled my life with joy, laughter, and unconditional love. Your smile brightens my darkest days, and your love gives me strength when I need it most.
As we celebrate another year together, I want you to know that my love for you grows stronger with each passing day. You are my everything.
Happy Birthday, my love! Here's to many more years of creating beautiful memories together.
With all my heart,
Yours Lovingly,
Mohamed Aufin A R 🖤`

  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{
        background:
          showLoader1 || showSecretCode
            ? "radial-gradient(circle at top left, #1a0b1f, #000000 80%)"
            : "linear-gradient(to bottom right, #fce7f3, #f3e8ff, #dbeafe)",
      }}
    >
      {/* 🔥 Show FloatingElements ONLY when not showing SecretCode */}
      {!showSecretCode && <FloatingElements />}

      <AnimatePresence mode="wait">
        {showLoader1 ? (
          <Loader1 key="loader1" />
        ) : showSecretCode ? (
          <SecretCode key="secretcode" onUnlock={handleUnlock} /> // 🔥 Show SecretCode
        ) : loading ? (
          <Loader key="loader" />
        ) : !showContent ? (
          <motion.div
            key="countdown-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-4 relative"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div
                className="absolute bottom-1/4 left-1/4 w-20 h-6 text-5xl animate-bounce"
                style={{ animationDelay: "1.5s" }}
              >
                💝
              </div>
            </motion.div>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                delay: 0.2,
              }}
              className="text-center mb-12 relative"
            >
              <div className="absolute -top-16 -left-16 w-32 h-32 text-5xl animate-float">🌸</div>
              <div className="absolute -bottom-28 -right-14 w-32 h-32 text-5xl animate-float-delay">
                🌺
              </div>

              <h1 className="text-4xl md:text-5xl py-1.5 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-4 animate-gradient">
                Our Anniversary is Coming!
              </h1>
              <p className="text-xl text-purple-700 font-medium">
                The countdown to our special day ❤️
              </p>
            </motion.div>

            <Countdown targetDate={ANNIVERSARY_DATE} onComplete={handleCountdownComplete} />
          </motion.div>
        ) : showTapToReveal ? (
          <TapToReveal key="tap-to-reveal" onReveal={handleReveal} />
        ) : (
          <>
            {<MusicPlayer playSong={playSong} />}
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="container mx-auto px-4 py-8"
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  delay: 0.3,
                }}
                className="text-center m relative"
              >
                <div className="absolute -top-2 -left-5 md:-left-10 text-5xl md:text-6xl animate-float">🎉</div>
                <div className="absolute -bottom-10 -right-5 md:-bottom-14 md:-right-10 text-5xl md:text-6xl animate-float-delay">
                  🎊
                </div>

                <h1 className="text-4xl md:text-6xl py-1 md:py-2 px-6 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-3 animate-gradient">
                  Happy Anniversary!
                </h1>
                <p className="text-xl text-purple-700 font-medium">
                  Every moment with you is a blessing ❤️
                </p>
              </motion.div>

              <DaysTogether startDate={TOGETHER_DATE} animationDuration={3} />

              <PhotoGallery photos={photos} />

              <Message message={message} />

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center mt-0 mb-16 text-pink-600"
              >
                <p className="text-lg font-medium">
                  ❤️Piriyamaanavaluku, En Piriyaamana Kadhal❤️
                </p>
              </motion.footer>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
