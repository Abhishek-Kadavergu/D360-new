import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TEAM = [
  {
    name: "Marco Piazza",
    role: "Founder & CEO",
    bio: "Former ML Lead at Google DeepMind. 15 years in applied AI. Built D360 AI from first principles.",
  },
  {
    name: "Dr. Elena Rossi",
    role: "Chief Scientist",
    bio: "PhD Stanford AI Lab. 40+ published papers on transformer architectures and multi-modal learning.",
  },
  {
    name: "James Chen",
    role: "Head of Engineering",
    bio: "Ex-Meta infrastructure. Built ML systems serving 2B+ daily predictions at scale.",
  },
  {
    name: "Sarah Okafor",
    role: "VP Product",
    bio: "Former McKinsey partner turned product leader. Designed the D360 AI Workflow Designer.",
  },
  {
    name: "Alex Kumar",
    role: "Lead ML Engineer",
    bio: "Core PyTorch contributor. Architect of D360 AI's cross-modal attention system.",
  },
  {
    name: "Dr. Lisa Park",
    role: "Head of AI Safety",
    bio: "Ex-OpenAI. Built D360 AI's enterprise safety protocols and alignment framework.",
  },
];

const TeamSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1, once: true });

  return (
    <section
      className="relative py-24 md:py-32 px-6 md:px-10"
      id="team"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-cyan-400/70 mb-3 uppercase">
            The Builders
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-4">
            Team
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
            Engineers, researchers, and strategists who've shipped AI at the world's most demanding scale.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative"
            >
              <div className="relative rounded-2xl border border-cyan-400/20 bg-white/[0.03] backdrop-blur-md p-6 md:p-8 transition-all duration-300 hover:border-cyan-400/40 hover:shadow-[0_0_40px_rgba(0,240,255,0.12)] hover:-translate-y-1">
                {/* Subtle neural pattern behind on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,240,255,0.06),transparent_60%)]" />
                </div>

                <div className="relative">
                  {/* Circular glowing avatar */}
                  <div className="mb-5 flex justify-center md:justify-start">
                    <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-cyan-400/40 bg-cyan-400/10 flex items-center justify-center ecosystem-node-pulse group-hover:border-cyan-400/70 group-hover:shadow-[0_0_24px_rgba(0,240,255,0.3)] transition-all duration-300">
                      <span className="font-mono text-lg font-bold text-cyan-300">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                      <span className="absolute inset-[-2px] rounded-full border border-cyan-400/30 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                    </div>
                  </div>

                  <h3 className="font-heading text-lg text-white mb-1 group-hover:text-cyan-100 transition-colors">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] text-cyan-400/80 tracking-widest mb-3 group-hover:text-cyan-400 transition-colors">
                    {member.role}
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
