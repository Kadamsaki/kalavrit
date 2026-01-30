import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ImagePlus, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";
import type { CustomOrderDraft } from "@/lib/data";

const steps = ["Type", "References", "Story", "Review"] as const;

function prettyFiles(files: File[]) {
  if (!files.length) return "No files";
  if (files.length === 1) return files[0].name;
  return `${files.length} files selected`;
}

export default function CustomOrderPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [draft, setDraft] = useState<CustomOrderDraft>({
    paintingType: "Ghibli",
    person: "Couple",
    size: "12x16",
    frame: "Without Frame",
    story: "",
    references: [],
  });

  const percent = useMemo(() => Math.round(((step + 1) / steps.length) * 100), [step]);

  function next() {
    setStep((s) => Math.min(steps.length - 1, s + 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function submit() {
    const phone = "919766425515";

    const hasFiles = draft.references.length > 0;
    const fileIndicator = hasFiles
      ? `${draft.references.length} file(s) selected (will be attached manually)`
      : "No files selected";

    const message = [
      "Hello KalaVrit 👋",
      "I would like to place a custom art request.",
      "",
      `🎨 Art Style: ${draft.paintingType}`,
      `👤 Person: ${draft.person}`,
      `📏 Size: ${draft.size}`,
      `🖼️ Frame: ${draft.frame}`,
      "",
      "📝 Description / Emotion:",
      draft.story ? draft.story : "(No description provided)",
      "",
      "📎 Reference Images:",
      fileIndicator,
      "",
      "Please let me know the next steps.",
      "Thank you!",
    ].join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.location.href = url;
  }

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <Link href="/">
            <Button asChild variant="secondary" className="h-10" data-testid="button-custom-back">
              <a data-testid="link-custom-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </a>
            </Button>
          </Link>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-custom-title">
                Custom painting request
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-custom-subtitle">
                A calm, step-by-step experience. No backend—your submission is simulated.
              </p>
            </div>
            <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-custom-step">
              Step {step + 1} / {steps.length} • {steps[step]}
            </Badge>
          </div>

          <Card className="glass-card ring-soft mt-6 rounded-[36px] p-6" data-testid="card-custom">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-muted-foreground" data-testid="text-custom-progress">
                Progress
              </div>
              <div className="text-sm font-medium" data-testid="text-custom-percent">
                {percent}%
              </div>
            </div>
            <Progress value={percent} className="mt-3" data-testid="progress-custom" />

            {!submitted ? (
              <div className="mt-6">
                {step === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="grid gap-4 md:grid-cols-2"
                    data-testid="panel-custom-type"
                  >
                    <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                      <div className="text-sm font-semibold" data-testid="text-custom-type-title">
                        Painting type
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground" data-testid="text-custom-type-help">
                        Pick a style—we’ll match the mood and details to your references.
                      </p>
                      <div className="mt-4">
                        <Select
                          value={draft.paintingType}
                          onValueChange={(v) => setDraft((d) => ({ ...d, paintingType: v as any }))}
                        >
                          <SelectTrigger className="h-11" data-testid="select-custom-painting-type">
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            {["Ghibli", "Vector Art", "Sketch", "Charcoal", "Realistic"].map((t) => (
                              <SelectItem
                                key={t}
                                value={t}
                                data-testid={`option-painting-type-${t.replace(/\s+/g, "-").toLowerCase()}`}
                              >
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mt-4">
                        <div className="text-sm font-semibold" data-testid="text-custom-person-title">
                          Person
                        </div>
                        <div className="mt-2">
                          <Select
                            value={draft.person}
                            onValueChange={(v) => setDraft((d) => ({ ...d, person: v as any }))}
                          >
                            <SelectTrigger className="h-11" data-testid="select-custom-person">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {["Couple", "Solo"].map((t) => (
                                <SelectItem key={t} value={t} data-testid={`option-person-${t.toLowerCase()}`}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                      <div className="text-sm font-semibold" data-testid="text-custom-size-title">
                        Size & frame
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground" data-testid="text-custom-size-help">
                        Choose size, then whether you want a framed delivery.
                      </p>
                      <div className="mt-4 grid gap-3">
                        <Select value={draft.size} onValueChange={(v) => setDraft((d) => ({ ...d, size: v as any }))}>
                          <SelectTrigger className="h-11" data-testid="select-custom-size">
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            {["A4", "A3", "12x16", "16x20"].map((t) => (
                              <SelectItem key={t} value={t} data-testid={`option-size-${t.toLowerCase()}`}>
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <Select value={draft.frame} onValueChange={(v) => setDraft((d) => ({ ...d, frame: v as any }))}>
                          <SelectTrigger className="h-11" data-testid="select-custom-frame">
                            <SelectValue placeholder="Frame" />
                          </SelectTrigger>
                          <SelectContent>
                            {["With Frame", "Without Frame"].map((t) => (
                              <SelectItem
                                key={t}
                                value={t}
                                data-testid={`option-frame-${t.replace(/\s+/g, "-").toLowerCase()}`}
                              >
                                {t}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="grid gap-4"
                    data-testid="panel-custom-references"
                  >
                    <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                      <div className="text-sm font-semibold" data-testid="text-custom-ref-title">
                        Upload reference images
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground" data-testid="text-custom-ref-help">
                        Add 1–5 photos. Clear faces and good light help a lot.
                      </p>

                      <div className="mt-4 grid gap-3 md:grid-cols-12 md:items-center">
                        <div className="md:col-span-8">
                          <Input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              setDraft((d) => ({ ...d, references: Array.from(e.target.files ?? []) }))
                            }
                            className="h-11"
                            data-testid="input-custom-files"
                          />
                        </div>
                        <div className="md:col-span-4">
                          <div
                            className="inline-flex w-full items-center justify-between rounded-2xl border border-card-border bg-white/40 px-4 py-3 text-sm"
                            data-testid="text-custom-files"
                          >
                            <span className="inline-flex items-center gap-2">
                              <ImagePlus className="h-4 w-4 text-primary" />
                              {prettyFiles(draft.references)}
                            </span>
                            <span className="text-muted-foreground">mock</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-card-border bg-white/40 p-4 text-sm text-muted-foreground">
                        Tip: If it’s a memory-based piece, add any small detail photos (a place, a letter, an object).
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="grid gap-4"
                    data-testid="panel-custom-story"
                  >
                    <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                      <div className="text-sm font-semibold" data-testid="text-custom-story-title">
                        Tell the story
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground" data-testid="text-custom-story-help">
                        What should this painting feel like when you see it?
                      </p>
                      <div className="mt-4">
                        <Textarea
                          value={draft.story}
                          onChange={(e) => setDraft((d) => ({ ...d, story: e.target.value }))}
                          placeholder="Example: This is for my parents’ anniversary. They met in college…"
                          className="min-h-[140px]"
                          data-testid="textarea-custom-story"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="grid gap-4"
                    data-testid="panel-custom-review"
                  >
                    <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                      <div className="text-sm font-semibold" data-testid="text-custom-review-title">
                        Review
                      </div>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div className="rounded-2xl border border-card-border bg-white/40 p-4">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Art style</div>
                          <div className="mt-1 font-medium" data-testid="text-review-painting-type">
                            {draft.paintingType}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-card-border bg-white/40 p-4">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Person</div>
                          <div className="mt-1 font-medium" data-testid="text-review-person">
                            {draft.person}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-card-border bg-white/40 p-4">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Size</div>
                          <div className="mt-1 font-medium" data-testid="text-review-size">
                            {draft.size}
                          </div>
                        </div>
                        <div className="rounded-2xl border border-card-border bg-white/40 p-4">
                          <div className="text-xs uppercase tracking-wider text-muted-foreground">Frame</div>
                          <div className="mt-1 font-medium" data-testid="text-review-frame">
                            {draft.frame}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 rounded-2xl border border-card-border bg-white/40 p-4">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">Story</div>
                        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-review-story">
                          {draft.story ? draft.story : "(No story added yet)"}
                        </div>
                      </div>
                      <div className="mt-4 rounded-2xl border border-card-border bg-white/40 p-4">
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">References</div>
                        <div className="mt-2 text-sm text-muted-foreground" data-testid="text-review-files">
                          {prettyFiles(draft.references)}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                      <div className="text-sm font-semibold" data-testid="text-custom-next-title">
                        What happens next
                      </div>
                      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                        <div>1) We review your references + emotion</div>
                        <div>2) We confirm next steps on WhatsApp</div>
                        <div>3) You’ll receive guidance for approvals</div>
                      </div>
                      <Button
                        variant="secondary"
                        className="mt-5 h-11 w-full"
                        onClick={submit}
                        data-testid="button-custom-submit-review"
                      >
                        Submit request on WhatsApp
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 flex items-center justify-between" data-testid="custom-nav">
                  <Button
                    variant="secondary"
                    onClick={back}
                    disabled={step === 0}
                    className="h-11"
                    data-testid="button-custom-back-step"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>

                  {step < steps.length - 1 ? (
                    <Button onClick={next} className="h-11" data-testid="button-custom-next">
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button onClick={submit} className="h-11" data-testid="button-custom-submit">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Submit request
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="py-6"
                data-testid="panel-custom-confirm"
              >
                <div className="mx-auto max-w-xl text-center">
                  <div
                    className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-card-border bg-white/55"
                    data-testid="img-custom-success"
                  >
                    <CheckCircle2 className="h-7 w-7 text-[hsl(158_38%_28%)]" />
                  </div>
                  <h2 className="mt-5 font-serif text-3xl" data-testid="text-custom-success-title">
                    Request sent (mock)
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid="text-custom-success-subtitle">
                    In a real app, you’d receive a confirmation message + next steps. Here we simulate trust-building.
                  </p>

                  <div className="mt-6 grid gap-3 text-left">
                    {["We’ll reply within 24 hours", "You’ll get a sketch preview", "Advance payment is optional"].map(
                      (t, i) => (
                        <div
                          key={t}
                          className="rounded-2xl border border-card-border bg-white/45 px-4 py-4"
                          data-testid={`card-custom-success-${i}`}
                        >
                          {t}
                        </div>
                      ),
                    )}
                  </div>

                  <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Link href="/payment">
                      <Button asChild className="h-11" data-testid="button-custom-pay">
                        <a data-testid="link-custom-pay">
                          Payment options (mock)
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </Link>
                    <Link href="/gallery">
                      <Button asChild variant="secondary" className="h-11" data-testid="button-custom-browse">
                        <a data-testid="link-custom-browse">Browse ready-made art</a>
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </Card>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
