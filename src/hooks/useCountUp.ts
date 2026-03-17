import { useEffect, useState } from "react";

function parseValue(str: string): { numeric: number; suffix: string; prefix: string } {
  const match = str.match(/^([^0-9.]*)([0-9.]+)(.*)$/);
  if (!match) return { prefix: "", numeric: 0, suffix: str };
  const [, prefix = "", num = "0", suffix = ""] = match;
  return { prefix, numeric: parseFloat(num) || 0, suffix };
}

export function useCountUp(
  endLabel: string,
  enabled: boolean,
  durationMs = 1200
): string {
  const { prefix, numeric, suffix } = parseValue(endLabel);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled || numeric === 0) {
      setValue(numeric);
      return;
    }
    let start: number;
    let raf: number;
    const step = (ts: number) => {
      if (start == null) start = ts;
      const elapsed = ts - start;
      const t = Math.min(elapsed / durationMs, 1);
      const easeOut = 1 - Math.pow(1 - t, 2);
      setValue(numeric * easeOut);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, numeric, durationMs]);

  const isDecimal = numeric % 1 !== 0;
  const formatted = value.toFixed(isDecimal ? 1 : 0);
  const display =
    numeric === 0 && endLabel !== "0"
      ? endLabel
      : `${prefix}${formatted}${suffix}`;
  return display;
}
