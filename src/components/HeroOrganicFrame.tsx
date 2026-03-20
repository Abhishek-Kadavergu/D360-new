import { motion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  variant: "chaos" | "clarity";
  reduceMotion: boolean;
  slideFrom: "left" | "right";
};

/**
 * Hero images as plain rectangles — no clip-path, masks, or shaped wrappers.
 */
export function HeroOrganicFrame({
  src,
  alt,
  variant,
  reduceMotion,
  slideFrom,
}: Props) {
  const chaos = variant === "chaos";

  return (
    <motion.div
      className="group relative w-full max-w-[440px] lg:max-w-none"
      initial={{ opacity: 0, x: slideFrom === "left" ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative"
        animate={
          reduceMotion
            ? undefined
            : { y: [0, -5, 0, 4, 0] }
        }
        transition={{
          duration: chaos ? 18 : 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[30px] border border-white/70 bg-slate-100/85 shadow-[0_18px_38px_-22px_rgba(15,23,42,0.35),0_30px_70px_-34px_rgba(14,116,144,0.35)] ring-1 ring-slate-200/70 transition-[box-shadow,transform] duration-500 group-hover:shadow-[0_24px_45px_-22px_rgba(15,23,42,0.4),0_36px_80px_-30px_rgba(6,182,212,0.38)]"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.03,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }
          }
        >
          <div className="pointer-events-none absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/35 via-transparent to-cyan-100/20" />
          <img
            src={src}
            alt={alt}
            className={`relative block h-auto w-full rounded-[28px] object-cover ${
              chaos ? "hero-landing-img-chaos" : "hero-landing-img-clarity"
            }`}
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
