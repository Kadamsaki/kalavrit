import { AnimatePresence, motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Heart, ImagePlus, Sparkles, Star, Upload, X } from "lucide-react";
import { useState, useRef } from "react";

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

// Extended review type to include optional image
type LocalReview = {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  occasion: string;
  createdAt: string;
  image?: string; // Base64 encoded image
};

export default function ReviewsPage() {
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [localReviews, setLocalReviews] = useState<LocalReview[]>(
    [...reviews].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as LocalReview[]
  );
  const [currentPage, setCurrentPage] = useState(0);

  const REVIEWS_PER_PAGE = 4;
  const pageCount = Math.ceil(localReviews.length / REVIEWS_PER_PAGE);
  const paginatedReviews = localReviews.slice(currentPage * REVIEWS_PER_PAGE, (currentPage + 1) * REVIEWS_PER_PAGE);

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setImageUploaded(true);
        // Auto-hide success message after 3 seconds
        setTimeout(() => setImageUploaded(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setUploadedImage(null);
    setImageUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;

    const nameInput = form.querySelector("#name") as HTMLInputElement;
    const feedbackInput = form.querySelector("#feedback") as HTMLTextAreaElement;

    if (nameInput.value && feedbackInput.value) {
      const newReview: LocalReview = {
        id: Math.random().toString(36).substr(2, 9),
        name: nameInput.value,
        location: "Verified Art Enthusiast",
        rating: rating,
        text: feedbackInput.value,
        occasion: "Custom Order",
        createdAt: new Date().toISOString().split("T")[0],
        image: uploadedImage || undefined,
      };
      setLocalReviews([newReview, ...localReviews]);
      setSubmitted(true);
      setCurrentPage(0);
      setUploadedImage(null);
    }
  };

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
              {localReviews.length} stories
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
                  Most commissions begin with a single sentence: "I want them to feel loved."
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
                      <input
                        ref={fileInputRef}
                        id="media"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />

                      {!uploadedImage ? (
                        <Button
                          type="button"
                          variant="secondary"
                          className="h-10 w-full"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Media
                        </Button>
                      ) : (
                        <div className="space-y-2">
                          {/* Image Preview */}
                          <div className="relative rounded-xl overflow-hidden border border-card-border">
                            <img
                              src={uploadedImage}
                              alt="Preview"
                              className="w-full h-24 object-cover"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 h-6 w-6 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Success Message */}
                      {imageUploaded && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-sm text-[hsl(158_38%_28%)] bg-[hsl(158_38%_28%/0.1)] rounded-lg px-3 py-2"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Image uploaded successfully ✅
                        </motion.div>
                      )}
                    </div>

                    <Button type="submit" className="h-11 w-full" onClick={handleSubmit}>
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
                    <Button
                      variant="secondary"
                      className="mt-4 h-10"
                      onClick={() => {
                        setSubmitted(false);
                        setRating(5);
                      }}
                    >
                      Add Another Reaction
                    </Button>
                  </motion.div>
                )}
              </Card>
            </div>

            <div className="lg:col-span-8">
              {/* Dynamic page info */}
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedReviews.length} of {localReviews.length} reactions
                </p>
              </div>

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
                      "{r.text}"
                    </p>

                    {/* Only show reaction section if there's an uploaded image */}
                    {r.image && (
                      <div className="mt-4 rounded-2xl border border-card-border bg-white/40 p-4">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Shared Photo</div>
                        <div
                          className="relative rounded-xl overflow-hidden cursor-pointer group"
                          onClick={() => setLightboxImage(r.image!)}
                        >
                          <img
                            src={r.image}
                            alt="Customer reaction"
                            className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <span className="text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded-lg">
                              Click to view full size
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
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

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
                <span className="text-sm">Close</span>
              </button>
              <img
                src={lightboxImage}
                alt="Full size artwork"
                className="w-full h-auto max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-center text-white/60 text-sm mt-4">
                Click anywhere outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
