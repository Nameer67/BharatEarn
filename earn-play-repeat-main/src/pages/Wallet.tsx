
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet as WalletIcon, CreditCard, Send, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface WalletProps {
  user: any;
}

const Wallet = ({ user }: WalletProps) => {
  const [withdrawForm, setWithdrawForm] = useState({
    name: "",
    upiId: "",
    amount: ""
  });

  const handleWithdrawRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawForm.amount);
    
    if (amount < 1000) {
      toast({
        title: "Minimum Withdrawal Amount",
        description: "Minimum withdrawal amount is ₹1000",
        variant: "destructive"
      });
      return;
    }

    if (amount > (user?.balance || 0)) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have sufficient balance for this withdrawal",
        variant: "destructive"
      });
      return;
    }

    if ((user?.balance || 0) >= 1000) {
      // Show entertainment purpose message
      toast({
        title: "Entertainment Purpose Only",
        description: "This platform is for entertainment purposes only. You can only run videos using this money.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Your withdrawal request has been submitted successfully!",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to access your wallet
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Wallet
          </h1>
          <p className="text-xl text-gray-600">
            Manage your earnings and withdrawals
          </p>
        </div>

        {/* Balance Card */}
        <Card className="mb-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">Current Balance</CardTitle>
                <div className="text-4xl font-bold">₹{user.balance}</div>
              </div>
              <WalletIcon className="w-16 h-16 text-indigo-200" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">₹{user.balance}</div>
                <div className="text-indigo-200">Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold">₹0</div>
                <div className="text-indigo-200">Pending</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="withdraw" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="withdraw" className="space-y-6">
            {/* Minimum Withdrawal Alert */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Minimum Withdrawal: ₹1000</strong>
                <br />
                You need at least ₹1000 in your wallet to make a withdrawal request.
              </AlertDescription>
            </Alert>

            {/* Withdrawal Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="w-5 h-5" />
                  <span>Withdrawal Request</span>
                </CardTitle>
                <CardDescription>
                  Enter your details to request a withdrawal
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleWithdrawRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={withdrawForm.name}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      type="text"
                      placeholder="yourname@upi"
                      value={withdrawForm.upiId}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, upiId: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Withdrawal Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount (Min: ₹1000)"
                      value={withdrawForm.amount}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                      min="1000"
                      max={user.balance}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={user.balance < 1000}
                  >
                    {user.balance < 1000 ? (
                      <>Minimum Withdrawal ₹1000</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Request Withdrawal
                      </>
                    )}
                  </Button>
                </form>

                {user.balance >= 1000 && (
                  <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      <strong>Important:</strong> This platform is for entertainment purposes only. 
                      You can only run videos using this money.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Earning Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Today's Earnings:</span>
                      <span className="font-semibold">₹12.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Week:</span>
                      <span className="font-semibold">₹87.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Earned:</span>
                      <span className="font-semibold">₹{user.balance}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>How to Earn More</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Watch long videos: ₹2 each</p>
                    <p>• Watch short videos: ₹0.25 each</p>
                    <p>• Check daily for new videos</p>
                    <p>• Complete full videos to earn</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <a href="/earn">Start Earning</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>
                  Your earning and withdrawal history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock transaction data */}
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Video: Tech Tutorial</div>
                        <div className="text-sm text-gray-500">Today, 2:30 PM</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">+₹2.00</div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Video: Quick Tip</div>
                        <div className="text-sm text-gray-500">Today, 1:15 PM</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">+₹0.25</div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Video: Programming Guide</div>
                        <div className="text-sm text-gray-500">Yesterday, 6:45 PM</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">+₹2.00</div>
                  </div>

                  {/* Empty state */}
                  <div className="text-center py-8 text-gray-500">
                    <WalletIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No more transactions to show</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Wallet;
