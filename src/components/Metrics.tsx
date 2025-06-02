
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Metrics: React.FC = () => {
  // Log confirmation to check if component is rendering
  console.log("Metrics component rendering");
  
  // State to track if image is loaded
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Pre-load the image to ensure it's available
  useEffect(() => {
    const img = new Image();
    img.src = '/lovable-uploads/4d8c82f4-9545-4a55-a994-77325d811978.png';
    img.onload = () => {
      console.log("Background image loaded successfully");
      setImageLoaded(true);
    };
    img.onerror = (e) => {
      console.error("Error loading background image:", e);
    };
  }, []);

  // TableOne app screenshots
  const appScreenshots = [
    {
      src: "/lovable-uploads/e15d989b-e49f-4864-a162-0eb8e54ba4b3.png",
      alt: "TableOne Explore View - Restaurant listings with availability"
    },
    {
      src: "/lovable-uploads/776f3066-2714-4e4f-a009-641260e6a99f.png",
      alt: "TableOne Filters View - Advanced search options"
    },
    {
      src: "/lovable-uploads/8676d12c-e287-45cd-a438-297ae17cec24.png",
      alt: "TableOne Recording View"
    },
    {
      src: "/lovable-uploads/ab4e67b6-1665-4c5e-b634-b7aad9a95d22.png",
      alt: "TableOne Cards Collection - Where I've Been"
    },
    {
      src: "/lovable-uploads/9ea2d6e8-3a1e-4ee8-9d04-cc836ba79155.png",
      alt: "TableOne App Loading Screen"
    }
  ];
  
  return (
    <section id="metrics" className="py-8 relative">
      {/* Background image - using inline styles with important to override any conflicting styles */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{
            backgroundImage: "url('/lovable-uploads/4d8c82f4-9545-4a55-a994-77325d811978.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.4,
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <div className="absolute top-1/2 right-0 w-1/2 h-1/2 bg-pink-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-7xl mb-4 animate-fade-in font-sfpro text-gradient-metallic font-medium" style={{ letterSpacing: '-0.5px' }}>
            Platinum Card Dining,<br />Without The Card
          </h2>
          <p className="text-base max-w-2xl mx-auto animate-fade-in animate-delay-100 text-[#8E8E93] font-sfpro">
            Never before seen filters and features to make finding your perfect table easier than its ever been.
          </p>
        </div>
        
        {/* Screenshots Carousel - responsive sizing: smaller on mobile, 2x bigger on desktop */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[160px] md:w-[320px] mx-auto"> {/* 160px on mobile, 320px on desktop */}
            <Carousel className="w-full h-full" opts={{ loop: true }}>
              <CarouselContent className="h-full">
                {appScreenshots.map((screenshot, index) => (
                  <CarouselItem key={index} className="h-full">
                    <div className="w-full h-full">
                      <img
                        src={screenshot.src}
                        alt={screenshot.alt}
                        className="w-full h-auto object-cover rounded-[1.5rem] shadow-2xl"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute -left-12 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white w-8 h-8 z-30" />
              <CarouselNext className="absolute -right-12 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 border-white/20 text-white w-8 h-8 z-30" />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Metrics;
