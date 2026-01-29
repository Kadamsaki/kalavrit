import { Link } from "wouter";
import { Heart, MessageCircle, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16" data-testid="footer">
      <div className="studio-noise">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-card ring-soft rounded-3xl p-6">
              <div className="font-serif text-xl" data-testid="text-footer-brand">
                Ivory & Terracotta
              </div>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-footer-tagline">
                Handmade paintings that sell emotions, not products.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white/40 px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Secure checkout (mock)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-card-border bg-white/40 px-3 py-2">
                  <MessageCircle className="h-4 w-4 text-primary" />
                  WhatsApp ready (UI)
                </span>
              </div>
            </div>

            <div className="glass-card ring-soft rounded-3xl p-6">
              <div className="text-sm font-semibold" data-testid="text-footer-links-title">
                Explore
              </div>
              <div className="mt-3 grid gap-2 text-sm">
                <Link href="/gallery">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-gallery">
                    Gallery
                  </a>
                </Link>
                <Link href="/custom">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-custom">
                    Custom Order
                  </a>
                </Link>
                <Link href="/reviews">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-reviews">
                    Reactions
                  </a>
                </Link>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-foreground" data-testid="link-footer-about">
                    About
                  </a>
                </Link>
              </div>
            </div>

            <div className="glass-card ring-soft rounded-3xl p-6">
              <div className="text-sm font-semibold" data-testid="text-footer-trust-title">
                Trust
              </div>
              <p className="mt-3 text-sm text-muted-foreground" data-testid="text-footer-trust">
                Clear steps: reference → sketch approval → painting → delivery.
                Built as a frontend-only prototype with dummy data.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm">
                <Heart className="h-4 w-4 text-primary" />
                <span data-testid="text-footer-love">Made for memories.</span>
              </div>
            </div>
          </div>

          <div
            className="mt-8 flex flex-col gap-2 rounded-2xl border border-card-border bg-white/35 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
            data-testid="footer-bottom"
          >
            <span data-testid="text-footer-copyright">© {new Date().getFullYear()} Ivory & Terracotta Studio</span>
            <span data-testid="text-footer-note">Prototype • No payments processed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
