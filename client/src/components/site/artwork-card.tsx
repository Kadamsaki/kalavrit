import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Artwork } from "@/lib/data";

function accentBg(accent: Artwork["accent"]) {
  if (accent === "gold") return "from-[hsl(var(--accent)/0.22)] via-transparent to-transparent";
  if (accent === "ink") return "from-[hsl(218_20%_12%/0.10)] via-transparent to-transparent";
  return "from-[hsl(var(--primary)/0.22)] via-transparent to-transparent";
}

export function ArtworkCard({ art }: { art: Artwork }) {
  return (
    <Link href={`/artwork/${art.id}`}>
      <a className="block" data-testid={`link-artwork-${art.id}`}>
        <motion.div
          whileHover={{ scale: 1.012 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card hover-lift group ring-soft overflow-hidden rounded-3xl"
          data-testid={`card-artwork-${art.id}`}
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
  );
}
