import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import ArchitectureSVG from "@/components/ArchitectureSVG";
import NarrativeSection, {
  NARRATIVE_STEPS,
} from "@/components/NarrativeSection";
import IgnitionReveal from "@/components/IgnitionReveal";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgressLine from "@/components/ScrollProgressLine";
import { soundEngine } from "@/lib/soundEngine";
import piazzaLogo from "@/assets/piazza-logo-bg.png";
import d360Logo from "@/assets/d360-logo-bg.png";

const TOTAL_STEPS = NARRATIVE_STEPS.length;

const Index = () => {
  const [currentStep, setCurrentStep] = useState(-2);
  const [ignited, setIgnited] = useState(false);
  const [narrativeComplete, setNarrativeComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const parallaxY = useSpring(mouseY, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const narrativeX = useMotionValue(0);
  const narrativeY = useMotionValue(0);
  const narrativeParallaxX = useSpring(narrativeX, {
    stiffness: 85,
    damping: 24,
    mass: 0.55,
  });
  const narrativeParallaxY = useSpring(narrativeY, {
    stiffness: 85,
    damping: 24,
    mass: 0.55,
  });

  const enableSound = useCallback(async () => {
    await soundEngine.init();
    setSoundEnabled(true);
    soundEngine.playWhoosh();
    setCurrentStep(-1);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (narrativeComplete || currentStep === -2) return;
      e.preventDefault();
      if (isScrolling.current) return;
      isScrolling.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;

      setCurrentStep((prev) => {
        const next = prev + direction;

        if (next >= TOTAL_STEPS) {
          if (!ignited) {
            setIgnited(true);
            if (soundEnabled) soundEngine.playIgnition();
            setTimeout(() => {
              setNarrativeComplete(true);
              if (soundEnabled) soundEngine.playAmbientHum(8);
            }, 4500);
          }
          return TOTAL_STEPS;
        }

        if (next < -1) return -1;

        if (soundEnabled) {
          if (direction > 0) {
            soundEngine.playTransition();
            soundEngine.playNodeConnect();
          } else {
            soundEngine.playWhoosh();
          }
        }

        return next;
      });

      setTimeout(() => {
        isScrolling.current = false;
      }, 700);
    },
    [narrativeComplete, ignited, soundEnabled, currentStep],
  );

  const touchStart = useRef(0);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStart.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (narrativeComplete || currentStep === -2) return;
      const diff = touchStart.current - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        const fakeWheel = new WheelEvent("wheel", { deltaY: diff });
        handleWheel(fakeWheel);
      }
    },
    [handleWheel, narrativeComplete, currentStep],
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (!narrativeComplete) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
      return () => {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleWheel, handleTouchStart, handleTouchEnd, narrativeComplete]);

  const architectureProgress =
    currentStep < 0 ? 0 : Math.min((currentStep + 1) / TOTAL_STEPS, 1);

  const handleSplashMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (currentStep !== -2) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
      mouseX.set(x);
      mouseY.set(y);
    },
    [currentStep, mouseX, mouseY],
  );

  const handleNarrativeMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (currentStep !== -1) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
      narrativeX.set(x);
      narrativeY.set(y);
    },
    [currentStep, narrativeX, narrativeY],
  );

  return (
    <div ref={scrollContainerRef}>
      {/* ====== SPLIT-SCREEN NARRATIVE EXPERIENCE ====== */}
      {!narrativeComplete && (
        <div className="fixed inset-0 z-10 bg-[#0a1628] overflow-hidden">
          {/* ---- SPLASH SCREEN ---- */}
          <AnimatePresence>
            {currentStep === -2 && (
              <motion.div
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                onMouseMove={handleSplashMouseMove}
                className="absolute inset-0 z-30 overflow-hidden bg-gradient-to-br from-[#060B1A] via-[#081426] to-black"
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,240,255,0.14),transparent_60%)]" />
                  <motion.div
                    aria-hidden
                    style={{ x: parallaxX, y: parallaxY }}
                    className="absolute -top-32 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[110px]"
                  />
                  <motion.div
                    aria-hidden
                    style={{ x: parallaxX, y: parallaxY }}
                    className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full bg-sky-400/10 blur-[100px]"
                  />
                  <motion.div
                    aria-hidden
                    style={{ x: parallaxX, y: parallaxY }}
                    className="absolute bottom-[14%] left-[10%] h-52 w-52 rounded-full bg-blue-500/10 blur-[95px]"
                  />
                  <div className="noise-overlay absolute inset-0 opacity-[0.12]" />
                </div>

                <div className="relative z-10 mx-auto w-full max-w-4xl pt-14 px-6 text-center sm:px-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.08,
                      }}
                      className="mb-8 flex justify-center"
                    >
                      
                      <img
                        src={piazzaLogo}
                        alt="Piazza Consulting Group"
                        className="h-24 rounded-2xl shadow-[0_0_60px_rgba(0,255,255,0.15)] md:h-32 lg:h-36"
                      />
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.24 }}
                      className="mb-8 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-400 md:text-xs"
                    >
                      Where Intelligence Becomes Action.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.4 }}
                      className="relative mb-7"
                    >
                      <div className="pointer-events-none absolute inset-0 -z-10 bg-cyan-400/10 blur-3xl" />
                      <img
                        src={d360Logo}
                        alt="DOCS360 AI"
                        className="mx-auto h-auto w-[min(90vw,780px)] max-w-full object-contain"
                      />
                      <div className="mx-auto mt-4 h-px w-44 overflow-hidden rounded-full bg-cyan-200/20">
                        <div className="underline-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                      </div>
                    </motion.div>
                    <motion.p
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.62 }}
                      className="mx-auto mb-11 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl"
                    >
                      A Multimodal Intelligence Engine
                      <br />
                      Built for Enterprise Scale.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 14, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, delay: 0.9 }}
                    >
                      <button
                        onClick={enableSound}
                        className="group relative overflow-hidden rounded-full border border-cyan-400/30 bg-white/5 px-10 py-4 text-lg font-semibold text-cyan-100 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(0,255,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 active:scale-[0.96] shadow-[0_0_25px_rgba(0,255,255,0.4)] animate-premium-pulse"
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                        <span className="absolute inset-0 rounded-full border border-transparent bg-[linear-gradient(110deg,transparent_20%,rgba(0,240,255,0.55)_50%,transparent_80%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="relative z-10 flex items-center gap-3">
                          ENTER EXPERIENCE
                          <span className="text-cyan-200 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-cyan-100 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.9)]">
                            ▸
                          </span>
                        </span>
                      </button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 1.06 }}
                      className="mt-5 font-mono text-[10px] tracking-[0.24em] text-cyan-300/45"
                    >
                      ♪ SOUND RECOMMENDED
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- SPLIT SCREEN: LEFT = NARRATIVE, RIGHT = TRANSFORMER ---- */}
          {currentStep >= -1 && currentStep < TOTAL_STEPS && (
            <div
              className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#050B18] via-[#071A2D] to-[#02050D]"
              onMouseMove={handleNarrativeMouseMove}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_46%,rgba(0,240,255,0.14),transparent_52%)] blur-3xl" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_38%,rgba(99,102,241,0.12),transparent_56%)] blur-3xl" />
                <div className="neural-lines absolute inset-0 opacity-20" />
                <div className="noise-overlay absolute inset-0 opacity-[0.09]" />
              </div>
              <div className="absolute inset-0 flex flex-col md:flex-row">
                {/* LEFT PANEL — Narrative Text */}
                <div className="w-full md:w-[45%] h-full flex flex-col justify-center relative z-10 px-8 md:px-12 lg:px-16">
                  {/* Subtle left panel background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#050B18]/95 via-[#071A2D]/90 to-[#071A2D]/75 md:to-transparent" />
                  <motion.div
                    aria-hidden
                    style={{ x: narrativeParallaxX, y: narrativeParallaxY }}
                    className="absolute -left-16 top-1/3 h-52 w-52 rounded-full bg-cyan-400/10 blur-[90px]"
                  />

                  <div className="relative z-10">
                    {/* Hero intro (step -1) */}
                    {currentStep === -1 && (
                      <div>
                        <motion.div
                          initial={{
                            opacity: 0,
                            letterSpacing: "0.72em",
                            y: 8,
                          }}
                          animate={{ opacity: 1, letterSpacing: "0.5em", y: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: "easeOut",
                            delay: 0.15,
                          }}
                          className="mb-6 font-mono text-xs uppercase tracking-[0.5em] text-cyan-400/85"
                        >
                          CONSTRUCTING INTELLIGENCE
                        </motion.div>
                        <motion.div
                          style={{
                            x: narrativeParallaxX,
                            y: narrativeParallaxY,
                          }}
                          className="relative mb-7"
                        >
                          <div className="pointer-events-none absolute -inset-x-2 -inset-y-4 -z-10 bg-cyan-400/10 blur-3xl animate-title-breathe" />
                          <motion.h2
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.42,
                              ease: "easeOut",
                              delay: 0.32,
                            }}
                            className="construct-title-float bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-6xl font-extrabold leading-[0.9] tracking-tight text-transparent md:text-7xl lg:text-8xl"
                          >
                            HOW WE
                          </motion.h2>
                          <motion.h2
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.42,
                              ease: "easeOut",
                              delay: 0.47,
                            }}
                            className="construct-title-float bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-6xl font-extrabold leading-[0.9] tracking-tight text-transparent md:text-7xl lg:text-8xl"
                          >
                            BUILD
                          </motion.h2>
                          <motion.h2
                            initial={{ opacity: 0, x: -24 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.42,
                              ease: "easeOut",
                              delay: 0.62,
                            }}
                            className="construct-title-float bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-6xl font-extrabold leading-[0.9] tracking-tight text-transparent md:text-7xl lg:text-8xl"
                          >
                            D360 AI
                          </motion.h2>
                        </motion.div>
                        <motion.p
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 0.75 }}
                          className="mb-10 max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed"
                        >
                          Watch a multimodal intelligence architecture assemble
                          in real time, layer by layer, as each system node
                          comes online.
                        </motion.p>
                        <motion.button
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: 0.95 }}
                          className="group flex items-center gap-4 text-cyan-300/90"
                          onClick={() =>
                            handleWheel(
                              new WheelEvent("wheel", { deltaY: 120 }),
                            )
                          }
                        >
                          <span className="relative h-14 w-[1px] overflow-hidden rounded-full bg-cyan-300/25">
                            <span className="scroll-line absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cyan-200 via-cyan-400 to-transparent" />
                          </span>
                          <span className="relative font-mono text-xs tracking-[0.35em]">
                            <span className="inline-block border-b border-cyan-300/40 pb-1 transition-colors duration-300 group-hover:border-cyan-200">
                              SCROLL TO BEGIN
                            </span>
                            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-y-1">
                              ↓
                            </span>
                          </span>
                        </motion.button>
                      </div>
                    )}

                    {/* Narrative steps */}
                    {currentStep >= 0 && (
                      <div className="relative">
                        {NARRATIVE_STEPS.map((_, i) => (
                          <NarrativeSection
                            key={i}
                            step={i}
                            currentStep={currentStep}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Progress bar at bottom of left panel */}
                  <div className="absolute bottom-8 left-8 md:left-12 lg:left-16 z-20 flex items-center gap-2">
                    {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i <= currentStep
                            ? "bg-cyan-400 w-6"
                            : "bg-blue-800/50 w-2"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Step counter */}
                  {currentStep >= 0 && (
                    <div className="absolute top-8 left-8 md:left-12 lg:left-16 z-20 font-mono text-[10px] text-blue-300/40 tracking-widest">
                      LAYER {currentStep + 1} / {TOTAL_STEPS}
                    </div>
                  )}
                </div>

                {/* RIGHT PANEL — Transformer SVG */}
                <div className="w-full md:w-[55%] h-full relative">
                  {/* Subtle edge glow */}
                  <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#071A2D]/90 to-transparent z-10 hidden md:block" />
                  <motion.div
                    aria-hidden
                    style={{ x: narrativeParallaxX, y: narrativeParallaxY }}
                    className="absolute right-10 top-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-[95px]"
                  />

                  <div className="w-full h-full flex items-center justify-center p-0 md:p-2">
                    <div className="w-full h-full">
                      <ArchitectureSVG
                        progress={architectureProgress}
                        ignited={ignited}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ---- IGNITION REVEAL (full screen) ---- */}
          <IgnitionReveal visible={ignited && currentStep >= TOTAL_STEPS} />
        </div>
      )}

      {/* ====== LANDING PAGE (after narrative) ====== */}
      {narrativeComplete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen"
        >
          {/* Sticky nav — dark over hero */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-sm border-b border-blue-900/30">
            <div className="max-w-[1100px] mx-auto px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={d360Logo} alt="DOCS360 AI" className="h-7 md:h-8" />
                <span className="font-mono text-[10px] text-blue-300/50 tracking-widest hidden sm:inline">
                  BY PIAZZA
                </span>
              </div>
              <div className="hidden md:flex gap-8">
                {["products", "services", "team", "contact"].map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    className="font-mono text-[10px] tracking-widest text-blue-300/60 hover:text-cyan-400 transition-colors"
                  >
                    {section.toUpperCase()}
                  </a>
                ))}
              </div>
              <a
                href="#contact"
                className="font-mono text-[10px] tracking-widest text-white bg-cyan-500 rounded-full px-5 py-2 hover:bg-cyan-400 transition-all shadow-sm"
              >
                GET ACCESS
              </a>
            </div>
          </nav>

          {/* Hero — dark area: agent only */}
          <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#050B18] via-[#071A2D] to-[#02050D] pt-20 pb-8">
            <div className="relative z-0 flex flex-1 flex-col items-center justify-center w-full max-w-6xl mx-auto px-4 sm:px-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-[min(85vh,960px)] min-h-[480px] max-h-[960px] flex items-center justify-center"
              >
                <div className="w-full h-full max-w-6xl mx-auto">
                  <ArchitectureSVG progress={1} ignited={true} fitContain />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Light theme: everything below the agent */}
          <div className="relative landing-sections-light text-slate-800">
            <div className="landing-mesh-light" aria-hidden />
            <div className="landing-grain-light" aria-hidden />
            <ScrollProgressLine light />

            <div className="relative z-10 max-w-2xl mx-auto px-6 pt-12 pb-8 text-center border-t border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="font-mono text-xs md:text-sm text-cyan-700 tracking-[0.35em] mb-4">
                  MULTIMODAL INTELLIGENCE ENGINE
                </div>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
                  {["DOCUMENTS", "VOICE", "AGENTS", "WORKFLOWS"].map((cap) => (
                    <span
                      key={cap}
                      className="font-mono text-[10px] tracking-widest text-cyan-800 border border-cyan-600/30 bg-cyan-50/80 rounded-full px-4 py-1.5"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
                <p className="font-body text-sm md:text-base text-slate-600 max-w-[520px] mx-auto leading-relaxed">
                  One AI that reads every document, processes every voice,
                  deploys autonomous agents, and orchestrates intelligent
                  workflows. Built by Piazza Consulting Group.
                </p>
              </motion.div>
            </div>
            <ProductsSection />
            <ServicesSection />
            <TeamSection />
            <ContactSection />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Index;
