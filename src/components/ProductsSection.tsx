import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useCallback, useRef, useState, type MouseEvent } from "react";
import { useCountUp } from "@/hooks/useCountUp";

const ECOSYSTEM_NODES = [
  {
    id: "documents",
    name: "Documents",
    tag: "FLAGSHIP",
    description:
      "Enterprise-grade document understanding beyond OCR. Structural analysis, semantic extraction, table recognition. Process thousands of documents per minute.",
    stats: [
      { value: "99.2%", label: "ACCURACY" },
      { value: "<100ms", label: "PER PAGE" },
      { value: "200+", label: "FILE TYPES" },
    ],
    angle: 0,
  },
  {
    id: "voice",
    name: "Voice",
    tag: "MULTIMODAL",
    description:
      "Real-time voice intelligence with sub-200ms latency. Transcription, speaker diarization, sentiment and intent in 40+ languages.",
    stats: [
      { value: "<200ms", label: "LATENCY" },
      { value: "40+", label: "LANGUAGES" },
      { value: "97.8%", label: "WER" },
    ],
    angle: 90,
  },
  {
    id: "agents",
    name: "Agents",
    tag: "AUTONOMOUS",
    description:
      "Self-directed AI agents that observe, reason, and act across your systems. Automated routing, intelligent responses, decision automation.",
    stats: [
      { value: "24/7", label: "OPERATION" },
      { value: "85%", label: "AUTOMATION" },
      { value: "∞", label: "SCALABILITY" },
    ],
    angle: 180,
  },
  {
    id: "workflow",
    name: "Workflow",
    tag: "ORCHESTRATION",
    description:
      "Visual workflow builder. Chain document analysis, voice, agents, and actions into intelligent pipelines. No code required.",
    stats: [
      { value: "10min", label: "TO DEPLOY" },
      { value: "100+", label: "CONNECTORS" },
      { value: "0", label: "CODE" },
    ],
    angle: 270,
  },
];

const RAD = Math.PI / 180;

function Stat({ value, label, inView }: { value: string; label: string; inView: boolean }) {
  const numeric = /^[<\d.]+\d*$/.test(value.replace(/[%+ms]/g, ""));
  const display = useCountUp(value, inView && numeric, 1000);
  return (
    <div className="text-center">
      <div className="font-mono text-lg md:text-xl font-bold text-cyan-300 tabular-nums">
        {numeric ? display : value}
      </div>
      <div className="font-mono text-[9px] tracking-widest text-cyan-400/60">{label}</div>
    </div>
  );
}

const ProductsSection = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const introInView = useInView(introRef, { amount: 0.3, once: true });
  const ecosystemInView = useInView(ecosystemRef, { amount: 0.15, once: true });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 80, damping: 24 });
  const y = useSpring(mouseY, { stiffness: 80, damping: 24 });

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      id="products"
      onMouseMove={onMouseMove}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cinematic intro: ONE AI. EVERY CAPABILITY. */}
        <motion.div
          ref={introRef}
          className="mb-24 md:mb-32 text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] md:text-xs tracking-[0.45em] text-cyan-400/70 mb-6 uppercase"
          >
            The D360 AI Ecosystem
          </motion.p>
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={introInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ x: useTransform(x, (v: number) => v * 8), y: useTransform(y, (v: number) => v * 8) }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-[length:200%_auto] section-title-gradient float-soft"
            >
              ONE AI.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={introInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ x: useTransform(x, (v: number) => v * 6), y: useTransform(y, (v: number) => v * 6) }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-[length:200%_auto] section-title-gradient float-soft mt-1"
            >
              EVERY CAPABILITY.
            </motion.h2>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="section-text-sweep absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-200/20 to-transparent" />
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            One unified intelligence engine. Every capability reinforces every other.
          </motion.p>
        </motion.div>

        {/* Ecosystem: central core + orbit nodes */}
        <motion.div
          ref={ecosystemRef}
          className="relative min-h-[520px] md:min-h-[580px] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={ecosystemInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Connection lines (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,240,255,0.15)" />
                <stop offset="50%" stopColor="rgba(0,240,255,0.4)" />
                <stop offset="100%" stopColor="rgba(0,240,255,0.15)" />
              </linearGradient>
            </defs>
            {ECOSYSTEM_NODES.map((node) => {
              const cx = 50;
              const cy = 50;
              const r = 38;
              const ex = 50 + r * Math.cos((node.angle - 90) * RAD);
              const ey = 50 + r * Math.sin((node.angle - 90) * RAD);
              return (
                <line
                  key={node.id}
                  x1={cx}
                  y1={cy}
                  x2={ex}
                  y2={ey}
                  stroke="url(#lineGrad)"
                  strokeWidth="0.4"
                />
              );
            })}
          </svg>

          {/* Central D360 Core */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={ecosystemInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center ecosystem-node-pulse shadow-[0_0_40px_rgba(0,240,255,0.2)]">
              <span className="font-mono text-[10px] md:text-xs font-bold text-cyan-300 tracking-widest text-center leading-tight">
                D360<br />CORE
              </span>
            </div>
          </motion.div>

          {/* Orbit nodes */}
          {ECOSYSTEM_NODES.map((node, i) => {
            const r = 38;
            const ex = 50 + r * Math.cos((node.angle - 90) * RAD);
            const ey = 50 + r * Math.sin((node.angle - 90) * RAD);
            const isActive = activeId === node.id;
            return (
              <motion.div
                key={node.id}
                className="absolute z-20"
                style={{ left: `${ex}%`, top: `${ey}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  ecosystemInView
                    ? { opacity: 1, scale: 1 }
                    : {}
                }
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              >
                <motion.button
                  type="button"
                  className="group flex flex-col items-center gap-1 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  onMouseEnter={() => setActiveId(node.id)}
                  onMouseLeave={() => setActiveId(null)}
                  animate={{ scale: isActive ? 1.12 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "border-cyan-400/70 bg-cyan-400/20 shadow-[0_0_32px_rgba(0,240,255,0.4)]"
                        : "border-cyan-400/30 bg-cyan-400/5 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                    }`}
                  >
                    <span className="font-mono text-[9px] md:text-[10px] font-bold text-cyan-300 tracking-wider">
                      {node.name.toUpperCase()}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-xl border border-cyan-400/25 bg-[#071A2D]/95 backdrop-blur-md p-4 text-left shadow-[0_0_30px_rgba(0,240,255,0.15)]"
                      style={{ zIndex: 30 }}
                    >
                      <div className="font-mono text-[9px] text-cyan-400/80 tracking-widest mb-2">
                        {node.tag}
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">
                        {node.description}
                      </p>
                      <div className="flex gap-4 justify-between">
                        {node.stats.map((s) => (
                          <Stat
                            key={s.label}
                            value={s.value}
                            label={s.label}
                            inView={isActive}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
