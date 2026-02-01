import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Brush, HeartHandshake, Sparkles, Star, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { ArtworkCard } from "@/components/site/artwork-card";
import { artworks, reviews, artist } from "@/lib/data";

const ease = "easeOut" as const;

function Hero() {
  return (
    <section className="pt-10 sm:pt-14" data-testid="section-hero">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <Badge
              variant="secondary"
              className="border-card-border bg-white/45"
              data-testid="badge-hero"
            >
              Multiple styles • Personalized artworks • Custom portraits
            </Badge>

            <div className="flex items-center" data-testid="text-hero-brand-logo">
              <img src="/logo.png" alt="KalaVrit" className="h-14 w-auto object-contain" />
            </div>
            <h1
              className="mt-2 font-serif text-4xl tracking-[-0.03em] sm:text-5xl"
              data-testid="text-hero-title"
            >
              Turning emotions into art.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground" data-testid="text-hero-subtitle">
              We transform your most precious memories into timeless art pieces.
              Commission personalized art in multiple styles—Ghibli, vector art, sketches, charcoal, and realistic.
              Every piece begins with your story and ends as something you can keep.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center" data-testid="hero-cta">
              <Link href="/custom">
                <Button asChild className="h-11" data-testid="button-hero-custom">
                  <a data-testid="link-hero-custom">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Your Custom Painting
                    <ArrowRight className="ml-2 h-4 w-4 opacity-80" />
                  </a>
                </Button>
              </Link>
              <Link href="/gallery">
                <Button asChild variant="secondary" className="h-11" data-testid="button-hero-gallery">
                  <a data-testid="link-hero-gallery">Browse Ready-Made Artworks</a>
                </Button>
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground" data-testid="hero-trust">
              <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white/40 px-3 py-2">
                <HeartHandshake className="h-4 w-4 text-primary" />
                Sketch approval included
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white/40 px-3 py-2">
                <Timer className="h-4 w-4 text-primary" />
                Typical delivery: 10–14 days
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white/40 px-3 py-2">
                <Brush className="h-4 w-4 text-primary" />
                Studio-made, not printed
              </span>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 14, rotate: -1, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease }}
            className="glass-card ring-soft studio-noise overflow-hidden rounded-[32px] p-5"
            data-testid="card-hero"
          >
            <div className="flex items-center justify-between">
              <div className="font-serif text-lg" data-testid="text-hero-card-title">
                From your photo → a painting
              </div>
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-card-border bg-white/55"
                data-testid="img-hero-mark"
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </span>
            </div>

            <div className="mt-4 grid gap-3">
              {["Share your story", "Get a sketch preview", "Approve & receive the final piece"].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
                  className="rounded-2xl border border-card-border bg-white/45 px-4 py-4"
                  data-testid={`row-hero-step-${i}`}
                >
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
                  <div className="mt-1 font-medium">{t}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-card-border bg-white/40 p-4">
              <div className="flex items-center justify-center">
                <img src="/logo.png" alt="KalaVrit" className="h-12 object-contain" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const featured = artworks.slice(0, 3);
  return (
    <section className="mt-14" data-testid="section-featured">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-2xl tracking-[-0.02em]" data-testid="text-featured-title">
            Featured artworks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground" data-testid="text-featured-subtitle">
            Ready-made originals—each with a story.
          </p>
        </div>
        <Link href="/gallery">
          <Button asChild variant="secondary" className="h-10" data-testid="button-featured-all">
            <a data-testid="link-featured-all">
              View gallery
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3" data-testid="grid-featured">
        {featured.map((art) => (
          <ArtworkCard key={art.id} art={art} />
        ))}
      </div>
    </section>
  );
}

function Reactions() {
  return (
    <section className="mt-14" data-testid="section-reactions">
      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="glass-card ring-soft rounded-3xl p-6 lg:col-span-5" data-testid="card-reactions-left">
          <div className="font-serif text-2xl" data-testid="text-reactions-title">
            People don’t just buy art.
            <br />
            They keep a feeling.
          </div>
          <p className="mt-3 text-sm text-muted-foreground" data-testid="text-reactions-subtitle">
            Real reactions are the heartbeat of this studio—quiet smiles, happy tears, and homes that feel warmer.
          </p>
          <div className="mt-5 grid gap-3">
            {["Careful communication", "Sketch approval", "Premium packaging"].map((t, i) => (
              <div
                key={t}
                className="rounded-2xl border border-card-border bg-white/45 px-4 py-4"
                data-testid={`card-reaction-point-${i}`}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-[hsl(var(--accent))]" />
                  <div className="font-medium">{t}</div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/reviews">
            <Button className="mt-6 h-11" data-testid="button-reactions-more">
              See reactions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </Card>

        <div className="lg:col-span-7">
          <div className="grid gap-4 md:grid-cols-2" data-testid="grid-reviews">
            {reviews.slice(0, 2).map((r) => {
              const [localRating, setLocalRating] = useState(r.rating);
              return (
                <Card key={r.id} className="glass-card hover-lift rounded-3xl p-6" data-testid={`card-review-${r.id}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium" data-testid={`text-review-name-${r.id}`}>
                        {r.name} • {r.location}
                      </div>
                      <div className="text-xs text-muted-foreground" data-testid={`text-review-occasion-${r.id}`}>
                        {r.occasion}
                      </div>
                    </div>
                    <div className="flex items-center gap-1" data-testid={`rating-${r.id}`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setLocalRating(i + 1 as any)}
                          className="transition-transform hover:scale-110"
                        >
                          <Star
                            className={
                              "h-4 w-4 " +
                              (i < localRating ? "fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" : "text-[hsl(var(--border))]")
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground" data-testid={`text-review-${r.id}`}>
                    “{r.text}”
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <SiteNav />
        <main className="studio-noise">
          <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-10">
            <Hero />
            <Featured />
            <Reactions />

            <section className="mt-14" data-testid="section-cta">
              <Card className="glass-card ring-soft rounded-[36px] p-7 md:p-10" data-testid="card-cta">
                <div className="grid gap-6 md:grid-cols-12 md:items-center">
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl tracking-[-0.02em]" data-testid="text-cta-title">
                      Ready to turn a photo into a painting that feels alive?
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground" data-testid="text-cta-subtitle">
                      Start a custom order in under two minutes. You’ll get a sketch preview before the final piece.
                    </p>
                  </div>
                  <div className="md:col-span-4 md:text-right">
                    <Link href="/custom">
                      <Button asChild className="h-11" data-testid="button-cta-start">
                        <a data-testid="link-cta-start">
                          Start Custom Order
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </section>
          </div>
        </main>
        <SiteFooter />
      </div>
    </PageTransition>
  );
}
