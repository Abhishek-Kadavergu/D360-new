import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import piazzaLogo from "@/assets/piazza-logo-bg.png";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10"
      id="contact"
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-400/70 mb-3 uppercase">
            Deploy D360 AI
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            GET STARTED
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Tell us about your challenge. We'll respond with architecture, timeline, and a clear path to D360 AI deployment.
          </p>
        </motion.div>

        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
          className="relative rounded-2xl border border-cyan-400/25 bg-white/[0.03] backdrop-blur-md p-6 md:p-10 shadow-[0_0_40px_rgba(0,240,255,0.08)] glow-border-breathe"
        >
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 rounded-2xl opacity-[0.4] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,240,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,240,255,0.03) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-mono text-[10px] text-cyan-400/80 tracking-widest block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-lg border border-cyan-400/20 bg-transparent px-4 py-3 font-body text-sm text-white placeholder:text-gray-500 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
                />
              </div>
              <div>
                <label className="font-mono text-[10px] text-cyan-400/80 tracking-widest block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-cyan-400/20 bg-transparent px-4 py-3 font-body text-sm text-white placeholder:text-gray-500 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label className="font-mono text-[10px] text-cyan-400/80 tracking-widest block mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                className="w-full rounded-lg border border-cyan-400/20 bg-transparent px-4 py-3 font-body text-sm text-white placeholder:text-gray-500 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-cyan-400/80 tracking-widest block mb-2">
                What do you need D360 AI to do?
              </label>
              <textarea
                rows={5}
                placeholder="Describe your document volumes, voice processing needs, automation goals, and what success looks like."
                className="w-full rounded-lg border border-cyan-400/20 bg-transparent px-4 py-3 font-body text-sm text-white placeholder:text-gray-500 focus:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)] transition-all duration-300 resize-none"
              />
            </div>

            <div>
              <label className="font-mono text-[10px] text-cyan-400/80 tracking-widest block mb-3">
                D360 AI capabilities needed
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Document Intelligence",
                  "Voice",
                  "Agents",
                  "Workflow Designer",
                  "Custom Model",
                  "Full Platform",
                ].map((cap) => (
                  <label key={cap} className="cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <span className="font-mono text-[10px] tracking-widest text-gray-400 border border-cyan-400/25 rounded-full px-3 py-1.5 inline-block peer-checked:border-cyan-400/60 peer-checked:text-cyan-300 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-400/30 hover:border-cyan-400/40 transition-all duration-300">
                      {cap.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group relative inline-flex overflow-hidden rounded-full border border-cyan-400/35 bg-white/5 px-10 py-4 text-sm font-semibold tracking-[0.2em] text-cyan-100 backdrop-blur-md shadow-[0_0_25px_rgba(0,240,255,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)] active:scale-[0.98] animate-premium-pulse"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-200/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">Request Access</span>
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto mt-24 md:mt-32 pt-12 border-t border-cyan-400/15">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex items-center gap-4">
            <img
              src={piazzaLogo}
              alt="Piazza Consulting Group"
              className="h-10 rounded-lg opacity-90"
            />
            <div>
              <div className="font-heading text-sm text-cyan-200/90">Piazza</div>
              <div className="font-mono text-[9px] tracking-widest text-cyan-400/50">
                Consulting Group
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8">
            {["products", "services", "team", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="font-mono text-[10px] tracking-widest text-cyan-400/60 hover:text-cyan-300 transition-colors"
              >
                {s.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="font-mono text-[10px] text-cyan-400/40">
            © {new Date().getFullYear()} Piazza Consulting Group
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
