import { useMemo, useState } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { artworks, type Artwork } from "@/lib/data";

const types = ["All", "Ghibli", "Vector Art", "Sketch", "Portrait", "Realistic"] as const;

function accentBg(accent: Artwork["accent"]) {
  if (accent === "gold") return "from-[hsl(var(--accent)/0.22)] via-transparent to-transparent";
  if (accent === "ink") return "from-[hsl(218_20%_12%/0.10)] via-transparent to-transparent";
  return "from-[hsl(var(--primary)/0.22)] via-transparent to-transparent";
}

export default function GalleryPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");
  const [hoveredArt, setHoveredArt] = useState<Artwork | null>(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return artworks.filter((a) => {
      const matchesQ =
        !query ||
        a.title.toLowerCase().includes(query) ||
        a.subtitle.toLowerCase().includes(query) ||
        a.tags.some((t) => t.toLowerCase().includes(query));

      const matchesType = type === "All" ? true : a.tags.includes(type);

      return matchesQ && matchesType;
    });
  }, [q, type]);

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-gallery-title">
                Artwork Gallery
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-gallery-subtitle">
                Ready-made originals in a calm, premium grid. Hover to preview, click for details.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/custom">
                <Button asChild className="h-10" data-testid="button-gallery-custom">
                  <a data-testid="link-gallery-custom">Get a custom painting</a>
                </Button>
              </Link>
            </div>
          </div>

          <Card className="glass-card ring-soft mt-6 rounded-3xl p-4" data-testid="card-filters">
            <div className="grid gap-3 md:grid-cols-12 md:items-center">
              <div className="md:col-span-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search title, tags, mood…"
                    className="h-11 pl-10"
                    data-testid="input-gallery-search"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 md:col-span-6 md:justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" className="h-11 gap-2" data-testid="button-filter-type">
                      <SlidersHorizontal className="h-4 w-4" />
                      Type: {type}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52">
                    <DropdownMenuLabel>Painting type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {types.map((t) => (
                      <DropdownMenuItem
                        key={t}
                        onClick={() => setType(t)}
                        data-testid={`menu-type-${t.toLowerCase()}`}
                      >
                        {t}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Badge
                  variant="secondary"
                  className="border-card-border bg-white/45"
                  data-testid="badge-gallery-count"
                >
                  {filtered.length} artworks
                </Badge>
              </div>
            </div>
          </Card>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            data-testid="grid-gallery"
          >
            {filtered.map((art) => (
              <Link key={art.id} href={`/artwork/${art.id}`}>
                <a className="block" data-testid={`link-artwork-${art.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.012 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-card hover-lift group ring-soft overflow-hidden rounded-3xl relative"
                    data-testid={`card-artwork-${art.id}`}
                    onMouseEnter={() => setHoveredArt(art)}
                    onMouseLeave={() => setHoveredArt(null)}
                  >
                    <div className={`relative aspect-[4/3] overflow-hidden ${art.objectFit === 'contain' ? 'bg-[hsl(var(--card))]' : ''}`}>
                      <img
                        src={art.image}
                        alt={art.title}
                        className={`h-full w-full transition-transform duration-500 group-hover:scale-[1.03] ${art.objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                        style={art.objectPosition ? { objectPosition: art.objectPosition } : undefined}
                        data-testid={`img-artwork-${art.id}`}
                      />
                      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-t ${accentBg(art.accent)}`} />

                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <Badge
                          variant="secondary"
                          className="border-card-border bg-white/50"
                          data-testid={`badge-artwork-size-${art.id}`}
                        >
                          {art.size}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={
                            "border " +
                            (art.availability === "Available"
                              ? "border-[hsl(158_38%_34%/0.22)] bg-[hsl(158_38%_34%/0.10)] text-[hsl(158_38%_28%)]"
                              : "border-[hsl(218_10%_42%/0.22)] bg-[hsl(218_10%_42%/0.08)] text-muted-foreground")
                          }
                          data-testid={`badge-artwork-availability-${art.id}`}
                        >
                          {art.availability}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="font-serif text-lg tracking-[-0.02em]" data-testid={`text-artwork-title-${art.id}`}>
                        {art.title}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-artwork-subtitle-${art.id}`}>
                        {art.subtitle}
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <Button
                          className="h-9 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const phone = "919766425515";
                            const message = `Hello KalaVrit 👋, I am interested in buying the artwork: "${art.title}". Please let me know the next steps.`;
                            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
                            window.open(url, "_blank");
                          }}
                          data-testid={`button-buy-now-${art.id}`}
                        >
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </a>
              </Link>
            ))}
          </motion.div>
        </div>
      </main>
      <SiteFooter />

      {/* Hover Preview Tooltip - Desktop Only */}
      <AnimatePresence>
        {hoveredArt && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-1/2 right-8 -translate-y-1/2 z-40 pointer-events-none hidden lg:block"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-card-border p-3 max-w-md">
              <img
                src={hoveredArt.image}
                alt={hoveredArt.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
              />
              <div className="mt-3 text-center px-2 pb-1">
                <h3 className="font-serif text-lg text-foreground">{hoveredArt.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{hoveredArt.subtitle}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
