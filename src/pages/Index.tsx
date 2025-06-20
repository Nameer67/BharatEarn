
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Youtube, Instagram, Wallet, Upload, Play, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import VideoSection from "@/components/VideoSection";
import DepositWithdraw from "@/components/DepositWithdraw";
import VideoUpload from "@/components/VideoUpload";
import AdminPanel from "@/components/AdminPanel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [userBalance, setUserBalance] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({ name: "User", totalEarned: 0 });
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const { toast } = useToast();

  const handleVideoWatch = (type: 'youtube-long' | 'youtube-short' | 'instagram', earnings: number) => {
    setUserBalance(prev => prev + earnings);
    setUser(prev => ({ ...prev, totalEarned: prev.totalEarned + earnings }));
    
    const platform = type.includes('youtube') ? 'YouTube' : 'Instagram';
    const videoType = type.includes('short') ? 'Short' : 'Long Video';
    
    toast({
      title: "Earnings Added!",
      description: `Watched ${platform} ${videoType}. Earned ₹${earnings}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-900 mb-2">Bharat Earn</h1>
          <p className="text-gray-600">Watch Videos & Earn Money</p>
        </div>

        {/* Balance Card */}
        <Card className="mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Current Balance</p>
                <p className="text-2xl font-bold">₹{userBalance.toFixed(2)}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-100" />
            </div>
            <div className="mt-2">
              <p className="text-sm text-green-100">Total Earned: ₹{user.totalEarned.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Admin Toggle */}
        <div className="mb-4 text-center">
          <Button 
            variant={isAdmin ? "destructive" : "outline"} 
            size="sm"
            onClick={() => setIsAdmin(!isAdmin)}
          >
            {isAdmin ? "Exit Admin" : "Admin Access"}
          </Button>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="watch" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="watch" className="text-xs">
              <Play className="w-4 h-4 mr-1" />
              Watch
            </TabsTrigger>
            <TabsTrigger value="upload" className="text-xs">
              <Upload className="w-4 h-4 mr-1" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="wallet" className="text-xs">
              <Wallet className="w-4 h-4 mr-1" />
              Wallet
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger value="admin" className="text-xs">
                <TrendingUp className="w-4 h-4 mr-1" />
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="watch" className="mt-4">
            <VideoSection onVideoWatch={handleVideoWatch} />
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <VideoUpload userBalance={userBalance} setUserBalance={setUserBalance} />
          </TabsContent>

          <TabsContent value="wallet" className="mt-4">
            <DepositWithdraw userBalance={userBalance} setUserBalance={setUserBalance} />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin" className="mt-4">
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>

        {/* Earning Rates */}
        <Card className="mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Earning Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Youtube className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm">YouTube Long Video</span>
              </div>
              <Badge variant="secondary">₹1.00</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Youtube className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm">YouTube Shorts</span>
              </div>
              <Badge variant="secondary">₹0.10</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Instagram className="w-4 h-4 text-pink-500 mr-2" />
                <span className="text-sm">Instagram Video</span>
              </div>
              <Badge variant="secondary">₹0.50</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="mt-6 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-0 h-auto font-semibold text-orange-800 hover:bg-transparent"
              onClick={() => setShowDisclaimer(!showDisclaimer)}
            >
              <span>Important Disclaimer</span>
              {showDisclaimer ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
            {showDisclaimer && (
              <p className="text-sm text-orange-700 mt-3">
                You can only use the money earned on this website by watching videos; these earnings cannot be withdrawn. This website is for entertainment purposes only.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
