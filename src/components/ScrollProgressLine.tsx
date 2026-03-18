import { motion, useScroll, useTransform } from "framer-motion";

const SECTIONS = ["products", "services", "team", "contact"] as const;

interface ScrollProgressLineProps {
  light?: boolean;
}

const ScrollProgressLine = ({ light }: ScrollProgressLineProps) => {
  const { scrollYProgress } = useScroll();
  const fillHeight = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 25, 50, 75, 100]);
  const heightPercent = useTransform(fillHeight, (v) => `${v}%`);

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block" aria-hidden>
      <div className="flex flex-col items-center gap-3">
        <div className={`relative h-32 w-px overflow-hidden rounded-full ${light ? "bg-slate-300" : "bg-cyan-400/20"}`}>
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${light ? "from-cyan-600 to-cyan-500" : "from-cyan-400 to-cyan-300/60"}`}
            style={{ height: heightPercent }}
          />
        </div>
        <div className="flex h-24 flex-col justify-between py-1">
          {SECTIONS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`group flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest transition-colors ${
                light
                  ? "text-slate-500 hover:text-cyan-700"
                  : "text-cyan-400/50 hover:text-cyan-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all ${
                  light
                    ? "bg-slate-400 group-hover:bg-cyan-600 group-hover:shadow-[0_0_6px_rgba(8,145,178,0.45)]"
                    : "bg-cyan-400/30 group-hover:bg-cyan-400 group-hover:shadow-[0_0_6px_rgba(0,240,255,0.6)]"
                }`}
              />
              {id}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollProgressLine;
