interface NarrativeSectionProps {
  step: number;
  currentStep: number;
}

const NARRATIVE_STEPS = [
  {
    title: "THE VOID",
    subtitle: "WHERE INTELLIGENCE BEGINS",
    body: "Every enterprise drowns in data it cannot read. Documents pile up. Conversations vanish. Decisions stall. Most AI promises transformation. We built one that delivers it.",
    tag: "// initializing D360 AI",
  },
  {
    title: "DOCUMENT INTELLIGENCE",
    subtitle: "D360 AI READS EVERYTHING",
    body: "Contracts. Invoices. Regulatory filings. Handwritten notes. D360 AI doesn't just OCR your documents—it comprehends them. Structural understanding, semantic extraction, cross-reference resolution.",
    tag: "// d360.documents.ingest()",
  },
  {
    title: "VOICE",
    subtitle: "D360 AI LISTENS AND SPEAKS",
    body: "Real-time voice processing with sub-200ms latency. D360 AI Voice transforms conversations into structured intelligence—meeting transcription, sentiment analysis, intent extraction.",
    tag: "// d360.voice.stream()",
  },
  {
    title: "MULTIMODAL FUSION",
    subtitle: "EVERY SIGNAL, ONE BRAIN",
    body: "Text. Voice. Image. Video. D360 AI fuses all modalities through cross-modal attention layers, building a unified representation of your business reality. No silos. No gaps.",
    tag: "// d360.fusion.encode()",
  },
  {
    title: "ATTENTION",
    subtitle: "12 LAYERS OF COMPREHENSION",
    body: "Twelve transformer layers with multi-head self-attention compute relationships between every element of your data simultaneously. Parallel comprehension across 10 billion parameters.",
    tag: "// d360.attention.forward()",
  },
  {
    title: "AGENTS",
    subtitle: "D360 AI ACTS AUTONOMOUSLY",
    body: "D360 AI Agents don't wait for instructions. They observe, reason, and execute. From automated document routing to intelligent email responses to complex multi-step workflows.",
    tag: "// d360.agents.deploy()",
  },
  {
    title: "WORKFLOW DESIGNER",
    subtitle: "ORCHESTRATE INTELLIGENCE",
    body: "Visual workflow orchestration powered by D360 AI. Chain document analysis → voice transcription → agent routing → automated actions. Build intelligence pipelines without writing code.",
    tag: "// d360.workflow.build()",
  },
  {
    title: "OUTPUT",
    subtitle: "DECISIONS, NOT DATA",
    body: "The final projection. 12 billion parameters compressed into a single actionable output. D360 AI doesn't give you dashboards—it gives you decisions.",
    tag: "// d360.output.project()",
  },
];

const NarrativeSection = ({ step, currentStep }: NarrativeSectionProps) => {
  const data = NARRATIVE_STEPS[step];
  if (!data) return null;

  const isActive = step === currentStep;
  const showScrollHint = isActive && step < NARRATIVE_STEPS.length - 1;

  return (
    <div
      className={`transition-all duration-500 absolute inset-0 flex items-center ${
        isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } pointer-events-none`}
    >
      <div className="relative w-full">
        {/* Step counter */}
        <div className="mb-4 font-mono text-[10px] tracking-widest text-cyan-400/60 flex items-center gap-3">
          <span className="text-cyan-400 font-bold text-sm">
            {String(step + 1).padStart(2, "0")}
          </span>
          <span className="w-8 h-px bg-cyan-400/30 inline-block" />
          <span className="text-blue-300/50">{data.subtitle}</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-4xl lg:text-5xl mb-4 text-white font-heading leading-none">
          {data.title}
        </h2>

        {/* Body */}
        <p className="font-body text-lg leading-relaxed text-blue-200/50 max-w-[420px] mb-6">
          {data.body}
        </p>

        {/* Code tag */}
        <div className="font-mono text-[11px] text-cyan-400/30">
          {data.tag}
        </div>

        {showScrollHint && (
          <div className="absolute -bottom-20 right-0 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-200/75">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/45 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.32)]">
              <span className="absolute inset-0 rounded-full border border-cyan-200/40 animate-ping" />
              <span className="relative text-xs text-cyan-100 animate-bounce">↓</span>
            </div>
            <div className="flex flex-col gap-1">
              <span>SCROLL FOR</span>
              <span className="text-cyan-100">NEXT TEXT</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { NARRATIVE_STEPS };
export default NarrativeSection;
