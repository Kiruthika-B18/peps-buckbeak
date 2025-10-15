import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TVOverview from "./pages/TVOverview";
import FactoryHealth from "./pages/FactoryHealth";
import DashboardLayout from "./components/layout/DashboardLayout";
import MonthlyAnalytics from "./pages/MonthlyAnalytics";
import DailyDetails from "./pages/DailyDetails";
import Workforce from "./pages/Workforce";
import Materials from "./pages/Materials";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tv-overview" element={<TVOverview />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/factory-health" element={<FactoryHealth />} />
              <Route path="/monthly-analytics" element={<MonthlyAnalytics />} />
              <Route path="/daily-details" element={<DailyDetails />} />
              <Route path="/workforce" element={<Workforce />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/materials/trends" element={<Materials />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
