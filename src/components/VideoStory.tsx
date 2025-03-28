
import React, { useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause, ExternalLink } from 'lucide-react';

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
          <div className="mt-4 text-center">
            <a 
              href="https://www.linkedin.com/feed/update/urn:li:activity:7311092973469896705/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <span>Watch on LinkedIn</span>
              <ExternalLink size={16} className="ml-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoStory;
