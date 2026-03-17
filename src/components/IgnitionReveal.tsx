import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import d360Logo from "@/assets/d360-logo-bg.png";
import piazzaLogo from "@/assets/piazza-logo-bg.png";

interface IgnitionRevealProps {
  visible: boolean;
}

const IgnitionReveal = ({ visible }: IgnitionRevealProps) => {
  const [phase, setPhase] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 85, damping: 26, mass: 0.6 });
  const parallaxY = useSpring(mouseY, { stiffness: 85, damping: 26, mass: 0.6 });

  useEffect(() => {
    if (!visible) return;
    const timers = [
      setTimeout(() => setPhase(1), 120),
      setTimeout(() => setPhase(2), 320),
      setTimeout(() => setPhase(3), 760),
      setTimeout(() => setPhase(4), 1120),
      setTimeout(() => setPhase(5), 1380),
    ];
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 z-20 overflow-hidden bg-gradient-to-br from-[#050B18] via-[#071A2D] to-[#02050D]"
      onMouseMove={handleMouseMove}
    >
      {phase >= 1 && (
        <motion.div
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,248,255,0.85),rgba(0,198,255,0.45),transparent_70%)]"
        />
      )}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 activation-particles opacity-35" />
        <div className="absolute inset-0 energy-wave-rise" />
        <div className="absolute inset-0 noise-overlay opacity-[0.1]" />
        <motion.div
          aria-hidden
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[120px] activation-radial-spin"
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="w-full max-w-4xl text-center">
          {phase >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 status-dot-pulse" />
              <div className="font-mono text-[10px] md:text-sm tracking-[0.4em] text-cyan-400/80 uppercase">
                MODEL ONLINE - ALL SYSTEMS OPERATIONAL
              </div>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mb-8 w-fit"
              style={{ x: parallaxX, y: parallaxY }}
            >
              <div className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 bg-cyan-400/20 blur-[80px]" />
              <div className="relative overflow-hidden rounded-2xl d360-logo-float shadow-[0_0_80px_rgba(0,240,255,0.25)]">
                <img
                  src={d360Logo}
                  alt="DOCS360 AI"
                  className="h-24 w-auto md:h-36 lg:h-44 object-contain"
                />
                <span className="d360-shine-sweep pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-200/35 to-transparent" />
              </div>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="mx-auto mb-9 w-fit rounded-2xl border border-cyan-400/20 bg-white/5 px-5 py-4 backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.12)] piazza-card-breathe"
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-300/60">
                POWERED BY
              </div>
              <img
                src={piazzaLogo}
                alt="Piazza Consulting Group"
                className="mx-auto h-16 md:h-20 w-auto rounded-xl"
              />
            </motion.div>
          )}

          {phase >= 5 && (
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-cyan-400/35 bg-white/5 px-10 py-4 text-sm md:text-base font-semibold tracking-[0.16em] text-cyan-100 backdrop-blur-md shadow-[0_0_28px_rgba(0,240,255,0.25)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_46px_rgba(0,240,255,0.45)] active:scale-[0.97] animate-premium-pulse"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">ENTER PLATFORM</span>
            </motion.a>
          )}
          {phase >= 2 && (
            <div className="mt-8 flex justify-center">
              <div className="h-px w-56 bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IgnitionReveal;
