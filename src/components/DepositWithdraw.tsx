
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet, CreditCard, Banknote, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DepositWithdrawProps {
  userBalance: number;
  setUserBalance: (balance: number | ((prev: number) => number)) => void;
}

const DepositWithdraw = ({ userBalance, setUserBalance }: DepositWithdrawProps) => {
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { toast } = useToast();

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive"
      });
      return;
    }

    setUserBalance(prev => prev + amount);
    setDepositAmount('');
    toast({
      title: "Deposit Successful",
      description: `₹${amount} has been added to your wallet`
    });
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid withdrawal amount",
        variant: "destructive"
      });
      return;
    }

    if (amount < 1000) {
      toast({
        title: "Minimum Withdrawal",
        description: "Minimum withdrawal amount is ₹1000",
        variant: "destructive"
      });
      return;
    }

    if (amount > userBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive"
      });
      return;
    }

    // Note: As per disclaimer, withdrawals are not actually processed
    toast({
      title: "Withdrawal Request",
      description: "As per our policy, earnings can only be used within the platform for entertainment purposes",
      variant: "destructive"
    });
    setWithdrawAmount('');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Wallet Management</h2>
        <p className="text-sm text-gray-600">Manage your deposits and withdrawals</p>
      </div>

      {/* Current Balance */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardContent className="p-4 text-center">
          <Wallet className="w-8 h-8 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Current Balance</h3>
          <p className="text-2xl font-bold">₹{userBalance.toFixed(2)}</p>
        </CardContent>
      </Card>

      {/* Deposit Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="w-5 h-5 mr-2 text-green-600" />
            Deposit Money
          </CardTitle>
          <CardDescription>Add money to your wallet for video uploads</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="deposit">Amount (₹)</Label>
            <Input
              id="deposit"
              type="number"
              placeholder="Enter amount"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
          </div>
          <Button onClick={handleDeposit} className="w-full" variant="default">
            Deposit Money
          </Button>
        </CardContent>
      </Card>

      {/* Withdrawal Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center text-lg">
            <Banknote className="w-5 h-5 mr-2 text-blue-600" />
            Withdraw Money
          </CardTitle>
          <CardDescription>Minimum withdrawal: ₹1000</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor="withdraw">Amount (₹)</Label>
            <Input
              id="withdraw"
              type="number"
              placeholder="Min ₹1000"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
            />
          </div>
          <Button 
            onClick={handleWithdraw} 
            className="w-full" 
            variant="outline"
            disabled={userBalance < 1000}
          >
            Request Withdrawal
          </Button>
        </CardContent>
      </Card>

      {/* Warning Card */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800">Withdrawal Policy</h3>
              <p className="text-sm text-amber-700 mt-1">
                As per our terms, earnings from watching videos cannot be withdrawn and are for entertainment purposes only. However, you can deposit money for video upload features.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Deposit Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Quick Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2">
            {[50, 100, 500].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUserBalance(prev => prev + amount);
                  toast({
                    title: "Quick Deposit",
                    description: `₹${amount} added to wallet`
                  });
                }}
              >
                +₹{amount}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DepositWithdraw;
