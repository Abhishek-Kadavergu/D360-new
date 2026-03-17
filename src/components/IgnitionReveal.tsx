import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import d360Logo from "@/assets/d360-logo.jpg";
import piazzaLogo from "@/assets/piazza-logo.png";

interface IgnitionRevealProps {
  visible: boolean;
}

const IgnitionReveal = ({ visible }: IgnitionRevealProps) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      {/* Radial glow */}
      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, rgba(59,158,255,0.15), transparent 70%)" }}
        />
      )}

      <div className="text-center">
        {phase >= 1 && (
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1 }}
          >
            <div className="font-mono text-xs tracking-[0.3em] text-cyan-400/70 mb-8">
              MODEL ONLINE — ALL SYSTEMS OPERATIONAL
            </div>
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center mb-6"
          >
            <img src={piazzaLogo} alt="Piazza Consulting Group" className="h-20 md:h-28 rounded-xl shadow-xl mb-6" />
            <img src={d360Logo} alt="DOCS360 AI" className="h-20 md:h-32 lg:h-40" />
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="font-mono text-sm tracking-[0.4em] text-blue-300/60 mb-8">
              BY PIAZZA CONSULTING GROUP
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {["DOCUMENTS", "VOICE", "AGENTS", "WORKFLOWS"].map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="border border-cyan-400/30 rounded-full px-5 py-2 font-mono text-xs text-cyan-300 tracking-widest"
                >
                  {cap}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-xs text-cyan-400/50 tracking-widest"
          >
            SCROLL TO EXPLORE ↓
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default IgnitionReveal;
