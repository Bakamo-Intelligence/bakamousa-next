"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Selection = {
  code: string;
  select: (code: string, scrollToDetail?: boolean) => void;
};

const SelectionContext = createContext<Selection | null>(null);

export const DETAIL_ID = "migration-country-detail";

/**
 * One selected country shared by the tile map, the bars, the detail panel and
 * the scatter. The chapter headings around them stay server rendered.
 */
export function SelectionProvider({
  initial,
  children,
}: {
  initial: string;
  children: React.ReactNode;
}) {
  const [code, setCode] = useState(initial);
  const select = useCallback((next: string, scrollToDetail?: boolean) => {
    setCode(next);
    if (scrollToDetail) {
      document.getElementById(DETAIL_ID)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);
  const value = useMemo(() => ({ code, select }), [code, select]);
  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection(): Selection {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection needs a SelectionProvider");
  return ctx;
}
