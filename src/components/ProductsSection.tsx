import { motion } from "framer-motion";

const D360_PRODUCTS = [
  {
    name: "D360 AI Document Intelligence",
    tag: "FLAGSHIP",
    description: "Enterprise-grade document understanding that goes beyond OCR. Structural analysis, semantic extraction, table recognition, cross-document reasoning. Process thousands of documents per minute with 99.2% accuracy.",
    stats: [
      { value: "99.2%", label: "ACCURACY" },
      { value: "<100ms", label: "PER PAGE" },
      { value: "200+", label: "FILE TYPES" },
    ],
    capabilities: ["Contract Analysis", "Invoice Processing", "Regulatory Compliance", "Data Extraction"],
  },
  {
    name: "D360 AI Voice",
    tag: "MULTIMODAL",
    description: "Real-time voice intelligence with sub-200ms latency. Transcription, speaker diarization, sentiment analysis, and intent extraction in 40+ languages.",
    stats: [
      { value: "<200ms", label: "LATENCY" },
      { value: "40+", label: "LANGUAGES" },
      { value: "97.8%", label: "WER" },
    ],
    capabilities: ["Meeting Intelligence", "Call Analytics", "Voice Commands", "Real-time Translation"],
  },
  {
    name: "D360 AI Agents",
    tag: "AUTONOMOUS",
    description: "Self-directed AI agents that observe, reason, and act across your enterprise systems. From automated document routing to intelligent customer responses.",
    stats: [
      { value: "24/7", label: "OPERATION" },
      { value: "85%", label: "AUTOMATION" },
      { value: "∞", label: "SCALABILITY" },
    ],
    capabilities: ["Auto Document Routing", "Email Intelligence", "Decision Automation", "System Integration"],
  },
  {
    name: "D360 AI Workflow Designer",
    tag: "ORCHESTRATION",
    description: "Visual drag-and-drop workflow builder powered by D360 AI. Chain document analysis, voice transcription, agent routing, and automated actions into intelligent pipelines.",
    stats: [
      { value: "10min", label: "TO DEPLOY" },
      { value: "100+", label: "CONNECTORS" },
      { value: "0", label: "CODE NEEDED" },
    ],
    capabilities: ["Visual Pipeline Builder", "Conditional Logic", "Multi-step Automation", "Real-time Monitoring"],
  },
];

const ProductsSection = () => {
  return (
    <section className="py-32 px-8" id="products">
      <div className="max-w-[1100px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="font-mono text-xs tracking-widest text-muted-foreground mb-4">THE D360 AI ECOSYSTEM</div>
          <h2 className="text-4xl md:text-6xl font-heading text-foreground mb-6">
            ONE AI.<br />EVERY CAPABILITY.
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-[600px] leading-relaxed">
            D360 AI isn't a collection of tools. It's a unified intelligence engine 
            where every capability reinforces every other.
          </p>
        </motion.div>

        <div className="space-y-4">
          {D360_PRODUCTS.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border rounded-xl hover:border-primary/30 hover:shadow-lg transition-all duration-500 group"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-primary mb-2 inline-block">
                      {product.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-heading text-foreground group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex gap-6">
                    {product.stats.map((stat) => (
                      <div key={stat.label} className="text-right">
                        <div className="font-heading text-xl md:text-2xl text-primary">{stat.value}</div>
                        <div className="font-mono text-[10px] text-muted-foreground tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8 max-w-[700px]">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.capabilities.map((cap) => (
                    <span
                      key={cap}
                      className="font-mono text-[10px] tracking-widest text-muted-foreground border border-border rounded-full px-4 py-1.5 group-hover:border-primary/20 group-hover:text-foreground transition-all duration-300"
                    >
                      {cap.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
