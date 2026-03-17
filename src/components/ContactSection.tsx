import { motion } from "framer-motion";
import piazzaLogo from "@/assets/piazza-logo.png";

const ContactSection = () => {
  return (
    <section className="gradient-section py-32 px-8" id="contact">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">DEPLOY D360 AI</div>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-8">GET STARTED</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-16 max-w-[500px]">
            Tell us about your challenge. We'll respond with architecture, 
            timeline, and a clear path to D360 AI deployment.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-2">NAME</label>
              <input
                type="text"
                className="w-full bg-card border border-border rounded-lg p-4 font-body text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-2">EMAIL</label>
              <input
                type="email"
                className="w-full bg-card border border-border rounded-lg p-4 font-body text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-2">COMPANY</label>
            <input
              type="text"
              className="w-full bg-card border border-border rounded-lg p-4 font-body text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-2">
              WHAT DO YOU NEED D360 AI TO DO?
            </label>
            <textarea
              rows={6}
              className="w-full bg-card border border-border rounded-lg p-4 font-body text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all resize-none"
              placeholder="Describe your document volumes, voice processing needs, automation goals, and what success looks like."
            />
          </div>

          <div>
            <label className="font-mono text-[10px] text-muted-foreground tracking-widest block mb-4">
              D360 AI CAPABILITIES NEEDED
            </label>
            <div className="flex flex-wrap gap-3">
              {["Document Intelligence", "Voice", "Agents", "Workflow Designer", "Custom Model", "Full Platform"].map((cap) => (
                <label key={cap} className="cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground border border-border rounded-full px-4 py-2 inline-block peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/5 hover:border-primary/40 transition-all">
                    {cap.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground font-heading text-sm tracking-widest rounded-full px-12 py-4 hover:opacity-90 transition-opacity mt-4 shadow-md"
          >
            REQUEST ACCESS
          </button>
        </motion.form>
      </div>

      {/* Footer */}
      <div className="max-w-[800px] mx-auto mt-32 pt-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-3">
            <img src={piazzaLogo} alt="Piazza Consulting Group" className="h-10 rounded-md" />
            <div>
              <div className="font-heading text-sm text-foreground">PIAZZA</div>
              <div className="font-mono text-[9px] tracking-widest text-muted-foreground">CONSULTING GROUP</div>
            </div>
          </div>
          <div className="flex gap-8">
            {["products", "services", "team", "contact"].map((s) => (
              <a key={s} href={`#${s}`} className="font-mono text-[10px] tracking-widest text-muted-foreground hover:text-primary transition-colors">
                {s.toUpperCase()}
              </a>
            ))}
          </div>
          <div className="font-mono text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} PIAZZA CONSULTING GROUP
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
