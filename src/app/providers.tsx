"use client";

import type { ReactNode } from "react";
import { PlayTrackProvider } from "@/features/PlayTrack";
import { MenuProvider } from "@/features/ToggleMenu";
import { AppAnimationProvider } from "@/features/AppAnimation";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppAnimationProvider>
      <MenuProvider>
        <PlayTrackProvider>{children}</PlayTrackProvider>
      </MenuProvider>
    </AppAnimationProvider>
  );
}
