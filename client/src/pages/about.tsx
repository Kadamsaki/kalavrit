import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Sparkles, Palette, Eye, Star, Users, Brush, Quote } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

// Animation variants for scroll-based reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        {/* Hero Section with Parallax */}
        <motion.div
          ref={heroRef}
          style={{ opacity: heroOpacity }}
          className="relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--primary)/0.05)] via-transparent to-transparent" />
          <div className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 lg:px-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Badge variant="secondary" className="border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] mb-6">
                <Sparkles className="h-3 w-3 mr-1" />
                Artist Collective
              </Badge>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[-0.02em] text-foreground">
                Where Emotions
                <span className="block mt-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  Become Art
                </span>
              </h1>

              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                KalaVrit transforms your most cherished memories into timeless masterpieces.
                Each brushstroke carries emotion, each color tells a story.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* The Story Section */}
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
          >
            <motion.div variants={fadeInUp} transition={{ duration: 0.6 }}>
              <Card className="glass-card ring-soft rounded-[36px] p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[hsl(var(--primary)/0.1)] to-transparent rounded-bl-full" />

                <Quote className="h-8 w-8 text-[hsl(var(--primary)/0.3)] mb-4" />

                <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">
                  The Story Behind KalaVrit
                </h2>

                <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p>
                    KalaVrit was born from a simple yet profound idea: <strong className="text-foreground">our most meaningful memories deserve more than just a digital screen.</strong>
                  </p>
                  <p>
                    They deserve the depth, texture, and soul that only true art can provide. Every photograph holds an emotion, every moment carries a feeling that words cannot capture.
                  </p>
                  <p>
                    We are here to translate those feelings into <em className="text-[hsl(var(--primary))]">beautiful, handcrafted paintings</em> that you can hold, display, and treasure forever.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {/* Stats/Highlights */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-card ring-soft rounded-2xl p-6 text-center">
                  <div className="font-serif text-3xl text-[hsl(var(--primary))]">100+</div>
                  <div className="text-sm text-muted-foreground mt-1">Happy Customers</div>
                </Card>
                <Card className="glass-card ring-soft rounded-2xl p-6 text-center">
                  <div className="font-serif text-3xl text-[hsl(var(--primary))]">5+</div>
                  <div className="text-sm text-muted-foreground mt-1">Art Styles</div>
                </Card>
              </div>

              <Card className="glass-card ring-soft rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-[hsl(var(--primary)/0.3)] to-[hsl(var(--accent)/0.3)] border-2 border-white flex items-center justify-center">
                        <Heart className="h-3 w-3 text-[hsl(var(--primary))]" />
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Loved by families</span> across India
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* What Makes Us Different */}
        <div className="bg-gradient-to-b from-transparent via-[hsl(var(--primary)/0.03)] to-transparent py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">
                What Makes KalaVrit Different
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Every artwork is crafted with love, attention, and a deep understanding of your emotions.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { icon: Heart, title: "Emotion First", desc: "We capture feelings, not just faces" },
                { icon: Brush, title: "Handcrafted", desc: "Every stroke made with love" },
                { icon: Eye, title: "Personal Touch", desc: "Your story, your way" },
                { icon: Star, title: "Premium Quality", desc: "Museum-grade materials" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Card className="glass-card ring-soft rounded-2xl p-6 h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.15)] to-[hsl(var(--accent)/0.15)]">
                      <item.icon className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>
                    <h3 className="mt-4 font-serif text-lg">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Art Styles Section */}
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card ring-soft rounded-[36px] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-bl from-[hsl(var(--accent)/0.15)] to-transparent rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-[hsl(var(--primary)/0.15)] to-transparent rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-[hsl(var(--primary))]" />
                  <span className="text-sm font-medium text-[hsl(var(--primary))]">Our Art Styles</span>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">
                  Multiple Art Forms, One Soul
                </h2>

                <p className="mt-4 text-muted-foreground max-w-2xl">
                  From the whimsical charm of Ghibli-inspired illustrations to the raw honesty of charcoal sketches
                  and the precision of realistic portraits — we bring your vision to life in the style that speaks to you.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Ghibli Style", "Vector Art", "Realistic", "Charcoal", "Watercolor", "Custom"].map((style) => (
                    <Badge
                      key={style}
                      variant="secondary"
                      className="border-card-border bg-white/60 px-4 py-2 text-sm"
                    >
                      {style}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <Card className="glass-card ring-soft rounded-[36px] p-8 md:p-12 bg-gradient-to-br from-[hsl(var(--primary)/0.08)] via-transparent to-[hsl(var(--accent)/0.05)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-[hsl(var(--primary))]" />
                    <span className="text-sm font-medium text-[hsl(var(--primary))]">Join Our Journey</span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl tracking-[-0.01em]">
                    Ready to Create Something Beautiful?
                  </h2>
                  <p className="mt-3 text-muted-foreground max-w-lg">
                    Turn your most precious memories into timeless art. Let us help you preserve
                    the emotions that matter most.
                  </p>
                </div>

                <Link href="/custom">
                  <Button className="h-12 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                    Start Your Custom Order
                    <ArrowRight className="ml-2 h-5 w-5" />
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
