import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useEffect, useState, type MouseEvent } from "react";
import d360Logo from "@/assets/d360-logo-bg.png";
import piazzaLogo from "@/assets/pcg-logo1.avif";

interface IgnitionRevealProps {
  visible: boolean;
}

const IgnitionReveal = ({ visible }: IgnitionRevealProps) => {
  const [phase, setPhase] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, {
    stiffness: 85,
    damping: 26,
    mass: 0.6,
  });
  const parallaxY = useSpring(mouseY, {
    stiffness: 85,
    damping: 26,
    mass: 0.6,
  });

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

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY],
  );

  if (!visible) return null;

  return (
    <div
      className="absolute inset-0 z-20 overflow-hidden bg-gradient-to-br from-[#EAF4FF] via-[#D6EBFF] to-[#F5FAFF]"
      onMouseMove={handleMouseMove}
    >
      {phase >= 1 && (
        <motion.div
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(135,206,250,0.5),transparent_80%)]"
        />
      )}

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 activation-particles opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0 energy-wave-rise opacity-40 mix-blend-multiply" />
        <div className="absolute inset-0 noise-overlay opacity-[0.05]" />
        <motion.div
          aria-hidden
          style={{ x: parallaxX, y: parallaxY }}
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E90FF]/15 blur-[120px] activation-radial-spin"
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
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1E90FF] status-dot-pulse shadow-[0_0_10px_rgba(30,144,255,0.6)]" />
              <div className="font-mono text-[10px] md:text-sm tracking-[0.4em] text-[#1A2E40] uppercase font-bold">
                MODEL ONLINE - ALL SYSTEMS OPERATIONAL
              </div>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto mb-8 w-fit"
              style={{ x: parallaxX, y: parallaxY }}
            >
              <div className="pointer-events-none absolute -inset-x-10 -inset-y-8 -z-10 bg-[#4DA3FF]/15 blur-[84px]" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-36 w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1E90FF]/10 blur-[78px]" />
              <div className="relative d360-logo-float">
                <img
                  src={d360Logo}
                  alt="DOCS360 AI"
                  className="relative z-10 h-24 w-auto object-contain drop-shadow-[0_8px_32px_rgba(30,144,255,0.2)] md:h-36 lg:h-44"
                />
                <span className="d360-shine-sweep pointer-events-none absolute inset-y-1 left-[8%] w-1/4 bg-gradient-to-r from-transparent via-[#1E90FF]/30 to-transparent blur-[1px]" />
              </div>
            </motion.div>
          )}

          {phase >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
              className="mx-auto mb-9 w-fit rounded-2xl border border-blue-200/50 bg-white/60 px-6 py-5 backdrop-blur-md shadow-[0_12px_40px_rgba(30,144,255,0.15)] piazza-card-breathe"
            >
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.34em] text-[#5B7A99] font-bold">
                POWERED BY
              </div>
              <img
                src={piazzaLogo}
                alt="Piazza Consulting Group"
                className="mx-auto h-16 md:h-16 w-auto rounded-xl shadow-sm"
              />
            </motion.div>
          )}

          {/* {phase >= 5 && (
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-blue-200/50 bg-gradient-to-r from-[#4DA3FF] to-[#1E90FF] px-10 py-4 text-sm md:text-base font-bold tracking-[0.16em] text-white backdrop-blur-md shadow-[0_8px_24px_rgba(30,144,255,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_12px_36px_rgba(30,144,255,0.5)] active:scale-[0.97] animate-premium-pulse"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
              <span className="relative z-10">ENTER PLATFORM</span>
            </motion.a>
          )} */}
          {phase >= 2 && (
            <div className="mt-10 flex justify-center">
              <div className="h-px w-56 bg-gradient-to-r from-transparent via-[#1E90FF]/40 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IgnitionReveal;
