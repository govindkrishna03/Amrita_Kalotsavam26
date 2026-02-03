'use client'
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const images = [
  "/col1.jpeg",
  "/col2.jpeg",
  "/col3.jpeg",
  "/col4.jpeg",
  "/col5.jpeg",
  "/col6.jpeg",
  "/col7.jpeg",
  "/col8.jpeg",
  "/col9.jpeg",
  "/col1.jpeg",
  "/col2.jpeg",
  "/col3.jpeg",
  "/col4.jpeg",
  "/col5.jpeg",
  "/col6.jpeg",
  "/col7.jpeg",
  "/col8.jpeg",
  "/col9.jpeg",
  "/col10.jpeg"
];

export default function Home() {
  const [currentHouse, setCurrentHouse] = useState(0);
  const houses = ["Anandamayi", "Chinmayi", "Jyothirmayi", "Amritamayi"];
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHouse((prev) => (prev + 1) % houses.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const useIsTouchDevice = () => {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    }, []);

    return isTouch;
  };
  return (
    <main
      className="min-h-screen  bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced 3D Background - Now Interactive! */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            className="h-full w-full"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: isHovered ? 0.45 : 0.25,
              filter: isHovered
                ? "blur(0.5px) brightness(1.1)"
                : "blur(1.2px) brightness(0.9)"

            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}

          >
            <ThreeDMarquee images={images} />
          </motion.div>
        </div>

        {/* Dynamic Gradient Overlay - Dims on hover */}
        <motion.div
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/65 to-black/85"
          animate={{
            opacity: isHovered ? 0.7 : 1
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut"
          }}
        />


        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_60%)]" />

        {/* Animated Content */}
        <motion.div
          className="relative z-20 flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Enhanced Title with Staggered Letters */}
          <motion.h1
            className="font-inter font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent
             text-3xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-tight
             drop-shadow-[0_8px_30px_rgba(255,255,255,0.15)]"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}

          >
            Amrita Kalotsavam 2026
          </motion.h1>


          {/* Responsive Description */}
          <motion.p
            className="mt-8 max-w-md sm:max-w-2xl px-4 text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Amrita Kalotsavam is the annual cultural festival of Amritapuri Campus, bringing together students from the four houses —
            <span className="font-semibold text-white">
              <br className="sm:hidden" /> Anandamayi, Chinmayi, Jyothirmayi, and Amritamayi
            </span>
            <br /> to celebrate talent, tradition, and creativity through vibrant cultural events.
          </motion.p>

          {/* Enhanced CTA Button */}
          <motion.div
            className="mt-12 sm:mt-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 300 }}
          >
            <motion.div
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Link href="/register">
                <Button className="group relative rounded-full bg-gradient-to-r from-white to-gray-100 px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl font-bold text-black shadow-2xl transition-all duration-300 overflow-hidden">
                  Register Now
                </Button>
              </Link>

            </motion.div>
          </motion.div>

          {/* Floating Particles */}
          <div className="absolute inset-0 z-15 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${10 + i * 12}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </section>

    </main>
  );
}
