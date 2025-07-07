
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Users, Video, Wallet, Settings } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [videoForm, setVideoForm] = useState({
    title: "",
    youtubeUrl: "",
    type: "",
    earning: ""
  });

  const [videos, setVideos] = useState([
    {
      id: "1",
      title: "Top 10 Amazing Facts About India",
      youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      type: "long",
      earning: 2,
      status: "active"
    },
    {
      id: "2",
      title: "Quick Tech Tips #1",
      youtubeUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      type: "short",
      earning: 0.25,
      status: "active"
    }
  ]);

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now().toString(),
      title: videoForm.title,
      youtubeUrl: videoForm.youtubeUrl,
      type: videoForm.type,
      earning: parseFloat(videoForm.earning),
      status: "active"
    };
    
    setVideos([...videos, newVideo]);
    setVideoForm({ title: "", youtubeUrl: "", type: "", earning: "" });
    
    toast({
      title: "Video Added",
      description: "New video has been added successfully!",
    });
  };

  const handleDeleteVideo = (videoId: string) => {
    setVideos(videos.filter(video => video.id !== videoId));
    toast({
      title: "Video Deleted",
      description: "Video has been removed successfully!",
    });
  };

  // Mock data
  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalVideos: videos.length,
    totalEarnings: 45230.75,
    pendingWithdrawals: 12
  };

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", balance: 150, status: "active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", balance: 890, status: "active" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", balance: 1200, status: "premium" },
  ];

  const withdrawalRequests = [
    { id: 1, user: "John Doe", amount: 1000, upiId: "john@paytm", status: "pending", date: "2024-01-15" },
    { id: 2, user: "Jane Smith", amount: 1500, upiId: "jane@gpay", status: "pending", date: "2024-01-14" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xl text-gray-600 mt-2">
            Manage your BharatEarn platform
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVideos}</div>
              <p className="text-xs text-muted-foreground">
                Active videos
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{stats.totalEarnings}</div>
              <p className="text-xs text-muted-foreground">
                Platform earnings
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingWithdrawals}</div>
              <p className="text-xs text-muted-foreground">
                Withdrawal requests
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-6">
            {/* Add Video Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Plus className="w-5 h-5" />
                  <span>Add New Video</span>
                </CardTitle>
                <CardDescription>
                  Add a new YouTube video for users to watch and earn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Video Title</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="Enter video title"
                        value={videoForm.title}
                        onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="youtubeUrl">YouTube URL</Label>
                      <Input
                        id="youtubeUrl"
                        type="url"
                        placeholder="https://youtube.com/watch?v=..."
                        value={videoForm.youtubeUrl}
                        onChange={(e) => setVideoForm({ ...videoForm, youtubeUrl: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Video Type</Label>
                      <Select value={videoForm.type} onValueChange={(value) => setVideoForm({ ...videoForm, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select video type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="long">Long Video (₹2)</SelectItem>
                          <SelectItem value="short">Short Video (₹0.25)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="earning">Earning Amount (₹)</Label>
                      <Input
                        id="earning"
                        type="number"
                        step="0.01"
                        placeholder="2.00"
                        value={videoForm.earning}
                        onChange={(e) => setVideoForm({ ...videoForm, earning: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Video
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Videos List */}
            <Card>
              <CardHeader>
                <CardTitle>Manage Videos</CardTitle>
                <CardDescription>
                  All videos available on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {videos.map((video) => (
                    <div key={video.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{video.title}</h4>
                        <p className="text-sm text-gray-600">{video.youtubeUrl}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={video.type === "long" ? "default" : "secondary"}>
                            {video.type === "long" ? "Long Video" : "Short"}
                          </Badge>
                          <Badge variant="outline">₹{video.earning}</Badge>
                          <Badge variant="outline">{video.status}</Badge>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteVideo(video.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {videos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No videos added yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage all registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{user.name}</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">Balance: ₹{user.balance}</Badge>
                          <Badge variant={user.status === "premium" ? "default" : "secondary"}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Suspend</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Requests</CardTitle>
                <CardDescription>
                  Manage user withdrawal requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {withdrawalRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{request.user}</h4>
                        <p className="text-sm text-gray-600">UPI: {request.upiId}</p>
                        <p className="text-sm text-gray-600">Date: {request.date}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline">₹{request.amount}</Badge>
                          <Badge variant="secondary">{request.status}</Badge>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                      </div>
                    </div>
                  ))}
                  
                  {withdrawalRequests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Wallet className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                      <p>No withdrawal requests</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure platform settings and policies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minWithdrawal">Minimum Withdrawal (₹)</Label>
                      <Input
                        id="minWithdrawal"
                        type="number"
                        defaultValue="1000"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longVideoRate">Long Video Rate (₹)</Label>
                      <Input
                        id="longVideoRate"
                        type="number"
                        step="0.01"
                        defaultValue="2.00"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shortVideoRate">Short Video Rate (₹)</Label>
                      <Input
                        id="shortVideoRate"
                        type="number"
                        step="0.01"
                        defaultValue="0.25"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxDailyEarning">Max Daily Earning (₹)</Label>
                      <Input
                        id="maxDailyEarning"
                        type="number"
                        defaultValue="100"
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full md:w-auto">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
