"use client";

import type { AnchorHTMLAttributes } from "react";

/** Keeps source navigation markup inside the dashboard-only sample. */
export default function SampleLink({ children, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props} onClick={event => {
    event.preventDefault();
    onClick?.(event);
    event.currentTarget.ownerDocument.dispatchEvent(new CustomEvent("sample-navigation"));
  }}>{children}</a>;
}
