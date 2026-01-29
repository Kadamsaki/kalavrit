import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle2, Pencil, Plus, RefreshCw, Shield, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { adminSeedOrders, artworks, type AdminOrder, type OrderStatus } from "@/lib/data";

const statuses: OrderStatus[] = ["New", "In review", "Sketch approved", "Painting", "Shipped", "Delivered"];

export default function AdminPage() {
  const [tab, setTab] = useState("artworks");
  const [orders, setOrders] = useState<AdminOrder[]>(adminSeedOrders);
  const [q, setQ] = useState("");

  const filteredOrders = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return orders;
    return orders.filter(
      (o) =>
        o.id.toLowerCase().includes(query) ||
        o.customer.toLowerCase().includes(query) ||
        o.status.toLowerCase().includes(query),
    );
  }, [orders, q]);

  function updateStatus(id: string, status: OrderStatus) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <PageTransition>
      <SiteNav />
      <main className="studio-noise">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="font-serif text-3xl tracking-[-0.02em]" data-testid="text-admin-title">
                Admin panel (mock)
              </h1>
              <p className="mt-2 text-sm text-muted-foreground" data-testid="text-admin-subtitle">
                Frontend-only UI to manage artworks + custom orders.
              </p>
            </div>
            <Link href="/">
              <Button asChild variant="secondary" className="h-10" data-testid="button-admin-home">
                <a data-testid="link-admin-home">Back to site</a>
              </Button>
            </Link>
          </div>

          <Card className="glass-card ring-soft mt-6 rounded-[36px] p-6" data-testid="card-admin">
            <Tabs value={tab} onValueChange={setTab} data-testid="tabs-admin">
              <TabsList className="inline-flex h-11 rounded-2xl border border-card-border bg-white/45 p-1" data-testid="tabs-admin-list">
                <TabsTrigger value="artworks" className="rounded-xl" data-testid="tab-admin-artworks">
                  Artworks
                </TabsTrigger>
                <TabsTrigger value="orders" className="rounded-xl" data-testid="tab-admin-orders">
                  Custom orders
                </TabsTrigger>
                <TabsTrigger value="featured" className="rounded-xl" data-testid="tab-admin-featured">
                  Homepage featured
                </TabsTrigger>
              </TabsList>

              <TabsContent value="artworks" className="mt-5" data-testid="panel-admin-artworks">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">Manage artworks</div>
                    <div className="text-sm text-muted-foreground">This UI is a mock—no database updates.</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className="h-10" data-testid="button-admin-add">
                      <Plus className="mr-2 h-4 w-4" />
                      Add artwork
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-admin-artworks">
                  {artworks.map((a) => (
                    <Card key={a.id} className="glass-card hover-lift rounded-3xl p-4" data-testid={`card-admin-artwork-${a.id}`}>
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-card-border bg-white/40">
                        <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                      </div>
                      <div className="mt-3">
                        <div className="font-serif" data-testid={`text-admin-artwork-title-${a.id}`}>
                          {a.title}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">₹{a.price.toLocaleString("en-IN")}</div>
                      </div>
                      <Button variant="secondary" className="mt-3 h-10 w-full" data-testid={`button-admin-edit-${a.id}`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-5" data-testid="panel-admin-orders">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-sm font-semibold">Manage custom orders</div>
                    <div className="text-sm text-muted-foreground">Filter and update status (client-side only).</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search id, customer, status…"
                      className="h-10 w-[240px]"
                      data-testid="input-admin-search"
                    />
                    <Button
                      variant="secondary"
                      className="h-10"
                      onClick={() => setOrders(adminSeedOrders)}
                      data-testid="button-admin-reset"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3" data-testid="list-admin-orders">
                  {filteredOrders.map((o) => (
                    <div
                      key={o.id}
                      className="rounded-3xl border border-card-border bg-white/45 p-5"
                      data-testid={`row-admin-order-${o.id}`}
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="font-semibold" data-testid={`text-admin-order-id-${o.id}`}>
                              {o.id}
                            </div>
                            <Badge variant="secondary" className="border-card-border bg-white/55" data-testid={`badge-admin-type-${o.id}`}>
                              {o.type}
                            </Badge>
                            <Badge variant="secondary" className="border-card-border bg-white/55" data-testid={`badge-admin-budget-${o.id}`}>
                              {o.budget}
                            </Badge>
                          </div>
                          <div className="mt-1 text-sm text-muted-foreground" data-testid={`text-admin-customer-${o.id}`}>
                            {o.customer} • created {o.createdAt}
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                          <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v as any)}>
                            <SelectTrigger className="h-10 w-[190px]" data-testid={`select-admin-status-${o.id}`}>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {statuses.map((s) => (
                                <SelectItem key={s} value={s} data-testid={`option-admin-status-${o.id}-${s.replace(/\s+/g, "-").toLowerCase()}`}>
                                  {s}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button variant="secondary" className="h-10" data-testid={`button-admin-view-${o.id}`}>
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="featured" className="mt-5" data-testid="panel-admin-featured">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="grid gap-4 lg:grid-cols-12"
                >
                  <Card className="glass-card ring-soft rounded-3xl p-6 lg:col-span-5" data-testid="card-admin-featured-left">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-[hsl(var(--accent))]" />
                      <div className="text-sm font-semibold">Feature selections</div>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      In production, you’d pick featured items and the homepage would update.
                    </p>
                    <div className="mt-4 space-y-2">
                      {artworks.slice(0, 3).map((a) => (
                        <div key={a.id} className="rounded-2xl border border-card-border bg-white/45 px-4 py-4">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{a.title}</div>
                            <CheckCircle2 className="h-4 w-4 text-[hsl(158_38%_28%)]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <Card className="glass-card ring-soft rounded-3xl p-6 lg:col-span-7" data-testid="card-admin-featured-right">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <div className="text-sm font-semibold">Publishing checklist</div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {[
                        "Add real images",
                        "Connect database",
                        "Secure admin",
                        "Enable payments",
                        "Add Cloudinary",
                        "Set policies",
                      ].map((t, i) => (
                        <div
                          key={t}
                          className="rounded-2xl border border-card-border bg-white/45 px-4 py-4 text-sm"
                          data-testid={`card-admin-check-${i}`}
                        >
                          {t}
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </PageTransition>
  );
}
