import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-sheen">
      <div className="grain">
        <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <Card className="glass rounded-3xl p-7" data-testid="card-not-found">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-card-border bg-white/55 shadow-xs"
                    data-testid="img-not-found"
                  >
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <h1
                    className="mt-4 font-serif text-3xl tracking-[-0.02em]"
                    data-testid="text-not-found-title"
                  >
                    Page not found
                  </h1>
                  <p
                    className="mt-2 text-sm text-muted-foreground"
                    data-testid="text-not-found-subtitle"
                  >
                    The link you followed doesn’t exist in this prototype.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link href="/">
                  <Button className="h-10" data-testid="link-back-home">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to dashboard
                  </Button>
                </Link>
                <Button variant="secondary" className="h-10" data-testid="button-not-found-support">
                  Contact support
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
