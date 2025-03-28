
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause } from 'lucide-react';

const VideoStory: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = document.getElementById('story-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="py-32 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-5 animate-fade-in tracking-tight">
            The TableOne Story in 2 min
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto animate-fade-in animate-delay-100">
            Watch how we're revolutionizing restaurant reservations
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto animate-fade-in animate-delay-200">
          <div className="glass-card overflow-hidden relative">
            <AspectRatio ratio={16/9}>
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
              >
                {!isPlaying && (
                  <div className="bg-black/30 hover:bg-black/40 transition-all duration-300 w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                )}
              </div>
              <video 
                id="story-video"
                className="w-full h-full object-cover"
                poster="/lovable-uploads/4329a76b-4372-4945-8827-e8e0265d3913.png"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={isPlaying}
              >
                <source 
                  src="https://assets.mixkit.co/videos/preview/mixkit-restaurant-server-bringing-food-to-customers-table-14080-large.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoStory;
