import { useMemo, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BadgeIndianRupee, CheckCircle2, CreditCard, QrCode, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

import { PageTransition } from "@/components/site/transition";
import { SiteNav } from "@/components/site/nav";
import { SiteFooter } from "@/components/site/footer";

export default function PaymentPage() {
  const [paid, setPaid] = useState(false);
  const [amount, setAmount] = useState<"Advance (30%)" | "Full">("Advance (30%)");

  const price = 12999;
  const computed = useMemo(() => (amount === "Full" ? price : Math.round(price * 0.3)), [amount]);

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-4xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <Link href="/custom">
            <Button asChild variant="secondary" className="h-10" data-testid="button-payment-back">
              <a data-testid="link-payment-back">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </a>
            </Button>
          </Link>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-payment-title">
                Payment (mock)
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-payment-subtitle">
                UI for UPI + Card checkout. No real payment is processed in this prototype.
              </p>
            </div>
            <Badge variant="secondary" className="border-card-border bg-white/45" data-testid="badge-payment">
              Razorpay-ready UI
            </Badge>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-12">
            <Card className="glass-card ring-soft rounded-[36px] p-6 lg:col-span-7" data-testid="card-payment">
              {!paid ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold" data-testid="text-payment-method-title">
                        Choose method
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground" data-testid="text-payment-method-sub">
                        Pay full or an advance to start the painting.
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Amount</div>
                      <div className="mt-1 inline-flex items-center gap-2">
                        <BadgeIndianRupee className="h-4 w-4 text-primary" />
                        <div className="text-xl font-semibold" data-testid="text-payment-amount">
                          ₹{computed.toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2" data-testid="payment-amount-toggle">
                    <Button
                      variant={amount === "Advance (30%)" ? "default" : "secondary"}
                      className="h-10"
                      onClick={() => setAmount("Advance (30%)")}
                      data-testid="button-payment-advance"
                    >
                      Advance (30%)
                    </Button>
                    <Button
                      variant={amount === "Full" ? "default" : "secondary"}
                      className="h-10"
                      onClick={() => setAmount("Full")}
                      data-testid="button-payment-full"
                    >
                      Full payment
                    </Button>
                  </div>

                  <Tabs defaultValue="upi" className="mt-5" data-testid="tabs-payment">
                    <TabsList className="inline-flex h-11 rounded-2xl border border-card-border bg-white/45 p-1" data-testid="tabs-payment-list">
                      <TabsTrigger value="upi" className="rounded-xl" data-testid="tab-upi">
                        UPI
                      </TabsTrigger>
                      <TabsTrigger value="card" className="rounded-xl" data-testid="tab-card">
                        Card
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="upi" className="mt-4" data-testid="tab-panel-upi">
                      <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                        <div className="flex items-center gap-2">
                          <QrCode className="h-4 w-4 text-primary" />
                          <div className="font-semibold">UPI QR</div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Scan to pay. (Mock UI)
                        </p>
                        <div className="mt-4 rounded-3xl border border-card-border bg-white/55 p-6 text-center">
                          <div className="mx-auto h-40 w-40 rounded-2xl border border-card-border bg-gradient-to-br from-[hsl(var(--accent)/0.35)] to-[hsl(var(--primary)/0.25)]" />
                          <div className="mt-3 text-sm text-muted-foreground">upi@artist (example)</div>
                        </div>
                        <Button className="mt-4 h-11 w-full" onClick={() => setPaid(true)} data-testid="button-upi-pay">
                          I paid (simulate)
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="card" className="mt-4" data-testid="tab-panel-card">
                      <div className="rounded-3xl border border-card-border bg-white/45 p-5">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          <div className="font-semibold">Card payment</div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                          Card form omitted in prototype—simulate success.
                        </p>
                        <Button className="mt-4 h-11 w-full" onClick={() => setPaid(true)} data-testid="button-card-pay">
                          Pay now (simulate)
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="py-4"
                  data-testid="panel-payment-success"
                >
                  <div className="mx-auto max-w-xl text-center">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-3xl border border-card-border bg-white/55">
                      <CheckCircle2 className="h-7 w-7 text-[hsl(158_38%_28%)]" />
                    </div>
                    <h2 className="mt-5 font-serif text-3xl" data-testid="text-payment-success-title">
                      Payment successful (mock)
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground" data-testid="text-payment-success-subtitle">
                      Next: you’ll receive a sketch preview. We’ll keep you updated at each step.
                    </p>

                    <div className="mt-6 rounded-3xl border border-card-border bg-white/45 p-5 text-left">
                      <div className="text-sm font-semibold">Order timeline</div>
                      <div className="mt-4 space-y-3">
                        {["In review", "Sketch approved", "Painting", "Shipped"].map((s, idx) => (
                          <div key={s} className="rounded-2xl border border-card-border bg-white/40 p-4">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">{s}</div>
                              <div className="text-xs text-muted-foreground">step {idx + 1}</div>
                            </div>
                            <Progress value={(idx + 1) * 22} className="mt-3" />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                      <Link href="/gallery">
                        <Button asChild className="h-11" data-testid="button-payment-gallery">
                          <a data-testid="link-payment-gallery">Browse originals</a>
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button asChild variant="secondary" className="h-11" data-testid="button-payment-contact">
                          <a data-testid="link-payment-contact">Contact</a>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>

            <Card className="glass-card ring-soft rounded-[36px] p-6 lg:col-span-5" data-testid="card-payment-side">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="text-sm font-semibold" data-testid="text-payment-side-title">
                  Trust notes
                </div>
              </div>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-payment-side-subtitle">
                This is how a real checkout would build confidence.
              </p>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="rounded-2xl border border-card-border bg-white/40 px-4 py-3">Advance payment starts the painting.</div>
                <div className="rounded-2xl border border-card-border bg-white/40 px-4 py-3">Sketch approval avoids surprises.</div>
                <div className="rounded-2xl border border-card-border bg-white/40 px-4 py-3">No loud upsells—just clarity.</div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
