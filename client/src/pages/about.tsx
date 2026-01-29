import { motion } from "framer-motion";
import { Brush, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { artist } from "@/lib/data";

export default function AboutPage() {
  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-about-title">
                About the artist
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-about-subtitle">
                A story-led studio—built around warmth, detail, and patience.
              </p>
            </div>
            <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-about">
              {artist.city}
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 grid gap-4 lg:grid-cols-12"
          >
            <Card className="glass-card ring-soft rounded-[36px] p-7 lg:col-span-7" data-testid="card-about-story">
              <div className="flex items-center gap-2">
                <Brush className="h-4 w-4 text-primary" />
                <div className="text-sm font-semibold" data-testid="text-about-story-title">
                  {artist.name}
                </div>
              </div>
              <h2 className="mt-4 font-serif text-2xl tracking-[-0.02em]" data-testid="text-about-headline">
                I paint people the way they feel to you.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground" data-testid="text-about-body">
                Some portraits are about accuracy. Mine are about belonging. I work slowly, layering warm neutrals and
                soft edges, so the final piece feels like a memory you can hold.
                <br />
                <br />
                The process is simple: you share references + story → I send a sketch preview → you approve → I paint.
                I’m drawn to the small details that matter: a laugh line, a posture, a familiar light.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {["Gentle communication", "Sketch approval", "Premium finish"].map((t, i) => (
                  <div
                    key={t}
                    className="rounded-2xl border border-card-border bg-white/40 px-4 py-4 text-sm"
                    data-testid={`card-about-point-${i}`}
                  >
                    {t}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-card ring-soft rounded-[36px] p-7 lg:col-span-5" data-testid="card-about-images">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="text-sm font-semibold" data-testid="text-about-images-title">
                  Studio moments (mock)
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-[16/10] rounded-3xl border border-card-border bg-gradient-to-br from-[hsl(var(--accent)/0.25)] to-[hsl(var(--primary)/0.18)]"
                    data-testid={`img-about-${i}`}
                  />
                ))}
              </div>

              <p className="mt-4 text-sm text-muted-foreground" data-testid="text-about-note">
                In production, these would be real studio photos and process shots.
              </p>
            </Card>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
