import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const SERVICES = [
  {
    num: "01",
    title: "D360 Implementation",
    description:
      "End-to-end deployment of D360 AI tailored to your enterprise. From data assessment to production launch in weeks, not quarters.",
  },
  {
    num: "02",
    title: "Custom Model Training",
    description:
      "Fine-tune D360 AI on your proprietary data. Domain-specific models that understand your industry's language, regulations, and edge cases.",
  },
  {
    num: "03",
    title: "Enterprise Integration",
    description:
      "Seamless connection to your existing stack. SAP, Salesforce, ServiceNow, custom APIs—D360 AI meets your systems where they are.",
  },
  {
    num: "04",
    title: "AI Strategy Consulting",
    description:
      "Senior engineers and data scientists who've deployed AI at scale. We don't write reports—we build architectures and ship code.",
  },
];

const ServicesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10"
      id="services"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-400/70 mb-3 uppercase">
            Piazza Consulting Group
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
            Services
          </h2>
        </motion.div>

        <div ref={ref} className="space-y-0">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative"
            >
              <div className="relative flex flex-col md:flex-row md:items-center gap-4 py-8 md:py-10 border-b border-cyan-400/10 hover:border-cyan-400/25 transition-colors duration-300 overflow-hidden">
                {/* Huge faint background number */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-[12rem] md:text-[14rem] font-extrabold text-cyan-400/[0.06] select-none pointer-events-none leading-none"
                  aria-hidden
                >
                  {service.num}
                </span>

                {/* Left: glowing number + animated underline */}
                <div className="relative flex items-center gap-6 md:w-48 shrink-0">
                  <span className="font-mono text-2xl md:text-3xl font-bold text-cyan-400 drop-shadow-[0_0_12px_rgba(0,240,255,0.4)]">
                    {service.num}
                  </span>
                  <span className="h-px flex-1 max-w-16 bg-gradient-to-r from-cyan-400/60 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>

                {/* Right: title + description */}
                <div className="relative pl-0 md:pl-4">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>

                {/* Left border glow on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/40 transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
