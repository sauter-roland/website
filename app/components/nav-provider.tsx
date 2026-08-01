"use client";

import { createContext, useContext } from "react";
import { type SectionId } from "@/lib/site";
import useActiveSection from "./use-active-section";

const ActiveSectionContext = createContext<SectionId | null>(null);

/**
 * Runs the one scroll observer and publishes the active id to both navigations. Children are
 * passed through untouched, so the sections below stay server components.
 */
export default function NavProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const active = useActiveSection();

  return (
    <ActiveSectionContext.Provider value={active}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionId(): SectionId {
  const active = useContext(ActiveSectionContext);
  if (!active) throw new Error("useActiveSectionId requires a <NavProvider>");
  return active;
}
