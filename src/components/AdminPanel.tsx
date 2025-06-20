
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Settings, Users, Video, DollarSign, Eye, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [users] = useState([
    { id: 1, name: "Rahul Kumar", balance: 45.50, totalEarned: 156.20, videosWatched: 234 },
    { id: 2, name: "Priya Sharma", balance: 89.10, totalEarned: 298.75, videosWatched: 445 },
    { id: 3, name: "Amit Singh", balance: 12.30, totalEarned: 87.60, videosWatched: 156 },
    { id: 4, name: "Sneha Patel", balance: 156.80, totalEarned: 445.30, videosWatched: 667 }
  ]);

  const [videos] = useState([
    { id: 1, title: "Tech Review: Latest Smartphone", uploader: "Rahul Kumar", views: 1234, earnings: 45.60, status: "Active" },
    { id: 2, title: "Cooking Recipe: Biryani", uploader: "Priya Sharma", views: 890, earnings: 32.40, status: "Active" },
    { id: 3, title: "Travel Vlog: Goa Beach", uploader: "Amit Singh", views: 567, earnings: 18.90, status: "Pending" },
    { id: 4, title: "Fashion Tips", uploader: "Sneha Patel", views: 2156, earnings: 78.30, status: "Active" }
  ]);

  const [platformSettings, setPlatformSettings] = useState({
    youtubeLongRate: 1.00,
    youtubeShortRate: 0.10,
    instagramRate: 0.50,
    minimumWithdrawal: 1000,
    uploadCost: 10
  });

  const { toast } = useToast();

  const handleSettingsUpdate = () => {
    toast({
      title: "Settings Updated",
      description: "Platform settings have been updated successfully"
    });
  };

  const handleDeleteVideo = (videoId: number) => {
    toast({
      title: "Video Deleted",
      description: "Video has been removed from the platform"
    });
  };

  const totalStats = {
    totalUsers: users.length,
    totalVideos: videos.length,
    totalEarnings: users.reduce((sum, user) => sum + user.totalEarned, 0),
    totalViews: videos.reduce((sum, video) => sum + video.views, 0)
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
        <p className="text-sm text-gray-600">Manage platform settings and monitor activity</p>
      </div>

      {/* Platform Statistics */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-800">{totalStats.totalUsers}</p>
            <p className="text-sm text-blue-600">Total Users</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Video className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-800">{totalStats.totalVideos}</p>
            <p className="text-sm text-green-600">Total Videos</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-800">₹{totalStats.totalEarnings.toFixed(2)}</p>
            <p className="text-sm text-purple-600">Total Earnings</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Eye className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-800">{totalStats.totalViews.toLocaleString()}</p>
            <p className="text-sm text-orange-600">Total Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Settings */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Platform Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>YouTube Long (₹)</Label>
              <Input
                type="number"
                step="0.01"
                value={platformSettings.youtubeLongRate}
                onChange={(e) => setPlatformSettings(prev => ({
                  ...prev,
                  youtubeLongRate: parseFloat(e.target.value)
                }))}
              />
            </div>
            <div>
              <Label>YouTube Short (₹)</Label>
              <Input
                type="number"
                step="0.01"
                value={platformSettings.youtubeShortRate}
                onChange={(e) => setPlatformSettings(prev => ({
                  ...prev,
                  youtubeShortRate: parseFloat(e.target.value)
                }))}
              />
            </div>
            <div>
              <Label>Instagram Rate (₹)</Label>
              <Input
                type="number"
                step="0.01"
                value={platformSettings.instagramRate}
                onChange={(e) => setPlatformSettings(prev => ({
                  ...prev,
                  instagramRate: parseFloat(e.target.value)
                }))}
              />
            </div>
            <div>
              <Label>Upload Cost (₹)</Label>
              <Input
                type="number"
                value={platformSettings.uploadCost}
                onChange={(e) => setPlatformSettings(prev => ({
                  ...prev,
                  uploadCost: parseInt(e.target.value)
                }))}
              />
            </div>
          </div>
          <Button onClick={handleSettingsUpdate} className="w-full">
            Update Settings
          </Button>
        </CardContent>
      </Card>

      {/* Recent Users */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
          <CardDescription>Monitor user activity and balances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">Balance: ₹{user.balance}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">₹{user.totalEarned}</p>
                  <p className="text-xs text-gray-500">{user.videosWatched} videos</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Video Management */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Video Management</CardTitle>
          <CardDescription>Monitor and manage uploaded videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {videos.map((video) => (
              <div key={video.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex-1">
                  <p className="font-medium text-sm">{video.title}</p>
                  <p className="text-xs text-gray-500">by {video.uploader}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant={video.status === 'Active' ? 'default' : 'secondary'}>
                      {video.status}
                    </Badge>
                    <span className="text-xs text-gray-500">{video.views} views</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">₹{video.earnings}</span>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => handleDeleteVideo(video.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
