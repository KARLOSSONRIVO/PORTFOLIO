import { useRef } from "react";
import { useInView, useReducedMotion, type UseInViewOptions } from "framer-motion";
import { useSitePreferences } from "@/hooks/useSitePreferences";

/**
 * Returns a ref and isInView flag.
 * Attach ref to the element you want to animate.
 * Use isInView to drive Framer Motion animate prop.
 *
 * @example
 * const { ref, isInView } = useScrollReveal();
 * <motion.div ref={ref} animate={isInView ? 'visible' : 'hidden'} />
 */
export function useScrollReveal(options: Partial<UseInViewOptions> = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { paused } = useSitePreferences();
  const isInView = useInView(ref, {
    once: true,
    margin: "-80px" as UseInViewOptions["margin"],
    ...options,
  });

  return { ref, isInView: Boolean(reducedMotion || paused || isInView) };
}

