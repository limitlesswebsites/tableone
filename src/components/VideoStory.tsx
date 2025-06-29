
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

  const openLinkedInVideo = () => {
    window.open('https://www.linkedin.com/feed/update/urn:li:activity:7311092973469896705/', '_blank');
  };

  return (
    <section id="videoStory" className="py-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-7xl mb-4 animate-fade-in text-gradient-metallic font-sfpro font-medium leading-relaxed pb-2" style={{ letterSpacing: '-0.5px' }}>
            Our story in 2 min
          </h2>
          <p className="text-base max-w-2xl mx-auto animate-fade-in animate-delay-100 text-[#8E8E93] font-sfpro">
            Featured as one of Rho's favorite startups, here's a quick video of our journey so far.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto animate-fade-in animate-delay-200">
          <div className="glass-card overflow-hidden relative">
            <AspectRatio ratio={16/9}>
              <video 
                id="story-video"
                className="w-full h-full object-cover cursor-pointer"
                poster="/lovable-uploads/203f18c4-42ca-4e12-a996-92679d1bb61f.png"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls={isPlaying}
                onClick={openLinkedInVideo}
              >
                <source 
                  src="https://assets.mixkit.co/videos/preview/mixkit-restaurant-server-bringing-food-to-customers-table-14080-large.mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
            </AspectRatio>
          </div>
          <div className="mt-5 text-center">
            <Button 
              onClick={openLinkedInVideo}
              className="px-4 py-1.5 text-xs rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              <span>Watch on LinkedIn</span>
              <ExternalLink size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoStory;
