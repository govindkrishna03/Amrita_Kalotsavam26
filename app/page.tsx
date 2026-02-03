'use client'
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

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
              opacity: isHovered ? 0.5 : 0, // Bright on hover!
              filter: isHovered ? "blur(0px) brightness(1.3)" : "blur(1px) brightness(0.8)"
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              opacity: { duration: 0.3 }
            }}
          >
            <ThreeDMarquee images={images} />
          </motion.div>
        </div>

        {/* Dynamic Gradient Overlay - Dims on hover */}
        <motion.div 
          className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/60 to-black/90"
          animate={{ 
            background: isHovered 
              ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.3), rgba(0,0,0,0.6))`
              : [
                  `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6), rgba(0,0,0,0.9))`,
                  `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7), rgba(0,0,0,0.85))`
                ]
          }}
          transition={{ 
            duration: isHovered ? 0.4 : 3, 
            repeat: isHovered ? 0 : Infinity, 
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
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 1, ease: "easeOut" }}
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
              whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)" }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Button className="group relative rounded-full bg-gradient-to-r from-white to-gray-100 px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl font-bold text-black shadow-2xl transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Login with College Email
                  <motion.div 
                    className="h-4 w-4 rounded-sm bg-black"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-10"
                  transition={{ duration: 0.3 }}
                />
              </Button>
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
