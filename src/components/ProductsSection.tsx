import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import { useCallback, useRef, type MouseEvent } from "react";
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
  },
];

function Stat({
  value,
  label,
  inView,
}: {
  value: string;
  label: string;
  inView: boolean;
}) {
  const numeric = /^[<\d.]+\d*$/.test(value.replace(/[%+ms]/g, ""));
  const display = useCountUp(value, inView && numeric, 1000);
  return (
    <div className="text-center">
      <div className="font-mono text-lg md:text-xl font-bold text-cyan-700 tabular-nums">
        {numeric ? display : value}
      </div>
      <div className="font-mono text-[9px] tracking-widest text-cyan-600/80">
        {label}
      </div>
    </div>
  );
}

const ProductsSection = () => {
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
    [mouseX, mouseY],
  );

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
      id="products"
      onMouseMove={onMouseMove}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Cinematic intro: ONE AI. EVERY CAPABILITY. */}
        <motion.div ref={introRef} className="mb-24 md:mb-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[10px] md:text-xs tracking-[0.45em] text-cyan-700 mb-6 uppercase"
          >
            The D360 AI Ecosystem
          </motion.p>
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={introInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{
                x: useTransform(x, (v: number) => v * 8),
                y: useTransform(y, (v: number) => v * 8),
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] section-title-gradient float-soft"
            >
              ONE AI.
            </motion.h2>
            <motion.h2
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={introInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                x: useTransform(x, (v: number) => v * 6),
                y: useTransform(y, (v: number) => v * 6),
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-[length:200%_auto] section-title-gradient float-soft mt-1"
            >
              EVERY CAPABILITY.
            </motion.h2>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="section-text-sweep absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent" />
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={introInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-6 text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
          >
            One unified intelligence engine. Every capability reinforces every
            other.
          </motion.p>
        </motion.div>

        {/* Ecosystem: premium card grid replacing orbit circles */}
        <motion.div
          ref={ecosystemRef}
          className="relative"
          initial={{ opacity: 0 }}
          animate={ecosystemInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            x: useTransform(x, (v: number) => v * 10),
            y: useTransform(y, (v: number) => v * 8),
          }}
        >
          <motion.div
            className="relative rounded-2xl border border-cyan-500/35 bg-gradient-to-br from-white/95 via-cyan-50/80 to-slate-100/90 p-6 md:p-8 mb-6 md:mb-8 overflow-hidden shadow-[0_22px_70px_rgba(8,145,178,0.16)] glow-border-breathe"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={ecosystemInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="section-text-sweep absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/15 to-transparent" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5 md:gap-8">
              <div className="max-w-2xl">
                <p className="font-mono text-[10px] md:text-[11px] tracking-[0.35em] text-cyan-700/90 uppercase mb-2">
                  D360 Core Intelligence
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 mb-3 font-serif">
                  Unified Orchestration Layer
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  A single runtime that routes context between Documents, Voice,
                  Agents, and Workflow. Shared memory, unified policy control,
                  and one operational surface.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 md:gap-5 md:min-w-[320px]">
                <Stat value="99.99%" label="UPTIME" inView={ecosystemInView} />
                <Stat value="<120ms" label="ROUTING" inView={ecosystemInView} />
                <Stat
                  value="1"
                  label="CONTROL PLANE"
                  inView={ecosystemInView}
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
            {ECOSYSTEM_NODES.map((node, i) => (
              <motion.article
                key={node.id}
                initial={{ opacity: 0, y: 24 }}
                animate={ecosystemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
                className="group relative rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-white/90 via-cyan-50/70 to-slate-100/80 p-5 md:p-6 backdrop-blur-[2px] shadow-[0_14px_42px_rgba(15,23,42,0.08)] hover:shadow-[0_20px_56px_rgba(8,145,178,0.16)] transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(120%_90%_at_10%_0%,rgba(34,211,238,0.15),transparent_55%)]" />
                <div className="relative z-10">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-cyan-700/90 uppercase mb-3">
                    {node.tag}
                  </p>
                  <h4 className="text-2xl font-bold text-slate-800 tracking-tight mb-3 font-serif">
                    {node.name}
                  </h4>
                  <p className="text-slate-600 text-base leading-relaxed mb-5 min-h-[88px]">
                    {node.description}
                  </p>
                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-cyan-700/15">
                    {node.stats.map((s) => (
                      <Stat
                        key={s.label}
                        value={s.value}
                        label={s.label}
                        inView={ecosystemInView}
                      />
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
