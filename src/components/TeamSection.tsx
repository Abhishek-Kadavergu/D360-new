import { motion } from "framer-motion";

const TEAM = [
  { name: "Marco Piazza", role: "Founder & CEO", bio: "Former ML Lead at Google DeepMind. 15 years in applied AI. Built D360 AI from first principles." },
  { name: "Dr. Elena Rossi", role: "Chief Scientist", bio: "PhD Stanford AI Lab. 40+ published papers on transformer architectures and multi-modal learning." },
  { name: "James Chen", role: "Head of Engineering", bio: "Ex-Meta infrastructure. Built ML systems serving 2B+ daily predictions at scale." },
  { name: "Sarah Okafor", role: "VP Product", bio: "Former McKinsey partner turned product leader. Designed the D360 AI Workflow Designer." },
  { name: "Alex Kumar", role: "Lead ML Engineer", bio: "Core PyTorch contributor. Architect of D360 AI's cross-modal attention system." },
  { name: "Dr. Lisa Park", role: "Head of AI Safety", bio: "Ex-OpenAI. Built D360 AI's enterprise safety protocols and alignment framework." },
];

const TeamSection = () => {
  return (
    <section className="py-32 px-8" id="team">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">THE BUILDERS</div>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">TEAM</h2>
          <p className="font-body text-sm text-muted-foreground mb-16 max-w-[500px] leading-relaxed">
            The people behind D360 AI. Engineers, researchers, and strategists who've shipped AI at the world's most demanding scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-8 group hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <div className="w-14 h-14 bg-secondary rounded-full mb-6 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <span className="font-heading text-base text-muted-foreground group-hover:text-primary transition-colors">
                  {member.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <h3 className="font-heading text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                {member.name}
              </h3>
              <div className="font-mono text-[10px] text-primary tracking-widest mb-3">{member.role}</div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
