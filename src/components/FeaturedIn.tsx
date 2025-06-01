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
    <section className="py-12 relative" style={{ background: 'transparent' }}>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/2  rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-7xl mb-4 animate-fade-in font-sfpro text-gradient-metallic font-medium" style={{ letterSpacing: '-0.5px', marginBottom: '2rem' }}>
            Featured In
          </h2>
          
          {/* Quote Section */}
          <div className="mb-8 max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl lg:text-2xl text-white/80 font-sfpro italic leading-relaxed">
              "Having an American Express Platinum Card may help... but the best way to get these reservations is to download the <span style={{ color: '#F2C498' }}>TableOne</span> app"
            </blockquote>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Forbes-style logo */}
            <div className="group flex flex-col items-center transition-all" style={{ maxWidth: '9rem' }} onClick={() => (toArticle("https://gothamist.com/arts-entertainment/dinner-reservations-at-tatiana-are-impossible-to-get-so-i-spent-a-month-trying"))}>
              <img src={gothamist} className='cursor-pointer'/>
            </div>

            {/* CNN-style logo */}
            <div className="group flex flex-col items-center transition-all" style={{ maxWidth: '9rem' }} onClick={() => (toArticle("https://www.forbes.com/sites/lauriewerner/2024/04/27/mothers-day-gift-guide-2024-top-new-york-restaurant-gift-certificates"))}>
              <img src={forbes} className='cursor-pointer'/>
            </div>

            {/* Bloomberg-style logo */}
            <div className="group flex flex-col items-center transition-all" style={{ maxWidth: '9rem' }} onClick={() => (toArticle("https://www.newyorker.com/news/our-local-correspondents/why-you-cant-get-a-restaurant-reservation"))}>
              <img src={newyorker} className='cursor-pointer'/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedIn;
