import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
import { ArtworkCard } from "@/components/site/artwork-card";
import { artworks } from "@/lib/data";

const types = ["All", "Ghibli", "Vector Art", "Sketch", "Portrait", "Realistic"] as const;

export default function GalleryPage() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<(typeof types)[number]>("All");

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
                Ready-made originals in a calm, premium grid. Click any piece for the story.
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
            {filtered.map((a) => (
              <ArtworkCard key={a.id} art={a} />
            ))}
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
