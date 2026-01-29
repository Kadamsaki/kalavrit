import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeIndianRupee, Brush, ShoppingBag, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { artworks } from "@/lib/data";

export default function ArtworkDetailPage() {
  const [, params] = useRoute("/artwork/:id");
  const art = useMemo(() => artworks.find((a) => a.id === params?.id), [params?.id]);

  if (!art) {
    return (
      <PageTransition>
        <SiteNav />
        <main className="studio-noise">
          <div className="mx-auto max-w-3xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
            <Card className="glass-card ring-soft rounded-3xl p-7" data-testid="card-artwork-missing">
              <div className="font-serif text-2xl" data-testid="text-artwork-missing-title">
                Artwork not found
              </div>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-artwork-missing-subtitle">
                This piece isn’t in the dummy dataset.
              </p>
              <Link href="/gallery">
                <Button asChild className="mt-5 h-10" data-testid="button-back-gallery">
                  <a data-testid="link-back-gallery">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to gallery
                  </a>
                </Button>
              </Link>
            </Card>
          </div>
        </main>
        <SiteFooter />
      </PageTransition>
    );
  }

  const canBuy = art.availability === "Available";

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <Link href="/gallery">
            <Button asChild variant="secondary" className="h-10" data-testid="button-artwork-back">
              <a data-testid="link-artwork-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </a>
            </Button>
          </Link>

          <div className="mt-6 grid gap-6 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <Card className="glass-card ring-soft overflow-hidden rounded-[36px]" data-testid="card-artwork-image">
                <div className="aspect-[4/3]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full object-cover"
                    data-testid="img-artwork-hero"
                  />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.06 }}
              className="lg:col-span-5"
            >
              <Card className="glass-card ring-soft rounded-[36px] p-7" data-testid="card-artwork-detail">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-artwork-medium">
                    <Brush className="mr-2 h-4 w-4 text-primary" />
                    {art.medium}
                  </Badge>
                  <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-artwork-size">
                    {art.size}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={
                      "border " +
                      (canBuy
                        ? "border-[hsl(158_38%_34%/0.22)] bg-[hsl(158_38%_34%/0.10)] text-[hsl(158_38%_28%)]"
                        : "border-[hsl(218_10%_42%/0.22)] bg-[hsl(218_10%_42%/0.08)] text-muted-foreground")
                    }
                    data-testid="badge-artwork-availability"
                  >
                    {art.availability}
                  </Badge>
                </div>

                <h1 className="mt-4 font-serif text-3xl tracking-[-0.02em]" data-testid="text-artwork-title">
                  {art.title}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground" data-testid="text-artwork-subtitle">
                  {art.subtitle}
                </p>

                <div className="mt-5 rounded-2xl border border-card-border bg-white/45 p-4" data-testid="card-artwork-price">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="inline-flex items-center gap-2">
                      <BadgeIndianRupee className="h-4 w-4 text-primary" />
                      <div className="text-lg font-semibold" data-testid="text-artwork-price">
                        ₹{art.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground" data-testid="text-artwork-note">
                    One original. Carefully packed. Shipping calculated at checkout (mock).
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-sm font-semibold" data-testid="text-artwork-story-title">
                    The story
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground" data-testid="text-artwork-story">
                    {art.story}
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link href={canBuy ? "/payment" : "/custom"}>
                    <Button className="h-11" data-testid="button-artwork-buy">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {canBuy ? "Buy now" : "Commission something similar"}
                    </Button>
                  </Link>
                  <Link href="/custom">
                    <Button asChild variant="secondary" className="h-11" data-testid="button-artwork-custom">
                      <a data-testid="link-artwork-custom">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Request custom
                      </a>
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
