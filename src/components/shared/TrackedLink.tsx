"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackCtaClicked } from "@/lib/tracking";

/** Drop-in for next/link that reports a click with a fixed target id. No text, href or layout change. */
export function TrackedLink({ target, onClick, ...rest }: ComponentProps<typeof Link> & { target: string }) {
  return (
    <Link
      {...rest}
      onClick={(e) => {
        trackCtaClicked(target);
        onClick?.(e);
      }}
    />
  );
}

/** Drop-in for <a> (outbound links). `cta` is a fixed id, never the href. */
export function TrackedAnchor({ cta, onClick, ...rest }: ComponentProps<"a"> & { cta: string }) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      {...rest}
      onClick={(e) => {
        trackCtaClicked(cta);
        onClick?.(e);
      }}
    />
  );
}
