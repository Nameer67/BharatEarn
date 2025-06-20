
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Youtube, Instagram, Play, Clock, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoSectionProps {
  onVideoWatch: (type: 'youtube-long' | 'youtube-short' | 'instagram', earnings: number) => void;
}

const VideoSection = ({ onVideoWatch }: VideoSectionProps) => {
  const [watchedVideos, setWatchedVideos] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const videos = [
    {
      id: 'yt-long-1',
      type: 'youtube-long' as const,
      title: 'Tech Review: Latest Smartphone',
      duration: '10:30',
      earnings: 1.00,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'yt-short-1',
      type: 'youtube-short' as const,
      title: 'Quick Cooking Tip',
      duration: '0:45',
      earnings: 0.10,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'yt-long-2',
      type: 'youtube-long' as const,
      title: 'Travel Vlog: Mumbai Street Food',
      duration: '15:20',
      earnings: 1.00,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'yt-short-2',
      type: 'youtube-short' as const,
      title: 'Dancing Tutorial',
      duration: '0:30',
      earnings: 0.10,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'insta-1',
      type: 'instagram' as const,
      title: 'Fashion Tips for Summer',
      duration: '2:15',
      earnings: 0.50,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      id: 'insta-2',
      type: 'instagram' as const,
      title: 'Home Workout Routine',
      duration: '3:45',
      earnings: 0.50,
      embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    }
  ];

  const handleWatchVideo = (video: typeof videos[0]) => {
    if (watchedVideos.has(video.id)) {
      toast({
        title: "Already Watched",
        description: "You have already earned from this video",
        variant: "destructive"
      });
      return;
    }

    // Simulate watching video
    toast({
      title: "Watching Video...",
      description: "Please wait while the video loads"
    });

    setTimeout(() => {
      setWatchedVideos(prev => new Set([...prev, video.id]));
      onVideoWatch(video.type, video.earnings);
    }, 2000);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'youtube-long':
      case 'youtube-short':
        return <Youtube className="w-4 h-4 text-red-500" />;
      case 'instagram':
        return <Instagram className="w-4 h-4 text-pink-500" />;
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Videos</h2>
        <p className="text-sm text-gray-600">Watch videos and earn money instantly!</p>
      </div>

      <div className="grid gap-4">
        {videos.map((video) => (
          <Card key={video.id} className={`${watchedVideos.has(video.id) ? 'opacity-60 bg-gray-50' : ''}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getIcon(video.type)}
                    <h3 className="font-medium text-sm">{video.title}</h3>
                  </div>
                  <Button 
                    size="sm" 
                    disabled={watchedVideos.has(video.id)}
                    onClick={() => handleWatchVideo(video)}
                    className="min-w-[70px]"
                  >
                    {watchedVideos.has(video.id) ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                <AspectRatio ratio={1} className="bg-gray-100 rounded overflow-hidden">
                  <iframe
                    src={video.embedUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </AspectRatio>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3" />
                    <span>{video.duration}</span>
                  </div>
                  <span className="font-semibold text-green-600">₹{video.earnings.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4 text-center">
          <h3 className="font-semibold text-blue-800 mb-2">How It Works</h3>
          <div className="space-y-1 text-sm text-blue-700">
            <p>• Watch YouTube long videos: ₹1.00 each</p>
            <p>• Watch YouTube shorts: ₹0.10 each</p>
            <p>• Watch Instagram videos: ₹0.50 each</p>
            <p>• Each video can only be watched once for earnings</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSection;
