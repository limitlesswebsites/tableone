
import React from 'react';
import CountUp from './CountUp';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';
import { lifetimeValueData, churnRateData } from './metrics/chartData';

interface MonthlyData {
  name: string;
  value: number;
}

const RevenueChart: React.FC = () => {
  const currentARR = 151286.88;
  
  const data: MonthlyData[] = [
    { name: 'Jul', value: 11232 },
    { name: 'Aug', value: 11980 },
    { name: 'Sep', value: 12546 },
    { name: 'Oct', value: 11890 },
    { name: 'Nov', value: 12380 },
    { name: 'Dec', value: 12607 },
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
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" />
                <YAxis 
                  stroke="rgba(255,255,255,0.6)"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Monthly Revenue']}
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
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#05d9a7" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-5xl mx-auto">
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center gradient-heading">Subscriber Lifetime Value</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lifetimeValueData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
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
            <div className="mt-3 text-center gradient-subheading">
              <p>Average LTV increasing to $71.02 per subscriber</p>
            </div>
          </div>
          
          <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6 animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 text-center gradient-heading">Subscriber Churn Rate</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={churnRateData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.6)"
                    tick={{ fontSize: 12 }}
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
                    stroke="#05d9a7" 
                    strokeWidth={3}
                    activeDot={{ r: 8 }} 
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-center gradient-subheading">
              <p>Churn rate decreasing to 9.8% in March 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueChart;
