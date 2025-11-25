"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";

// -------------------------------
// ⭐ Blur Trigger (React–safe)
// -------------------------------
function useBlurTrigger(pathname: string) {
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    // Microtask → no React 19 warnings
    Promise.resolve().then(() => setBlur(true));

    const t = setTimeout(() => setBlur(false), 600);
    return () => clearTimeout(t);
  }, [pathname]);

  return blur;
}

// -------------------------------
// ⭐ Page Animations
// -------------------------------
const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 80,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -80,
    scale: 0.98,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const blur = useBlurTrigger(pathname);

  return (
    <div className="relative w-full h-full overflow-hidden">

      {/* -------------------------------
          🔥 Blur Overlay
      -------------------------------- */}
      <AnimatePresence>
        {blur && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 z-70 pointer-events-none"
            style={{ willChange: "backdrop-filter, opacity" }}
          />
        )}
      </AnimatePresence>

      {/* -------------------------------
          🔥 Page Transition
      -------------------------------- */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 h-full w-full"
          style={{
            willChange: "transform, opacity",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
