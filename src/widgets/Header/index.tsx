"use client";

import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { Container } from "@/shared/ui/Container";
import { Button } from "@/shared/ui/Button";
import { NAV_ITEMS, SITE } from "@/shared/config/site";
import { useMenu } from "@/features/ToggleMenu";
import { useAppAnimation } from "@/features/AppAnimation";
import { MenuIcon } from "@/shared/ui/icons";

export function Header() {
  const { toggle } = useMenu();
  const { phase } = useAppAnimation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={phase === "ready" ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        height: isScrolled ? "52px" : "64px",
        backgroundColor: isScrolled ? "rgba(9, 7, 16, 0.8)" : "rgba(9, 7, 16, 0)",
        backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
        borderBottom: isScrolled
          ? "1px solid rgba(124, 45, 173, 0.2)"
          : "1px solid rgba(124, 45, 173, 0)",
      }}
      className="fixed top-0 left-0 right-0 z-40 flex items-center transition-all duration-700 ease-out"
    >
      <Container className="flex items-center justify-between">
        <a href="/" className="text-xl tracking-tight text-white font-heading">
          {SITE.name}<span className="text-purple-400">.</span>
        </a>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-400 transition-colors hover:text-purple-400"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Button variant="icon" onClick={toggle} className="sm:hidden" aria-label="Open menu">
          <MenuIcon />
        </Button>
      </Container>
    </motion.header>
  );
}
