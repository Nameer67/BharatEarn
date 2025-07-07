
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Users, Gift, Coins } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReferEarnProps {
  user: any;
}

const ReferEarn = ({ user }: ReferEarnProps) => {
  const [referralCode] = useState("BE" + Math.random().toString(36).substr(2, 6).toUpperCase());
  const [referredUsers] = useState([
    { name: "Rahul Kumar", date: "2024-01-15", earned: 40, status: "completed" },
    { name: "Priya Sharma", date: "2024-01-12", earned: 40, status: "completed" },
    { name: "Amit Singh", date: "2024-01-10", earned: 0, status: "pending" }
  ]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast({
      title: "Copied!",
      description: "Referral code copied to clipboard",
    });
  };

  const handleShareLink = () => {
    const shareUrl = `https://bharatearn.com/signup?ref=${referralCode}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to access refer and earn program
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" asChild>
              <a href="/">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Refer & Earn
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Invite friends and earn ₹40 for each successful referral
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-lg">Total Referrals</CardTitle>
              </div>
              <p className="text-3xl font-bold text-blue-600">{referredUsers.length}</p>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Coins className="w-6 h-6 text-green-600" />
                <CardTitle className="text-lg">Total Earned</CardTitle>
              </div>
              <p className="text-3xl font-bold text-green-600">
                ₹{referredUsers.filter(u => u.status === "completed").reduce((sum, u) => sum + u.earned, 0)}
              </p>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Gift className="w-6 h-6 text-purple-600" />
                <CardTitle className="text-lg">Per Referral</CardTitle>
              </div>
              <p className="text-3xl font-bold text-purple-600">₹40</p>
            </CardHeader>
          </Card>
        </div>

        {/* Referral Code Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Referral Code</CardTitle>
            <CardDescription>
              Share this code with friends to earn ₹40 when they join and complete their first video
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-2xl font-bold text-center text-indigo-600">{referralCode}</p>
              </div>
              <Button onClick={handleCopyCode} variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="flex space-x-4">
              <Button onClick={handleShareLink} className="flex-1">
                <Share2 className="w-4 h-4 mr-2" />
                Share Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="font-semibold mb-2">Share Your Code</h3>
                <p className="text-gray-600 text-sm">Send your referral code to friends and family</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-green-600">2</span>
                </div>
                <h3 className="font-semibold mb-2">Friend Joins</h3>
                <p className="text-gray-600 text-sm">They sign up using your referral code</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="font-semibold mb-2">You Earn ₹40</h3>
                <p className="text-gray-600 text-sm">Get ₹40 when they watch their first video</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
            <CardDescription>Track your successful referrals and earnings</CardDescription>
          </CardHeader>
          <CardContent>
            {referredUsers.length > 0 ? (
              <div className="space-y-4">
                {referredUsers.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">{referral.name}</p>
                      <p className="text-sm text-gray-600">Joined on {referral.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₹{referral.earned}</p>
                      <Badge variant={referral.status === "completed" ? "default" : "secondary"}>
                        {referral.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No referrals yet</h3>
                <p className="text-gray-600">Start sharing your referral code to earn rewards!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferEarn;
