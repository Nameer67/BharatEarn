
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Coins, Youtube } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import VideoTimer from "@/components/VideoTimer";

interface EarnProps {
  user: any;
}

const Earn = ({ user }: EarnProps) => {
  const [watchedVideos, setWatchedVideos] = useState<string[]>([]);

  // Mock video data with timer durations
  const videos = [
    {
      id: "1",
      title: "Top 10 Amazing Facts About India",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
      duration: "10:30",
      type: "long",
      earning: 2,
      youtubeId: "dQw4w9WgXcQ",
      timerDuration: 50 // 50 seconds for long videos
    },
    {
      id: "2",
      title: "Quick Tech Tips #1",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
      duration: "0:45",
      type: "short",
      earning: 0.25,
      youtubeId: "dQw4w9WgXcQ",
      timerDuration: 30 // 30 seconds for shorts
    },
    {
      id: "3",
      title: "Complete Programming Tutorial",
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=300&h=200&fit=crop",
      duration: "15:20",
      type: "long",
      earning: 2,
      youtubeId: "dQw4w9WgXcQ",
      timerDuration: 50
    },
    {
      id: "4",
      title: "Daily Life Hack",
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=300&h=200&fit=crop",
      duration: "0:30",
      type: "short",
      earning: 0.25,
      youtubeId: "dQw4w9WgXcQ",
      timerDuration: 30
    }
  ];

  const handleVideoComplete = (videoId: string, earning: number) => {
    if (watchedVideos.includes(videoId)) {
      toast({
        title: "Already Watched",
        description: "You have already watched this video today!",
        variant: "destructive"
      });
      return;
    }

    setWatchedVideos([...watchedVideos, videoId]);
    
    // Here you would connect to Firebase to update user balance
    // Example: updateUserBalance(user.id, earning);
    console.log(`User ${user?.email} earned ₹${earning} from video ${videoId}`);
    
    toast({
      title: "Earning Added!",
      description: `You earned ₹${earning}! Keep watching more videos.`,
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please login to start earning by watching videos
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Watch & Earn
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Watch videos and earn money instantly
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Youtube className="w-5 h-5 text-red-600" />
                <span className="font-semibold text-gray-900">Long Videos</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">₹2</p>
              <p className="text-sm text-gray-600">per video (50s watch)</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Youtube className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-gray-900">Shorts</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">₹0.25</p>
              <p className="text-sm text-gray-600">per short (30s watch)</p>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Coins className="w-5 h-5 text-yellow-600" />
                <span className="font-semibold text-gray-900">Your Balance</span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">₹{user.balance || 0}</p>
              <p className="text-sm text-gray-600">current balance</p>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Badge variant={video.type === "long" ? "default" : "secondary"}>
                    {video.type === "long" ? "Long Video" : "Short"}
                  </Badge>
                </div>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
                  {video.duration}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
                <CardDescription className="flex items-center justify-between">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{video.duration}</span>
                  </span>
                  <span className="flex items-center space-x-1 font-semibold text-indigo-600">
                    <Coins className="w-4 h-4" />
                    <span>₹{video.earning}</span>
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <VideoTimer
                  videoId={video.id}
                  earning={video.earning}
                  isWatched={watchedVideos.includes(video.id)}
                  onVideoComplete={handleVideoComplete}
                  duration={video.timerDuration}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-16">
            <Youtube className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos available</h3>
            <p className="text-gray-600">Check back later for new videos to watch and earn!</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Earning Rules</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Click "Start Watching" to begin the timer</li>
                <li>• Long videos: Watch for 50 seconds to earn ₹2</li>
                <li>• Short videos: Watch for 30 seconds to earn ₹0.25</li>
                <li>• Click "Claim" button after timer completes</li>
                <li>• One earning per video per day</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Terms & Conditions</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Complete the full timer to become eligible</li>
                <li>• Earnings are for entertainment purposes</li>
                <li>• Minimum withdrawal: ₹1000</li>
                <li>• Balance can be used for platform features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earn;
