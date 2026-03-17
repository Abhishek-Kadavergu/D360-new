import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "D360 AI Implementation",
    description: "End-to-end deployment of D360 AI tailored to your enterprise. From data assessment to production launch in weeks, not quarters.",
  },
  {
    title: "Custom Model Training",
    description: "Fine-tune D360 AI on your proprietary data. Domain-specific models that understand your industry's language, regulations, and edge cases.",
  },
  {
    title: "Enterprise Integration",
    description: "Seamless connection to your existing stack. SAP, Salesforce, ServiceNow, custom APIs—D360 AI meets your systems where they are.",
  },
  {
    title: "AI Strategy Consulting",
    description: "Senior engineers and data scientists who've deployed AI at scale. We don't write reports—we build architectures and ship code.",
  },
];

const ServicesSection = () => {
  return (
    <section className="gradient-section py-32 px-8" id="services">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">PIAZZA CONSULTING GROUP</div>
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-16">SERVICES</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl p-8 md:p-12 group hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <div className="font-mono text-xs text-primary mb-4 tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-heading text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
