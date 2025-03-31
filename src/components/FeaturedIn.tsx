
import React from 'react';
import { Newspaper, Tv, Video } from 'lucide-react';
import forbes from '../assets/forbes.png'
import gothamist from '../assets/gothamist.png'
import newyorker from '../assets/newyorker-stack.png'


const FeaturedIn: React.FC = () => {
  function toArticle(url: string) {
    window.open(url, '_blank');
  }

  return (
    <section className="py-12 relative" style={{background: 'transparent'}}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2  rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium mb-8 text-[#8E8E93] font-sfpro">Featured In</h3>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Forbes-style logo */}
            <div className="group flex flex-col items-center transition-all" style={{maxWidth: '9rem'}} onClick={()=>(toArticle("https://gothamist.com/arts-entertainment/dinner-reservations-at-tatiana-are-impossible-to-get-so-i-spent-a-month-trying"))}>
              <img src={gothamist} />
            </div>
            
            {/* CNN-style logo */}
            <div className="group flex flex-col items-center transition-all" style={{maxWidth: '9rem'}} onClick={()=>(toArticle("https://www.forbes.com/sites/lauriewerner/2024/04/27/mothers-day-gift-guide-2024-top-new-york-restaurant-gift-certificates"))}>
              <img src={forbes} />
            </div>
            
            {/* Bloomberg-style logo */}
            <div className="group flex flex-col items-center transition-all" style={{maxWidth: '9rem'}} onClick={()=>(toArticle("https://www.newyorker.com/news/our-local-correspondents/why-you-cant-get-a-restaurant-reservation"))}>
              <img src={newyorker} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
