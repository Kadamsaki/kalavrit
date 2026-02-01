import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Brush, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/custom", label: "Custom Order" },
  { href: "/reviews", label: "Reactions" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const [loc] = useLocation();
  const active = loc === href;
  return (
    <Link href={href}>
      <a
        className={
          "rounded-full px-3 py-2 text-sm transition-colors " +
          (active
            ? "bg-[hsl(var(--primary)/0.12)] text-foreground"
            : "text-muted-foreground hover:text-foreground hover:bg-white/40")
        }
        data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        {label}
      </a>
    </Link>
  );
}

export function SiteNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={`transition-all duration-500 ease-out ${isScrolled
          ? "bg-[hsl(var(--background)/0.95)] backdrop-blur-xl shadow-sm"
          : "bg-transparent backdrop-blur-sm"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between">
            <Link href="/">
              <a className="group inline-flex items-center gap-2" data-testid="link-home">
                <img
                  src="/logo.png"
                  alt="KalaVrit"
                  className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  data-testid="text-brand"
                />
              </a>
            </Link>

            <div className="hidden items-center gap-1 lg:flex" data-testid="nav-desktop">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </div>

            <div className="hidden items-center gap-2 sm:flex" data-testid="nav-cta">
              <Link href="/custom">
                <Button asChild className="h-10" data-testid="button-cta-custom">
                  <a data-testid="link-cta-custom">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Your Custom Painting
                    <ArrowRight className="ml-2 h-4 w-4 opacity-80" />
                  </a>
                </Button>
              </Link>
            </div>

            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="secondary" className="h-10 w-10 px-0" data-testid="button-menu">
                    <Menu className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[320px]">
                  <div className="mt-6 space-y-2" data-testid="nav-mobile">
                    {links.map((l) => (
                      <Link key={l.href} href={l.href}>
                        <a
                          className="block rounded-2xl border border-card-border bg-white/40 px-4 py-3 text-sm hover:bg-white/60"
                          data-testid={`link-mobile-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {l.label}
                        </a>
                      </Link>
                    ))}
                    <Link href="/custom">
                      <Button asChild className="mt-3 h-11 w-full" data-testid="button-mobile-cta">
                        <a data-testid="link-mobile-cta">
                          <Sparkles className="mr-2 h-4 w-4" />
                          Start Custom Order
                        </a>
                      </Button>
                    </Link>
                    <Link href="/admin">
                      <Button asChild variant="secondary" className="h-11 w-full" data-testid="button-mobile-admin">
                        <a data-testid="link-mobile-admin">Admin (Mock)</a>
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--border))] to-transparent"
            data-testid="divider-nav"
          />
        </div>
      </div>
    </div>
  );
}
