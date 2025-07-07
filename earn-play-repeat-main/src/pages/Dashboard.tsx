
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Wallet, Play, Clock, TrendingUp, Youtube, CheckCircle } from "lucide-react";

interface DashboardProps {
  user: any;
}

const Dashboard = ({ user }: DashboardProps) => {
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to access your dashboard
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

  // Mock data
  const todayEarnings = 12.50;
  const weeklyEarnings = 87.50;
  const videosWatched = 15;
  const withdrawalProgress = (user.balance / 1000) * 100;

  const recentVideos = [
    { title: "Top 10 Amazing Facts About India", date: "Today, 2:30 PM", earned: 2.00 },
    { title: "Quick Tech Tips #1", date: "Today, 1:15 PM", earned: 0.25 },
    { title: "Complete Programming Tutorial", date: "Yesterday, 6:45 PM", earned: 2.00 },
    { title: "Daily Life Hack", date: "Yesterday, 3:20 PM", earned: 0.25 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-xl text-gray-600 mt-2">
            Here's your earning dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-indigo-600">₹{user.balance}</div>
              <p className="text-xs text-muted-foreground">
                {user.balance >= 1000 ? "Ready to withdraw" : `₹${1000 - user.balance} to withdraw`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{todayEarnings}</div>
              <p className="text-xs text-muted-foreground">
                +20% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Videos Watched</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videosWatched}</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 45m</div>
              <p className="text-xs text-muted-foreground">
                This week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress to Withdrawal */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progress to Minimum Withdrawal</CardTitle>
            <CardDescription>
              You need ₹1000 to make your first withdrawal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={withdrawalProgress} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>₹{user.balance}</span>
                <span>₹1000</span>
              </div>
              <p className="text-sm text-gray-600">
                {user.balance >= 1000 
                  ? "Congratulations! You can now make a withdrawal request."
                  : `You need ₹${1000 - user.balance} more to reach the minimum withdrawal amount.`
                }
              </p>
              {user.balance < 1000 && (
                <Button className="w-full sm:w-auto" asChild>
                  <a href="/earn">Watch More Videos</a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Youtube className="w-5 h-5" />
                <span>Video History</span>
              </CardTitle>
              <CardDescription>
                Your recent video watching activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVideos.map((video, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{video.title}</div>
                        <div className="text-xs text-gray-500">{video.date}</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold text-sm">+₹{video.earned}</div>
                  </div>
                ))}
                {recentVideos.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Youtube className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>No videos watched yet</p>
                    <Button variant="outline" className="mt-4" asChild>
                      <a href="/earn">Start Watching</a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks you might want to do
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full justify-start" asChild>
                  <a href="/earn">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Videos & Earn
                  </a>
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/wallet">
                    <Wallet className="w-4 h-4 mr-2" />
                    Manage Wallet
                  </a>
                </Button>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-3">Earning Tips</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• Watch complete videos to earn full rewards</p>
                    <p>• Check daily for new video uploads</p>
                    <p>• Long videos pay more than shorts</p>
                    <p>• You can watch each video once per day</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
