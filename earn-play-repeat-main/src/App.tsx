
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Earn from "./pages/Earn";
import Wallet from "./pages/Wallet";
import AdminPanel from "./pages/AdminPanel";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ReferEarn from "./pages/ReferEarn";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header user={user} setUser={setUser} isAdmin={isAdmin} />
            <main className="flex-1 px-2 sm:px-0">
              <Routes>
                <Route path="/" element={<Index user={user} setUser={setUser} />} />
                <Route path="/earn" element={<Earn user={user} />} />
                <Route path="/refer" element={<ReferEarn user={user} />} />
                <Route path="/wallet" element={<Wallet user={user} />} />
                <Route path="/dashboard" element={<Dashboard user={user} />} />
                {isAdmin && <Route path="/admin" element={<AdminPanel />} />}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
