
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { BarChart, BarChart2, LineChart as LineChartIcon, TrendingDown } from 'lucide-react';

interface ChartTabsProps {
  selectedChart: string;
  onTabChange: (value: string) => void;
  children: React.ReactNode;
}

const ChartTabs: React.FC<ChartTabsProps> = ({
  selectedChart,
  onTabChange,
  children
}) => {
  return (
    <Tabs value={selectedChart} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid grid-cols-4 w-full bg-white/5 p-1">
        <TabsTrigger 
          value="arr" 
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
        >
          <BarChart2 className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">ARR vs. Forecast</span>
          <span className="inline md:hidden">ARR</span>
        </TabsTrigger>
        <TabsTrigger 
          value="growth" 
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
        >
          <BarChart className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Subscriber Growth</span>
          <span className="inline md:hidden">Growth</span>
        </TabsTrigger>
        <TabsTrigger 
          value="ltv" 
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
        >
          <LineChartIcon className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Lifetime Value</span>
          <span className="inline md:hidden">LTV</span>
        </TabsTrigger>
        <TabsTrigger 
          value="churn" 
          className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
        >
          <TrendingDown className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Churn Rate</span>
          <span className="inline md:hidden">Churn</span>
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default ChartTabs;
