
import React from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import VideoStory from '../components/VideoStory';
import FeaturedIn from '../components/FeaturedIn';
import Metrics from '../components/Metrics';
import Benchmarks from '../components/Benchmarks';
import Roadmap from '../components/Roadmap';
import RevenueChart from '../components/RevenueChart';
import CityMap from '../components/CityMap';
import FundingProgress from '../components/FundingProgress';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <VideoStory />
      <FeaturedIn />
      <Metrics />
      <Benchmarks />
      <Roadmap />
      <RevenueChart />
      <CityMap />
      <FundingProgress />
      
      <footer className="py-8 border-t border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <img 
                src="/lovable-uploads/4329a76b-4372-4945-8827-e8e0265d3913.png" 
                alt="TableOne Logo" 
                className="h-6 md:h-8 mr-2"
              />
            </div>
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} TableOne. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
