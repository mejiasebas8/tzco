import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MoreInfo from "@/pages/MoreInfo";
import ParticleDemo from "@/pages/ParticleDemo";
import ParticleComparisonDemo from "@/pages/ParticleComparisonDemo";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/more-info" component={MoreInfo} />
      <Route path="/particle-demo" component={ParticleDemo} />
      <Route path="/particle-comparison" component={ParticleComparisonDemo} />
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
