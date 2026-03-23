/**
 * Removes third-party dev/preview toolbars (e.g. Lovable iframe "Send element" / "Send console errors")
 * that are injected outside normal app code. Safe no-op when nothing matches.
 */
function stripOnce(): void {
  const candidates = document.querySelectorAll("button, [role='button'], a");
  for (const btn of candidates) {
    const label = (btn.textContent ?? "").trim();
    if (!/send element/i.test(label)) continue;
    let el: Element | null = btn;
    for (let depth = 0; depth < 14 && el; depth++, el = el.parentElement) {
      const block = el.textContent ?? "";
      if (/send console errors/i.test(block) && block.length < 2500) {
        el.remove();
        return;
      }
    }
  }
}

let scheduled = false;
function scheduleStrip(): void {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    stripOnce();
  });
}

export function stripInjectedDevToolbars(): void {
  stripOnce();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleStrip, { once: true });
  }
  const mo = new MutationObserver(() => scheduleStrip());
  mo.observe(document.documentElement, { childList: true, subtree: true });
}
