import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

export default function AboutPage() {
  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-about-title">
                About KalaVrit
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-about-subtitle">
                Turning emotions into art.
              </p>
            </div>
            <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-about">
              Artist Collective
            </Badge>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8 grid gap-6"
            data-testid="about-content"
          >
            <Card className="glass-card ring-soft rounded-[36px] p-8 md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-serif text-2xl tracking-[-0.01em]" data-testid="text-about-vision-title">
                  Our Vision
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    KalaVrit was born from a simple idea: that our most meaningful memories deserve more than just a digital screen. They deserve the depth, texture, and soul that only true art can provide.
                  </p>
                  <p>
                    Whether it's a quiet moment between two people, the laughter of a child, or the companionship of a pet, we believe every emotion has a visual language. Our mission is to translate your life's stories into beautiful, studio-made paintings.
                  </p>
                  <p>
                    We bring together multiple art forms—from the whimsical charm of Ghibli-inspired illustrations to the raw honesty of charcoal sketches and the precision of realistic portraits.
                  </p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-card-border bg-white/45 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-white/55">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg">Emotional first</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We don't just copy photos; we study the emotion behind them to ensure the final piece feels alive.
                  </p>
                </div>
                <div className="rounded-2xl border border-card-border bg-white/45 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-card-border bg-white/55">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg">Artisan quality</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Every piece is crafted with care, combining traditional artistic principles with modern personalization.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-card-border pt-10 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold">Join our journey</div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Ready to turn your own story into a masterpiece?
                  </p>
                </div>
                <Link href="/custom">
                  <Button asChild className="h-11 shadow-sm">
                    <a>
                      Start Custom Order
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
