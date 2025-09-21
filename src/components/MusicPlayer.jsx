"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX } from "lucide-react"

export default function MusicPlayer({ playSong }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef(null)
    const wasPlayingRef = useRef(false) // track if audio was playing before tab hidden

    useEffect(() => {
        audioRef.current = new Audio("/bg.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        audioRef.current.play().then(() => audioRef.current.pause());

        const handleVisibilityChange = () => {
            if (!audioRef.current) return;
            if (document.hidden) {
                // pause when tab is hidden
                wasPlayingRef.current = !audioRef.current.paused;
                audioRef.current.pause();
            } else {
                // resume if it was playing before
                if (wasPlayingRef.current) {
                    audioRef.current.play().catch((err) => console.error("Playback error:", err));
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        if (playSong && audioRef.current && audioRef.current.paused) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((err) => {
                console.error("Playback error:", err);
            });
        }
    }, [playSong]);


    const togglePlayback = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().catch((err) => {
                console.error("Playback error:", err);
            });
            setIsPlaying(true);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed top-4 right-4 z-40"
        >
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={togglePlayback}
                className="bg-white/80 rounded-full cursor-pointer p-3 shadow-lg flex items-center justify-center text-pink-600 hover:bg-pink-50 transition-colors"
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                <motion.div
                    animate={
                        isPlaying
                            ? {
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, 0, -5, 0],
                            }
                            : { scale: 1 }
                    }
                    transition={
                        isPlaying
                            ? {
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }
                            : {}
                    }
                >
                    {isPlaying ? <Volume2 size={22} /> : <VolumeX size={22} />}
                </motion.div>

            </motion.button>
        </motion.div>
    )
}
