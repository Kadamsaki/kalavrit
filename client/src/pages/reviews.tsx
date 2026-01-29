import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { reviews } from "@/lib/data";

export default function ReviewsPage() {
  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-reviews-title">
                Reviews & Reactions
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-reviews-subtitle">
                Emotions first—ratings second.
              </p>
            </div>
            <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-reviews">
              {reviews.length} stories
            </Badge>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <Card className="glass-card ring-soft rounded-3xl p-6 lg:col-span-4" data-testid="card-reviews-side">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                <div className="text-sm font-semibold" data-testid="text-reviews-side-title">
                  Why people order
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-reviews-side-subtitle">
                Most commissions begin with a single sentence: “I want them to feel loved.”
              </p>
              <Link href="/custom">
                <Button asChild className="mt-5 h-11" data-testid="button-reviews-cta">
                  <a data-testid="link-reviews-cta">
                    Start a custom order
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </Link>
            </Card>

            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="grid gap-4 md:grid-cols-2"
                data-testid="grid-reviews"
              >
                {reviews.map((r) => (
                  <Card key={r.id} className="glass-card hover-lift rounded-3xl p-6" data-testid={`card-review-${r.id}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium" data-testid={`text-review-name-${r.id}`}>
                          {r.name} • {r.location}
                        </div>
                        <div className="text-xs text-muted-foreground" data-testid={`text-review-occasion-${r.id}`}>
                          {r.occasion} • {r.createdAt}
                        </div>
                      </div>
                      <div className="inline-flex items-center gap-1" data-testid={`rating-${r.id}`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={
                              "h-4 w-4 " + (i < r.rating ? "text-[hsl(var(--accent))]" : "text-[hsl(var(--border))]")
                            }
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground" data-testid={`text-review-${r.id}`}>
                      “{r.text}”
                    </p>

                    <div className="mt-4 rounded-2xl border border-card-border bg-white/40 p-4">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground">Reaction</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        (Before/after images would live here in production.)
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
