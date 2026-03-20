import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import piazzaLogo from "@/assets/piazza-logo-bg.png";
import pcgLogo from "@/assets/pcg-logo1.avif";

const ContactSection = () => {
  const ref = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-body text-base text-black placeholder:text-slate-400 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300";

  return (
    <section
      className="relative pt-24 md:pt-32 pb-6 px-6 md:px-10"
      id="contact"
    >
      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-700 mb-3 uppercase">
            D360 AI
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-700 to-blue-700 mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Tell us about your challenge. We'll respond with architecture,
            timeline, and a clear path to D360 AI deployment.
          </p>
        </motion.div>

        <motion.form
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
          className="relative rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-lg shadow-slate-200/60 ring-1 ring-cyan-500/5 text-black text-lg md:text-xl"
        >
          <div
            className="absolute inset-0 rounded-2xl opacity-[0.35] pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                className={inputClass}
              />
            </div>

            <div>
              <label className="font-bold text-base text-gray-700 tracking-widest block mb-2">
                What do you need D360 AI to do?
              </label>
              <textarea
                rows={5}
                placeholder="Describe your document volumes, voice processing needs, automation goals, and what success looks like."
                className={`${inputClass} resize-none`}
              />
            </div>

            <div>
              <label className="font-bold text-base text-gray-700 tracking-widest block mb-3">
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
                    <span className="font-mono text-xs tracking-widest text-gray-700 border border-slate-300 bg-slate-50 rounded-full px-3 py-1.5 inline-block peer-checked:border-cyan-600 peer-checked:bg-cyan-50 peer-checked:text-cyan-900 peer-focus-visible:ring-2 peer-focus-visible:ring-cyan-500/30 hover:border-cyan-400 transition-all duration-300">
                      {cap.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="group relative inline-flex overflow-hidden rounded-full border border-cyan-600 bg-gradient-to-r from-cyan-600 to-cyan-700 px-10 py-4 text-sm font-semibold tracking-[0.2em] text-white shadow-lg shadow-cyan-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-600/30 active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                <span className="relative z-10">Request Access</span>
              </button>
            </div>
          </div>
        </motion.form>
      </div>

      <footer className="relative z-10 max-w-6xl mx-auto mt-24 md:mt-32 mb-0 pt-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:flex-wrap justify-between items-start gap-8 md:gap-10">
          <div className="flex items-center gap-4">
            <img
              src={pcgLogo}
              alt="Piazza Consulting Group"
              className="h-10 rounded-lg"
            />
            {/* <div>
              <div className="font-heading text-sm text-slate-900">Piazza</div>
              <div className="font-mono text-[9px] tracking-widest text-slate-500">
                Consulting Group
              </div>
            </div> */}
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8">
            {["products", "services", "team", "contact"].map((s) => (
              <a
                key={s}
                href={`#${s}`}
                className="font-sans text-base tracking-widest text-gray-900 hover:text-cyan-700 transition-colors"
              >
                {s.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
            © {new Date().getFullYear()} Piazza Consulting Group
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col md:flex-row md:items-start gap-6 md:gap-10">
          <div className="md:flex-1">
            <div className="font-[Poppins] underline text-[18px] tracking-[0.15em] text-green-800 uppercase mb-3">
              Contact Us
            </div>

            <div className="space-y-4 font-mono text-[10px] text-slate-600 leading-relaxed">
              <div>
                <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
                  United States
                </div>
                <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">115 W. Century Road, Suite 130 Paramus, NJ 07652</div>
              </div>

              <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
                <div className="text-gray-800 text-[10px] tracking-[0.16em] uppercase mb-1">
                  India
                </div >
                <div >WAVEROCK</div>
                <div>Level-3 of Tower 2.1</div>
                <div>M/s. TSI Business Parks (Hyderabad) Pvt. Ltd</div>
                <div>Nanakramguda Village</div>
                <div>Serilingampally Mandal</div>
                <div>Ranga Reddy District</div>
                <div>Telangana - 500032</div>
              </div>
            </div>
          </div>

          <div className="md:w-[320px] md:pl-4 md:border-l md:border-slate-200/80 md:-translate-x-3 lg:-translate-x-5">
            <div className="font-[Poppins] underline text-[18px] tracking-[0.15em] text-green-800 uppercase mb-3">
              Visit Us
            </div>

            <div className="font-sans font-semibold text-gray-800 text-[10px] tracking-[0.10em] uppercase mb-1">
              <a
                href="mailto:info@pcongrp.com"
                className="block text-black hover:text-slate-700 transition-colors"
              >
                info@pcongrp.com
              </a>
              <a
                href="tel:8773171680"
                className="block text-black hover:text-slate-700 transition-colors"
              >
                877-317-1680
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ContactSection;
