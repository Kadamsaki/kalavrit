import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, HeartHandshake, Instagram, MessageCircle, ShieldCheck, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        "service_6u5x1wh",
        "template_3f27ozk",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "7q81Tk3gFttZYKHNf"
      );

      setSent(true);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Ask anything—timeline, revisions, delivery.
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
                    We typically reply within 24 hours.
                  </p>

                  <div className="mt-5 grid gap-3">
                    <Input
                      name="name"
                      placeholder="Your name"
                      className="h-11"
                      value={formData.name}
                      onChange={handleChange}
                      data-testid="input-contact-name"
                    />
                    <Input
                      name="email"
                      placeholder="Email or phone"
                      className="h-11"
                      value={formData.email}
                      onChange={handleChange}
                      data-testid="input-contact-email"
                    />
                    <Textarea
                      name="message"
                      placeholder="Tell us what you’re thinking…"
                      className="min-h-[140px]"
                      value={formData.message}
                      onChange={handleChange}
                      data-testid="textarea-contact-message"
                    />
                    <Button
                      className="h-11"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      data-testid="button-contact-send"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <a
                      href="https://wa.me/919766425515"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-3xl border border-card-border bg-white/45 px-4 py-4 text-sm hover:bg-white/60 transition-colors"
                      data-testid="link-whatsapp"
                    >
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        WhatsApp
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Quick replies + updates</div>
                    </a>
                    <a
                      href="https://www.instagram.com/kalavrit.store"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-3xl border border-card-border bg-white/45 px-4 py-4 text-sm hover:bg-white/60 transition-colors"
                      data-testid="link-instagram"
                    >
                      <div className="flex items-center gap-2">
                        <Instagram className="h-4 w-4 text-primary" />
                        Instagram
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">@kalavrit.store • DM for art</div>
                    </a>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="py-12 text-center"
                  data-testid="panel-contact-success"
                >
                  <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-[32px] border border-card-border bg-white/55 shadow-sm mb-6">
                    <ShieldCheck className="h-10 w-10 text-[hsl(158_38%_28%)]" />
                  </div>
                  <div className="font-serif text-3xl mb-3" data-testid="text-contact-success-title">
                    Your message has found its way to us!
                  </div>
                  <p className="mt-2 text-base text-muted-foreground leading-relaxed max-w-md mx-auto" data-testid="text-contact-success-subtitle">
                    Thank you for sharing your thoughts with KalaVrit. We've received your message and will reach out to you with warmth and care very soon.
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-8 h-11 px-8 rounded-2xl"
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </Button>
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
