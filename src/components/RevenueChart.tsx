
import React, { useState } from 'react';
import { TabsContent } from './ui/tabs';
import { lifetimeValueData, churnRateData } from './metrics/chartData';
import ARRChart from './charts/ARRChart';
import SubscriberGrowthChart from './charts/SubscriberGrowthChart';
import LifetimeValueChart from './charts/LifetimeValueChart';
import ChurnRateChart from './charts/ChurnRateChart';
import RevenueMetrics from './charts/RevenueMetrics';
import ChartTabs from './charts/ChartTabs';
import RevenueHeader from './charts/RevenueHeader';

const RevenueChart: React.FC = () => {
  const currentARR = 151286.88;
  const [selectedChart, setSelectedChart] = useState("arr");
  
  const revenueData = [
    { name: 'Jul', value: 11232 },
    { name: 'Aug', value: 11980 },
    { name: 'Sep', value: 12546 },
    { name: 'Oct', value: 11890 },
    { name: 'Nov', value: 12380 },
    { name: 'Dec', value: 12607 },
  ];

  // Forecast data (showing higher growth trajectory)
  const forecastData = [
    { name: 'Jul', value: 11232 },
    { name: 'Aug', value: 12100 },
    { name: 'Sep', value: 13200 },
    { name: 'Oct', value: 14500 },
    { name: 'Nov', value: 15900 },
    { name: 'Dec', value: 17500 },
  ];

  // Subscriber Growth data
  const subscriberGrowthData = [
    { name: 'Jul', value: 1350 },
    { name: 'Aug', value: 1423 },
    { name: 'Sep', value: 1512 },
    { name: 'Oct', value: 1689 },
    { name: 'Nov', value: 1834 },
    { name: 'Dec', value: 2000 },
  ];
  
  return (
    <section id="revenue" className="py-8 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl mb-4 gradient-heading">
            Our Revenue Growth Journey
          </h2>
          <p className="text-base max-w-2xl mx-auto gradient-subheading">
            Consistent month-over-month growth as we expand our user base
          </p>
        </div>

        <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 md:p-8 max-w-5xl mx-auto">
          <RevenueHeader currentARR={currentARR} />

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

          <RevenueMetrics />
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
