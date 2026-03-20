import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, type MouseEvent, type WheelEvent } from "react";
import { HeroOrganicFrame } from "@/components/HeroOrganicFrame";
import leftImage from "@/assets/left-image.png";
import rightImage from "@/assets/right-image.png";

const ARROW_PATH =
  "M 24 118 C 92 28 168 196 200 110 C 232 24 308 192 376 102";

function LandingHero({
  onWheel,
}: {
  onWheel?: (e: WheelEvent<HTMLElement>) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 22 });
  const py = useSpring(my, { stiffness: 50, damping: 22 });
  const leftX = useTransform(px, (v) => v * 0.38);
  const leftY = useTransform(py, (v) => v * 0.32);
  const rightX = useTransform(px, (v) => v * -0.34);
  const rightY = useTransform(py, (v) => v * -0.28);

  const onMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 22);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 22);
  };

  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={wrapRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      className="relative min-h-[min(100vh,940px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-cyan-50/35 pt-24 pb-16 md:pt-28 md:pb-24"
      aria-labelledby="landing-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_65%_at_14%_42%,rgba(148,163,184,0.16),transparent_54%),radial-gradient(ellipse_75%_55%_at_86%_38%,rgba(6,182,212,0.1),transparent_48%),linear-gradient(102deg,rgba(248,250,252,0.95)_0%,rgba(255,255,255,0.98)_48%,rgba(236,254,255,0.88)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 top-[18%] h-[400px] w-[400px] rounded-full bg-cyan-200/22 blur-[96px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-[10%] h-[300px] w-[300px] rounded-full bg-slate-300/18 blur-[88px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-2xl text-left md:mb-12"
        >
          <p className="mb-3 font-mono text-[10px] tracking-[0.35em] text-cyan-700/90 sm:text-[11px]">
            D360AI
          </p>
          <h1
            id="landing-hero-heading"
            className="text-[1.6rem] font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl md:text-[2.55rem] md:leading-[1.08]"
          >
            From Document Chaos to{" "}
            <span className="bg-gradient-to-r from-cyan-700 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
              Instant Intelligence.
            </span>
          </h1>
          {/* <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
            Transform unstructured files into clean, validated, actionable data
            — in seconds using Zero-Shot AI.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-600/30"
            >
              Try It Free
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-white/75 px-8 py-3.5 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-cyan-300/60 hover:bg-white hover:shadow-md"
            >
              Schedule Demo
            </a>
          </div>
          <p className="mt-8 font-mono text-[10px] tracking-[0.1em] text-slate-500 sm:text-[11px]">
            98% Accuracy • 10M+ Documents Processed • GDPR & HIPAA Compliant
          </p> */}
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(96px,150px)_minmax(0,1fr)] lg:gap-3 xl:gap-6">
          <motion.div
            className="flex mt-6 justify-center lg:justify-end lg:pr-1 max-w-[540px] h-[340px]"
            style={{
              x: reduceMotion ? 0 : leftX,
              y: reduceMotion ? 0 : leftY,
            }}
          >
            <HeroOrganicFrame
              src={leftImage}
              alt="Unstructured documents and messy business data"
              variant="chaos"
              reduceMotion={!!reduceMotion}
              slideFrom="left"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.25 }}
            className="relative mx-auto flex w-full  max-w-[540px] h-[340px] items-center justify-center lg:h-[210px] lg:max-w-[150px]"
            aria-hidden
          >
            <div
              className={`absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/28 blur-[44px] ${reduceMotion ? "" : "motion-safe:animate-pulse"}`}
            />
            <svg
              viewBox="0 0 400 220"
              className="relative z-[1] h-[96px] w-full lg:h-[195px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient
                  id="lhArrowGrad"
                  x1="0%"
                  y1="50%"
                  x2="100%"
                  y2="50%"
                >
                  <stop offset="0%" stopColor="rgb(148 163 184)" stopOpacity="0.45" />
                  <stop offset="46%" stopColor="rgb(6 182 212)" stopOpacity="1" />
                  <stop offset="100%" stopColor="rgb(14 165 233)" stopOpacity="0.92" />
                </linearGradient>
                <filter
                  id="lhArrowGlow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="3.2" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <marker
                  id="lhArrowHead"
                  markerWidth="12"
                  markerHeight="12"
                  refX="10"
                  refY="6"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M 0 0 L 12 6 L 0 12 z" fill="rgb(6 182 212)" opacity={0.94} />
                </marker>
              </defs>
              <path
                d={ARROW_PATH}
                stroke="url(#lhArrowGrad)"
                strokeWidth={13}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.18}
                fill="none"
              />
              <motion.path
                d={ARROW_PATH}
                stroke="url(#lhArrowGrad)"
                strokeWidth={3.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                filter="url(#lhArrowGlow)"
                markerEnd="url(#lhArrowHead)"
                initial={{ pathLength: 0, opacity: 0.65 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.path
                d={ARROW_PATH}
                stroke="url(#lhArrowGrad)"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray="10 22"
                initial={{ strokeDashoffset: 460 }}
                animate={
                  reduceMotion ? { strokeDashoffset: 230 } : { strokeDashoffset: 0 }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 3.8, repeat: Infinity, ease: "linear" }
                }
                opacity={0.82}
              />
              {!reduceMotion && (
                <>
                  <circle r="5" fill="rgb(6 182 212)" opacity={0.9}>
                    <animateMotion
                      dur="3.1s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={ARROW_PATH}
                    />
                  </circle>
                  <circle r="2.5" fill="white" opacity={0.95}>
                    <animateMotion
                      dur="3.1s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={ARROW_PATH}
                    />
                  </circle>
                  <circle r="3.2" fill="rgb(125 211 252)" opacity={0.55}>
                    <animateMotion
                      dur="3.1s"
                      begin="1s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path={ARROW_PATH}
                    />
                  </circle>
                </>
              )}
            </svg>
          </motion.div>

          <motion.div
            className="flex justify-center lg:justify-start lg:pl-1"
            style={{
              x: reduceMotion ? 0 : rightX,
              y: reduceMotion ? 0 : rightY,
            }}
          >
            <HeroOrganicFrame
              src={rightImage}
              alt="Structured intelligence and validated outputs"
              variant="clarity"
              reduceMotion={!!reduceMotion}
              slideFrom="right"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LandingHero;
