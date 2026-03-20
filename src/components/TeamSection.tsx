import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import pcgLogo from "../assets/pcg-logo1.avif";

const TeamSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-10" id="team">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-700 mb-3 uppercase">
            The Builders
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700 mb-4">
            Team
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Engineers, researchers, and strategists who've shipped AI at the
            world's most demanding scale.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="https://piazza-website-beta.vercel.app/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group block focus:outline-none"
            tabIndex={0}
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-500 pointer-events-none" />
            <div className="relative bg-white rounded-3xl border border-slate-200/60 shadow-lg p-4 md:p-6 hover:shadow-2xl hover:border-cyan-400/60 transition-all duration-500 hover:-translate-y-2">
              <div className="flex flex-col items-center space-y-6">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-lg animate-pulse" />
                  <img
                    src={pcgLogo}
                    alt="PCG Logo"
                    className="relative w-32 h-20 md:w-44 md:h-24 object-contain"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center"
                >
                  <span className="inline-flex items-center space-x-2 text-cyan-700 hover:text-cyan-900 font-mono text-sm md:text-base tracking-wide transition-all duration-300 hover:scale-105 group/link">
                    <span>visit the website</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </motion.div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;
