import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import HomePage from "./pages/home";
import GalleryPage from "./pages/gallery";
import ArtworkDetailPage from "./pages/artwork";
import CustomOrderPage from "./pages/custom-order";
import PaymentPage from "./pages/payment";
import ReviewsPage from "./pages/reviews";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import AdminPage from "./pages/admin";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/artwork/:id" component={ArtworkDetailPage} />
      <Route path="/custom" component={CustomOrderPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/reviews" component={ReviewsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/admin" component={AdminPage} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
