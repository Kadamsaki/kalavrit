import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, ImagePlus, Sparkles, Star, Upload } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { reviews } from "@/lib/data";

export default function ReviewsPage() {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [localReviews, setLocalReviews] = useState([...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  const [currentPage, setCurrentPage] = useState(0);

  const REVIEWS_PER_PAGE = 4;
  const pageCount = Math.ceil(localReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = localReviews.slice(currentPage * REVIEWS_PER_PAGE, (currentPage + 1) * REVIEWS_PER_PAGE);

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
            <div className="space-y-4 lg:col-span-4">
              <Card className="glass-card ring-soft rounded-3xl p-6" data-testid="card-reviews-side">
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
                  <Button asChild className="mt-5 h-11 w-full" data-testid="button-reviews-cta">
                    <a data-testid="link-reviews-cta">
                      Start a custom order
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </Link>
              </Card>

              <Card className="glass-card ring-soft rounded-3xl p-6" data-testid="card-share-reaction">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <div className="text-sm font-semibold">Share Your Reaction</div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your happiness is our greatest masterpiece. Share your story with us.
                </p>

                {!submitted ? (
                  <form className="mt-5 space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs uppercase tracking-wider text-muted-foreground">Name</Label>
                      <Input id="name" placeholder="Your name" className="h-10" required />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs uppercase tracking-wider text-muted-foreground">Rating</Label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setRating(s)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star className={"h-5 w-5 " + (s <= rating ? "fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" : "text-muted-foreground")} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="feedback" className="text-xs uppercase tracking-wider text-muted-foreground">Feedback</Label>
                      <Textarea id="feedback" placeholder="How did the art make you feel?" className="min-h-[100px] text-sm" required />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="media" className="text-xs uppercase tracking-wider text-muted-foreground">Photo or Video</Label>
                      <div className="flex items-center gap-2">
                        <Input id="media" type="file" className="hidden" />
                        <Button type="button" variant="secondary" className="h-10 w-full" onClick={() => document.getElementById("media")?.click()}>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Media
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="h-11 w-full" onClick={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget.closest("form");
                      if (!form) return;
                      const nameInput = form.querySelector("#name") as HTMLInputElement;
                      const feedbackInput = form.querySelector("#feedback") as HTMLTextAreaElement;

                      if (nameInput.value && feedbackInput.value) {
                        const newReview = {
                          id: Math.random().toString(36).substr(2, 9),
                          name: nameInput.value,
                          location: "Verified Art Enthusiast",
                          rating: rating as any,
                          text: feedbackInput.value,
                          occasion: "Custom Order",
                          createdAt: new Date().toISOString().split("T")[0],
                        };
                        setLocalReviews([newReview, ...localReviews]);
                        setSubmitted(true);
                        setCurrentPage(0);
                      }
                    }}>
                      Submit Reaction
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-6 text-center py-4"
                  >
                    <div className="flex justify-center mb-4">
                      <div className="h-12 w-12 rounded-full bg-[hsl(var(--accent)/0.15)] flex items-center justify-center">
                        <Heart className="h-6 w-6 text-[hsl(var(--accent))]" />
                      </div>
                    </div>
                    <div className="font-serif text-xl mb-2">Submitted Successfully</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Your reaction has been submitted successfully. Thank you for sharing your emotions with us.
                    </p>
                  </motion.div>
                )}
              </Card>
            </div>

            <div className="lg:col-span-8">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="grid gap-4 md:grid-cols-2"
                data-testid="grid-reviews"
              >
                {paginatedReviews.map((r) => (
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
                              "h-4 w-4 " + (i < r.rating ? "fill-[hsl(var(--accent))] text-[hsl(var(--accent))]" : "text-[hsl(var(--border))]")
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
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {/* This would dynamically show uploaded images if they were stored */}
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-[10px] text-muted-foreground text-center p-2">
                          Customer Image Preview
                        </div>
                        <div className="aspect-square bg-muted rounded-xl flex items-center justify-center text-[10px] text-muted-foreground text-center p-2">
                          Artwork Preview
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>

              {pageCount > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <Button
                    variant="secondary"
                    className="h-10 rounded-2xl"
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </Button>
                  <div className="text-sm font-medium px-4">
                    Page {currentPage + 1} of {pageCount}
                  </div>
                  <Button
                    variant="secondary"
                    className="h-10 rounded-2xl"
                    disabled={currentPage === pageCount - 1}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition >
  );
}
