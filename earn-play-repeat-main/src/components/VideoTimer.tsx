
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Timer } from "lucide-react";

interface VideoTimerProps {
  videoId: string;
  earning: number;
  isWatched: boolean;
  onVideoComplete: (videoId: string, earning: number) => void;
  duration?: number; // in seconds, default 50
}

const VideoTimer = ({ 
  videoId, 
  earning, 
  isWatched, 
  onVideoComplete, 
  duration = 50 
}: VideoTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isWatched);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0 && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0 && !isCompleted) {
      setIsCompleted(true);
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isCompleted]);

  const handleStartTimer = () => {
    if (!isCompleted && !isWatched) {
      setIsActive(true);
    }
  };

  const handleClaimReward = () => {
    if (isCompleted && !isWatched) {
      onVideoComplete(videoId, earning);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isWatched) {
    return (
      <div className="space-y-3">
        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-700 font-medium">Watched Today ✓</p>
        </div>
        <Button
          className="w-full"
          disabled
          variant="secondary"
        >
          Watched Today ✓
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Timer className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            Watch for {duration} seconds to earn ₹{earning}
          </span>
        </div>
        <div className="text-2xl font-bold text-blue-600">
          {formatTime(timeLeft)}
        </div>
      </div>

      {!isActive && !isCompleted && (
        <Button
          className="w-full"
          onClick={handleStartTimer}
          variant="outline"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Watching
        </Button>
      )}

      {isActive && !isCompleted && (
        <Button
          className="w-full"
          disabled
          variant="secondary"
        >
          <Timer className="w-4 h-4 mr-2" />
          Watching... {formatTime(timeLeft)}
        </Button>
      )}

      {isCompleted && !isWatched && (
        <Button
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={handleClaimReward}
        >
          <Play className="w-4 h-4 mr-2" />
          Claim ₹{earning}
        </Button>
      )}
    </div>
  );
};

export default VideoTimer;
