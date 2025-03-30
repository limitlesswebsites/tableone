
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
  
  // Get the most recent values from each dataset
  const getMostRecentValue = (dataArray: any[], valueKey: string = 'value') => {
    return dataArray[dataArray.length - 1][valueKey];
  };
  
  // Subscriber Growth data
  const subscriberGrowthData = [
    { name: 'Oct \'24', value: 1350 },
    { name: 'Nov \'24', value: 1423 },
    { name: 'Dec \'24', value: 1512 },
    { name: 'Jan \'25', value: 1689 },
    { name: 'Feb \'25', value: 1834 },
    { name: 'Mar \'25', value: 2000 },
  ];
  
  // Metrics for each chart type - using the most recent values from the data
  const metrics = {
    arr: getMostRecentValue(revenueData),
    subscribers: getMostRecentValue(subscriberGrowthData),
    ltv: getMostRecentValue(lifetimeValueData),
    churn: getMostRecentValue(churnRateData)
  };
  
  console.log("Current metrics:", metrics); // Debug log to confirm values
  
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
          <RevenueHeader 
            selectedChart={selectedChart} 
            metrics={metrics} 
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
