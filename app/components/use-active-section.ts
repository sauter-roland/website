"use client";

import { useEffect, useState } from "react";
import { type SectionId, sections } from "@/lib/site";

/**
 * Tracks which section is in the reading position. The rootMargin collapses the viewport to a
 * thin band just above the middle, so exactly the section the reader is looking at reports as
 * intersecting.
 *
 * Call this once and share the result — see `nav-provider.tsx`. Two observers would fight.
 */
export default function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    for (const { id } of sections) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}
