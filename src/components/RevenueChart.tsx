
import React, { useState } from 'react';
import { TabsContent } from './ui/tabs';
import { 
  lifetimeValueData, 
  churnRateData, 
  revenueData, 
  forecastData 
} from './metrics/chartData';
import ARRChart from './charts/ARRChart';
import SubscriberGrowthChart from './charts/SubscriberGrowthChart';
import LifetimeValueChart from './charts/LifetimeValueChart';
import ChurnRateChart from './charts/ChurnRateChart';
import ChartTabs from './charts/ChartTabs';
import RevenueHeader from './charts/RevenueHeader';

const RevenueChart: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState("arr");
  
  // Updated Subscriber Growth data with the new values
  const subscriberGrowthData = [
    { name: 'Sep \'24', value: 375 },
    { name: 'Oct \'24', value: 745 },
    { name: 'Nov \'24', value: 1072 },
    { name: 'Dec \'24', value: 1275 },
    { name: 'Jan \'25', value: 1486 },
    { name: 'Feb \'25', value: 1677 },
    { name: 'Mar \'25', value: 2031 },
  ];
  
  return (
    <section id="revenue" className="py-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl mb-4 text-gradient-metallic font-sfpro font-medium" style={{ letterSpacing: '-0.5px' }}>
            Our Revenue Growth Journey
          </h2>
          <p className="text-base max-w-2xl mx-auto text-[#8E8E93] font-sfpro">
            Consistent month-over-month growth as we expand our subscriber base.
          </p>
        </div>

        <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 md:p-8 max-w-5xl mx-auto">
          <RevenueHeader 
            selectedChart={selectedChart} 
          />

          <div className="mb-5">
            <ChartTabs 
              selectedChart={selectedChart} 
              onTabChange={setSelectedChart}
            >
              <TabsContent value="arr" className="pt-4">
                <ARRChart revenueData={revenueData} forecastData={forecastData} />
              </TabsContent>

              <TabsContent value="growth" className="pt-4">
                <SubscriberGrowthChart data={subscriberGrowthData} />
              </TabsContent>

              <TabsContent value="ltv" className="pt-4">
                <LifetimeValueChart data={lifetimeValueData} />
              </TabsContent>

              <TabsContent value="churn" className="pt-4">
                <ChurnRateChart data={churnRateData} />
              </TabsContent>
            </ChartTabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
