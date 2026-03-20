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
          className="relative overflow-hidden bg-slate-100/80 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/60 transition-[box-shadow,transform] duration-500 group-hover:shadow-[0_28px_60px_-18px_rgba(15,23,42,0.18)]"
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.03,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }
          }
        >
          <img
            src={src}
            alt={alt}
            className={`relative block h-auto w-full object-cover ${
              chaos ? "hero-landing-img-chaos" : "hero-landing-img-clarity"
            }`}
            style={{ transform: "translateZ(0)" }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
