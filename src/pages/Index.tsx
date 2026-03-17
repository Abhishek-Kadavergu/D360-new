import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArchitectureSVG from "@/components/ArchitectureSVG";
import NarrativeSection, { NARRATIVE_STEPS } from "@/components/NarrativeSection";
import IgnitionReveal from "@/components/IgnitionReveal";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import { soundEngine } from "@/lib/soundEngine";
import piazzaLogo from "@/assets/piazza-logo.png";
import d360Logo from "@/assets/d360-logo.jpg";

const TOTAL_STEPS = NARRATIVE_STEPS.length;

const Index = () => {
  const [currentStep, setCurrentStep] = useState(-2);
  const [ignited, setIgnited] = useState(false);
  const [narrativeComplete, setNarrativeComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

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
    [narrativeComplete, ignited, soundEnabled, currentStep]
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
    [handleWheel, narrativeComplete, currentStep]
  );

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (!narrativeComplete) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
      return () => {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleWheel, handleTouchStart, handleTouchEnd, narrativeComplete]);

  const architectureProgress = currentStep < 0 ? 0 : Math.min((currentStep + 1) / TOTAL_STEPS, 1);

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
                className="absolute inset-0 flex items-center justify-center z-30 bg-[#060e1a]"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <div className="mb-10 flex justify-center">
                      <img src={piazzaLogo} alt="Piazza Consulting Group" className="h-36 md:h-48 lg:h-56 rounded-2xl shadow-2xl" />
                    </div>
                    <div className="font-mono text-[11px] tracking-[0.5em] text-blue-300/50 mb-8">
                      PIAZZA CONSULTING GROUP PRESENTS
                    </div>
                    <div className="mb-8 flex justify-center">
                      <img src={d360Logo} alt="DOCS360 AI" className="h-20 md:h-28 lg:h-36" />
                    </div>
                    <p className="font-body text-sm text-blue-200/50 mb-12 max-w-[420px] mx-auto leading-relaxed">
                      A multimodal intelligence engine for the enterprise.
                      Documents. Voice. Agents. Workflows.
                    </p>
                    <button
                      onClick={enableSound}
                      className="rounded-full border border-cyan-400/50 text-cyan-300 font-mono text-xs tracking-widest px-10 py-3.5 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 shadow-sm"
                    >
                      ENTER EXPERIENCE ▸
                    </button>
                    <div className="font-mono text-[10px] text-blue-400/40 mt-4">
                      ♪ SOUND RECOMMENDED
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ---- SPLIT SCREEN: LEFT = NARRATIVE, RIGHT = TRANSFORMER ---- */}
          {currentStep >= -1 && currentStep < TOTAL_STEPS && (
            <div className="absolute inset-0 flex flex-col md:flex-row">

              {/* LEFT PANEL — Narrative Text */}
              <div className="w-full md:w-[45%] h-full flex flex-col justify-center relative z-10 px-8 md:px-12 lg:px-16">
                {/* Subtle left panel background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060e1a] via-[#0a1628] to-[#0a1628]/80 md:to-transparent" />

                <div className="relative z-10">
                  {/* Hero intro (step -1) */}
                  {currentStep === -1 && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                    >
                      <div className="font-mono text-[10px] tracking-[0.4em] text-cyan-400/60 mb-6">
                        CONSTRUCTING INTELLIGENCE
                      </div>
                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading text-white mb-6 leading-none">
                        HOW WE<br />BUILD<br />D360 AI
                      </h2>
                      <p className="font-body text-sm text-blue-200/50 mb-10 max-w-[400px] leading-relaxed">
                        Watch the architecture of a multimodal AI model construct itself,
                        layer by layer, as we tell you the story.
                      </p>
                      <div className="font-mono text-xs text-cyan-400 animate-pulse tracking-widest">
                        SCROLL TO BEGIN ↓
                      </div>
                    </motion.div>
                  )}

                  {/* Narrative steps */}
                  {currentStep >= 0 && (
                    <div className="relative">
                      {NARRATIVE_STEPS.map((_, i) => (
                        <NarrativeSection key={i} step={i} currentStep={currentStep} />
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
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#0a1628] to-transparent z-10 hidden md:block" />
                
                <div className="w-full h-full flex items-center justify-center p-0 md:p-2">
                  <div className="w-full h-full">
                    <ArchitectureSVG progress={architectureProgress} ignited={ignited} />
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
        >
          {/* Sticky nav */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-sm border-b border-blue-900/30">
            <div className="max-w-[1100px] mx-auto px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={d360Logo} alt="DOCS360 AI" className="h-7 md:h-8" />
                <span className="font-mono text-[10px] text-blue-300/50 tracking-widest hidden sm:inline">BY PIAZZA</span>
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

          {/* Hero banner */}
          <section className="min-h-screen bg-[#0a1628] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-60">
              <ArchitectureSVG progress={1} ignited={true} />
            </div>
            <div className="relative z-10 text-center px-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5 }}
              >
                <div className="mb-6 flex justify-center">
                  <img src={piazzaLogo} alt="Piazza Consulting Group" className="h-16 md:h-20 rounded-xl shadow-xl" />
                </div>
                <div className="mb-6 flex justify-center">
                  <img src={d360Logo} alt="DOCS360 AI" className="h-14 md:h-20 lg:h-24" />
                </div>
                <div className="font-mono text-sm text-cyan-400/70 tracking-[0.4em] mb-8">
                  MULTIMODAL INTELLIGENCE ENGINE
                </div>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                  {["DOCUMENTS", "VOICE", "AGENTS", "WORKFLOWS"].map((cap) => (
                    <span key={cap} className="font-mono text-[10px] tracking-widest text-cyan-300 border border-cyan-400/30 rounded-full px-5 py-2">
                      {cap}
                    </span>
                  ))}
                </div>
                <p className="font-body text-base text-blue-200/60 max-w-[520px] mx-auto leading-relaxed">
                  One AI that reads every document, processes every voice, deploys autonomous agents,
                  and orchestrates intelligent workflows. Built by Piazza Consulting Group.
                </p>
              </motion.div>
            </div>
          </section>

          <ProductsSection />
          <ServicesSection />
          <TeamSection />
          <ContactSection />
        </motion.div>
      )}
    </div>
  );
};

export default Index;
