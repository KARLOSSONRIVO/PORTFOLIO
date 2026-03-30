import { useRef } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";

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
  const isInView = useInView(ref, {
    once: false,
    margin: "-80px" as UseInViewOptions["margin"],
    ...options,
  });

  return { ref, isInView };
}

