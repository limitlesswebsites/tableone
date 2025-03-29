
import React, { useState } from 'react';
import CountUp from './CountUp';
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Line, 
  LineChart 
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { lifetimeValueData, churnRateData } from './metrics/chartData';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';
import { BarChart, BarChart2, LineChart as LineChartIcon, TrendingDown } from 'lucide-react';

interface MonthlyData {
  name: string;
  value: number;
}

const RevenueChart: React.FC = () => {
  const currentARR = 151286.88;
  const [selectedChart, setSelectedChart] = useState("arr");
  
  const revenueData: MonthlyData[] = [
    { name: 'Jul', value: 11232 },
    { name: 'Aug', value: 11980 },
    { name: 'Sep', value: 12546 },
    { name: 'Oct', value: 11890 },
    { name: 'Nov', value: 12380 },
    { name: 'Dec', value: 12607 },
  ];

  // Forecast data (showing higher growth trajectory)
  const forecastData: MonthlyData[] = [
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
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-white/80 mb-1">Current Annual Recurring Revenue</h3>
              <div className="text-3xl md:text-4xl font-bold" style={{ color: '#05d9a7' }}>
                <CountUp end={currentARR} prefix="$" decimals={2} />
              </div>
            </div>
            <div>
              <div className="flex items-center bg-white/5 px-4 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
                <span className="text-white/80 text-sm">+8.76% from previous month</span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <Tabs value={selectedChart} onValueChange={setSelectedChart} className="w-full">
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

              <TabsContent value="arr" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[...revenueData, ...forecastData.map(item => ({ ...item, isForecast: true }))]
                        .sort((a, b) => {
                          const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                          return months.indexOf(a.name) - months.indexOf(b.name);
                        })}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                      <YAxis 
                        stroke="rgba(255,255,255,0.6)"
                        tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value, name, props) => {
                          const label = props.payload.isForecast ? 'Forecasted Revenue' : 'Actual Revenue';
                          return [`$${(value as number).toLocaleString()}`, label];
                        }}
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#05d9a7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#05d9a7" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Line 
                        type="monotone"
                        dataKey="value"
                        stroke="#05d9a7"
                        strokeWidth={3}
                        dot={{ fill: '#05d9a7', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Actual Revenue"
                        connectNulls
                        data={revenueData}
                      />
                      <Line 
                        type="monotone"
                        dataKey="value"
                        stroke="#9b87f5"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={{ fill: '#9b87f5', r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Forecasted Revenue"
                        connectNulls
                        data={forecastData}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#05d9a7] mr-2"></div>
                    <span className="text-white/80 text-sm">Actual Revenue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-2"></div>
                    <span className="text-white/80 text-sm">Forecasted Revenue</span>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="growth" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={subscriberGrowthData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                      <YAxis 
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <Tooltip
                        formatter={(value) => [`${(value as number).toLocaleString()}`, 'Subscribers']}
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <defs>
                        <linearGradient id="colorSubscribers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#9b87f5" 
                        fillOpacity={1} 
                        fill="url(#colorSubscribers)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center gradient-subheading">
                  <p>Subscriber growth from 1,350 to 2,000+ active users</p>
                </div>
              </TabsContent>

              <TabsContent value="ltv" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lifetimeValueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.6)"
                        tickFormatter={(value) => `$${value}`}
                      />
                      <Tooltip 
                        formatter={(value) => [`$${value}`, "Subscriber Lifetime Value"]}
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Subscriber Lifetime Value" 
                        stroke="#05d9a7" 
                        strokeWidth={3}
                        activeDot={{ r: 8 }} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center gradient-subheading">
                  <p>Average LTV increasing to $71.02 per subscriber</p>
                </div>
              </TabsContent>

              <TabsContent value="churn" className="pt-4">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={churnRateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="month" 
                        stroke="rgba(255,255,255,0.6)"
                      />
                      <YAxis 
                        stroke="rgba(255,255,255,0.6)"
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, "Subscriber Churn Rate"]}
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '0.5rem',
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Subscriber Churn Rate" 
                        stroke="#ea384c" 
                        strokeWidth={3}
                        activeDot={{ r: 8 }} 
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 text-center gradient-subheading">
                  <p>Churn rate decreasing to 9.8% in March 2025</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60 mb-1">New Subscribers</div>
              <div className="text-2xl font-bold" style={{ color: '#05d9a7' }}>+312</div>
              <div className="text-xs text-white/50">last month</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60 mb-1">Revenue Growth</div>
              <div className="text-2xl font-bold" style={{ color: '#05d9a7' }}>+4.28%</div>
              <div className="text-xs text-white/50">month over month</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-sm text-white/60 mb-1">Retention Rate</div>
              <div className="text-2xl font-bold" style={{ color: '#05d9a7' }}>90.2%</div>
              <div className="text-xs text-white/50">improving steadily</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
