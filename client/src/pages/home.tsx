import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Brush, HeartHandshake, Sparkles, Star, Timer, Image as ImageIcon, PenTool, CheckCircle2, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import { ArtworkCard } from "@/components/site/artwork-card";
import { artworks, reviews } from "@/lib/data";

const ease = "easeOut" as const;

function Hero() {
  return (
    <section className="pt-10 sm:pt-14 relative" data-testid="section-hero">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <Badge
              variant="secondary"
              className="border-card-border bg-white/45 mb-6"
              data-testid="badge-hero"
            >
              <Sparkles className="h-3 w-3 mr-2" />
              Multiple styles • Personalized artworks
            </Badge>

            <h1
              className="font-serif text-4xl tracking-[-0.03em] sm:text-5xl md:text-6xl leading-[1.1]"
              data-testid="text-hero-title"
            >
              Turning emotions <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">into timeless art.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground" data-testid="text-hero-subtitle">
              We transform your most precious memories into beautiful, studio-made paintings.
              From Ghibli-style whimsy to realistic charcoal portraits, every piece creates a lasting legacy.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" data-testid="hero-cta">
              <Link href="/custom">
                <Button asChild className="h-12 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all font-medium text-base" data-testid="button-hero-custom">
                  <a data-testid="link-hero-custom">
                    Get Your Custom Painting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </Link>
              <Link href="/gallery">
                <Button asChild variant="ghost" className="h-12 rounded-full px-6 hover:bg-white/50" data-testid="button-hero-gallery">
                  <a data-testid="link-hero-gallery">Browse Gallery</a>
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground" data-testid="hero-trust">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-medium">1k+</div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span className="text-xs">Loved by 100+ families</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-6 relative">
          {/* Abstract background blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 bg-gradient-to-tr from-purple-100/50 via-indigo-100/30 to-blue-50/50 rounded-full blur-3xl opacity-60" />

          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative z-10"
          >
            <div className="relative aspect-[4/5] md:aspect-square w-full max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.02, rotate: -1 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl glass-card border-none"
              >
                <img
                  src="/featured_2.jpg"
                  alt="The Artist's Soul"
                  className="w-full h-full object-cover"
                />
                {/* Floating badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-full text-green-700">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Sketch Approved</div>
                      <div className="text-xs text-muted-foreground">Ready for painting</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      id: 1,
      title: "Share Your Story",
      desc: "Upload your photo and tell us the emotion you want to capture.",
      icon: ImageIcon,
      color: "from-blue-500 to-indigo-500",
      delay: 0.2
    },
    {
      id: 2,
      title: "Get Sketch Preview",
      desc: "We create a preliminary sketch. You review, we refine.",
      icon: PenTool,
      color: "from-purple-500 to-pink-500",
      delay: 0.4
    },
    {
      id: 3,
      title: "Receive Masterpiece",
      desc: "Once approved, we paint the final piece and ship it to you.",
      icon: HeartHandshake,
      color: "from-orange-500 to-red-500",
      delay: 0.6
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" data-testid="section-process">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 relative">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
              How it works
            </Badge>
            <h2 className="font-serif text-3xl md:text-5xl tracking-[-0.02em] mb-4">
              From Memory to Masterpiece
            </h2>
            <p className="text-muted-foreground text-lg">
              A seamless journey designed to turn your favorite moments into forever art.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-12 md:grid-cols-3 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-slate-200 via-indigo-100 to-slate-200 -z-10" />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: step.delay, ease: "easeOut" }}
              className="relative text-center group"
            >
              <div
                className={`w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br ${step.color} p-0.5 shadow-xl shadow-indigo-100 transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3`}
              >
                <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                  <step.icon className="h-10 w-10 text-slate-700 opacity-80" />
                </div>
              </div>

              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 mb-3">
                  STEP 0{step.id}
                </div>
                <h3 className="font-serif text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
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
    <section className="mt-20 mb-20" data-testid="section-reactions">
      <div className="grid gap-8 lg:grid-cols-12 items-center">
        <Card className="glass-card ring-soft rounded-[48px] p-10 lg:col-span-12 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-32 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 left-0 p-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="font-serif text-3xl md:text-4xl text-slate-800 leading-tight" data-testid="text-reactions-title">
                People don’t just buy art.<br />
                <span className="text-purple-600">They keep a feeling.</span>
              </div>
              <p className="mt-4 text-slate-600 leading-relaxed max-w-md">
                Real reactions are the heartbeat of this studio—quiet smiles, happy tears, and homes that feel warmer.
              </p>

              <div className="mt-8 space-y-3">
                {["Careful communication", "Sketch approval", "Premium packaging"].map((t, i) => (
                  <div key={t} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                    <div className="p-1.5 bg-green-100 rounded-full text-green-700">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </div>
                    {t}
                  </div>
                ))}
              </div>

              <Link href="/reviews">
                <Button className="mt-8 h-12 w-fit px-8 rounded-2xl" data-testid="button-reactions-more">
                  See All Love Stories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="grid gap-4 md:grid-cols-2">
                {reviews.slice(0, 2).map((r, idx) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full bg-white/60 hover:bg-white/80 transition-colors border-none shadow-sm rounded-3xl p-6">
                      <div className="flex gap-1 mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < r.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`} />
                        ))}
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed mb-4">“{r.text}”</p>
                      <div className="mt-auto flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                          {r.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{r.name}</div>
                          <div className="text-[10px] text-slate-500">{r.location}</div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Card>
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
            <Hero />
            <ProcessSection />
            <Featured />
            <Reactions />

            <section className="mb-20" data-testid="section-cta">
              <div className="relative rounded-[48px] overflow-hidden bg-slate-900 text-white p-10 md:p-16 text-center">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/50 to-indigo-900/50" />

                <div className="relative z-10 max-w-3xl mx-auto">
                  <h3 className="font-serif text-3xl md:text-5xl tracking-tight mb-6">
                    Ready to turn a photo into art?
                  </h3>
                  <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto">
                    Start a custom order in under two minutes. You’ll get a sketch preview, unlimited warmth, and a masterpiece forever.
                  </p>
                  <Link href="/custom">
                    <Button className="h-14 px-10 rounded-full text-lg bg-white text-slate-900 hover:bg-slate-100 hover:scale-105 transition-all">
                      Start Custom Order Now
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </main>
        <SiteFooter />
      </div>
    </PageTransition>
  );
}
