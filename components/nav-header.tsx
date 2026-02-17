"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { motion } from "motion/react"
import { navigation } from "@/lib/data"
import { MagneticWrapper } from "@/components/magnetic-wrapper"
import { HourglassIcon } from "@/components/hourglass-icon"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-6 py-4 transition-colors duration-300 md:px-12"
      style={{
        backgroundColor: scrolled
          ? "oklch(0.08 0.01 15 / 0.9)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
      }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
    >
      {/* Brand mark */}
      <a
        href="#"
        className="group flex items-center gap-2.5"
        aria-label="Webspinner - Back to top"
      >
        <HourglassIcon size={28} animated={false} />
        <span className="text-xl font-bold tracking-tight text-foreground">
          Webspinner
        </span>
      </a>

      {/* Desktop navigation */}
      <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
        {navigation.map((item) => (
          <MagneticWrapper key={item.href} strength={4}>
            <a
              href={item.href}
              className="group relative px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span
                className="absolute bottom-1 left-3 right-3 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
                style={{ backgroundColor: "var(--node-color)" }}
                aria-hidden="true"
              />
            </a>
          </MagneticWrapper>
        ))}
      </nav>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="border-border bg-background">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2 text-foreground">
              <HourglassIcon size={22} animated={false} />
              Webspinner
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-2 p-4" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </motion.header>
  )
}
