
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Upload, Video, Star, Gift, Play } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  userBalance: number;
  setUserBalance: (balance: number | ((prev: number) => number)) => void;
}

const VideoUpload = ({ userBalance, setUserBalance }: VideoUploadProps) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState<Array<{
    id: string;
    title: string;
    description: string;
    link: string;
    type: 'paid' | 'free';
  }>>([]);
  const { toast } = useToast();

  const getVideoEmbedUrl = (url: string) => {
    // YouTube URL conversion
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Instagram URL (basic handling)
    if (url.includes('instagram.com')) {
      return url + 'embed';
    }
    return url;
  };

  const isValidVideoUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be') || url.includes('instagram.com');
  };

  const handlePaidUpload = () => {
    if (userBalance < 10) {
      toast({
        title: "Insufficient Balance",
        description: "You need ₹10 to upload videos",
        variant: "destructive"
      });
      return;
    }

    if (!videoLink.trim() || !videoTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a video link and title",
        variant: "destructive"
      });
      return;
    }

    if (!isValidVideoUrl(videoLink)) {
      toast({
        title: "Invalid Video Link",
        description: "Please enter a valid YouTube or Instagram video link",
        variant: "destructive"
      });
      return;
    }

    setUserBalance(prev => prev - 10);
    
    const newVideo = {
      id: Date.now().toString(),
      title: videoTitle,
      description: videoDescription,
      link: videoLink,
      type: 'paid' as const
    };
    
    setUploadedVideos(prev => [...prev, newVideo]);
    
    toast({
      title: "Video Uploaded Successfully",
      description: "Your video has been uploaded for promotion. ₹10 deducted."
    });

    // Reset form
    setVideoTitle('');
    setVideoDescription('');
    setVideoLink('');
  };

  const handleFreeUpload = () => {
    if (!videoLink.trim() || !videoTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a video link and title",
        variant: "destructive"
      });
      return;
    }

    if (!isValidVideoUrl(videoLink)) {
      toast({
        title: "Invalid Video Link",
        description: "Please enter a valid YouTube or Instagram video link",
        variant: "destructive"
      });
      return;
    }

    const newVideo = {
      id: Date.now().toString(),
      title: videoTitle,
      description: videoDescription,
      link: videoLink,
      type: 'free' as const
    };
    
    setUploadedVideos(prev => [...prev, newVideo]);

    toast({
      title: "Video Uploaded Successfully",
      description: "Your video has been uploaded and will be available for others to watch."
    });

    // Reset form
    setVideoTitle('');
    setVideoDescription('');
    setVideoLink('');
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Upload Videos</h2>
        <p className="text-sm text-gray-600">Share your content and earn from views</p>
      </div>

      {/* Upload Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Video className="w-5 h-5 mr-2" />
            Video Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="video-link">Video Link</Label>
            <Input
              id="video-link"
              type="url"
              placeholder="Paste YouTube or Instagram video link here"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Supported: YouTube, Instagram videos
            </p>
          </div>

          <div>
            <Label htmlFor="title">Video Title</Label>
            <Input
              id="title"
              placeholder="Enter video title"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Enter video description"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Upload Options */}
      <div className="grid gap-4">
        {/* Paid Promotion */}
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Star className="w-5 h-5 mr-2 text-yellow-600" />
              Paid Promotion - ₹10
            </CardTitle>
            <CardDescription>
              Upload videos for promotion. Get better visibility!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm">Your Balance: ₹{userBalance.toFixed(2)}</span>
              <span className="text-sm font-semibold text-yellow-700">Cost: ₹10</span>
            </div>
            <Button 
              onClick={handlePaidUpload} 
              className="w-full bg-yellow-600 hover:bg-yellow-700"
              disabled={userBalance < 10}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload for Promotion
            </Button>
          </CardContent>
        </Card>

        {/* Free Upload */}
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Gift className="w-5 h-5 mr-2 text-green-600" />
              Free Upload
            </CardTitle>
            <CardDescription>
              Upload videos for free. Earn when others watch your content!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-3">
              <p className="text-sm text-green-700">
                • Upload videos for others to watch
                • You earn when people view your content
                • No cost to upload
              </p>
            </div>
            <Button 
              onClick={handleFreeUpload} 
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload for Free
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Uploaded Videos */}
      {uploadedVideos.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Your Uploaded Videos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedVideos.map((video) => (
              <div key={video.id} className="border rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{video.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${video.type === 'paid' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {video.type === 'paid' ? 'Promoted' : 'Free'}
                  </span>
                </div>
                <AspectRatio ratio={1} className="bg-gray-100 rounded overflow-hidden">
                  <iframe
                    src={getVideoEmbedUrl(video.link)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </AspectRatio>
                {video.description && (
                  <p className="text-xs text-gray-600 mt-2">{video.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upload Guidelines */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Upload Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Video must be your original content</p>
            <p>• Paste valid YouTube or Instagram video links</p>
            <p>• No inappropriate or copyrighted content</p>
            <p>• Paid promotion gives priority placement</p>
            <p>• Videos will be displayed in square format</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoUpload;
