import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-contact-title">
                Contact & Trust
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-contact-subtitle">
                Ask anything—timeline, revisions, delivery. WhatsApp link is UI-only.
              </p>
            </div>
            <Link href="/custom">
              <Button asChild className="h-10" data-testid="button-contact-cta">
                <a data-testid="link-contact-cta">
                  Start custom order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <Card className="glass-card ring-soft rounded-[36px] p-6 lg:col-span-6" data-testid="card-contact-form">
              {!sent ? (
                <>
                  <div className="text-sm font-semibold" data-testid="text-contact-form-title">
                    Message the studio
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid="text-contact-form-subtitle">
                    This form is simulated in the prototype.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Input placeholder="Your name" className="h-11" data-testid="input-contact-name" />
                    <Input placeholder="Email or phone" className="h-11" data-testid="input-contact-email" />
                    <Textarea
                      placeholder="Tell us what you’re thinking…"
                      className="min-h-[140px]"
                      data-testid="textarea-contact-message"
                    />
                    <Button className="h-11" onClick={() => setSent(true)} data-testid="button-contact-send">
                      Send message
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      href="#"
                      className="rounded-3xl border border-card-border bg-white/45 px-4 py-4 text-sm hover:bg-white/60"
                      data-testid="link-whatsapp"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        WhatsApp (UI)
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Quick replies + updates</div>
                    </a>
                    <a
                      href="#"
                      className="rounded-3xl border border-card-border bg-white/45 px-4 py-4 text-sm hover:bg-white/60"
                      data-testid="link-call"
                    >
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        Call (UI)
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Discuss timeline & budget</div>
                    </a>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="py-8 text-center"
                  data-testid="panel-contact-success"
                >
                  <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-card-border bg-white/55">
                    <ShieldCheck className="h-7 w-7 text-[hsl(158_38%_28%)]" />
                  </div>
                  <div className="mt-4 font-serif text-2xl" data-testid="text-contact-success-title">
                    Message sent (mock)
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground" data-testid="text-contact-success-subtitle">
                    In production, you’d get an email/WhatsApp confirmation.
                  </p>
                </motion.div>
              )}
            </Card>

            <Card className="glass-card ring-soft rounded-[36px] p-6 lg:col-span-6" data-testid="card-faq">
              <div className="text-sm font-semibold" data-testid="text-faq-title">
                FAQ
              </div>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-faq-subtitle">
                Clear answers build trust.
              </p>

              <div className="mt-4" data-testid="faq-accordion">
                <Accordion type="single" collapsible>
                  <AccordionItem value="t1">
                    <AccordionTrigger data-testid="faq-timeline">Delivery timeline?</AccordionTrigger>
                    <AccordionContent>
                      Typical is 10–14 days after sketch approval. Rush options depend on schedule.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="t2">
                    <AccordionTrigger data-testid="faq-revisions">Revisions included?</AccordionTrigger>
                    <AccordionContent>
                      Yes—minor revisions during sketch stage. It keeps the final painting aligned to your memory.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="t3">
                    <AccordionTrigger data-testid="faq-refund">Refund policy?</AccordionTrigger>
                    <AccordionContent>
                      In production: clear cancellation window before sketch approval. This prototype shows the UI only.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
