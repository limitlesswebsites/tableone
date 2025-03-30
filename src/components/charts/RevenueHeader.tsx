
import React from 'react';
import CountUp from '../CountUp';

interface RevenueHeaderProps {
  selectedChart: string;
  metrics: {
    arr: number;
    subscribers: number;
    ltv: number;
    churn: number;
  };
}

const RevenueHeader: React.FC<RevenueHeaderProps> = ({ selectedChart, metrics }) => {
  console.log("Selected chart:", selectedChart);
  console.log("Metrics in header:", metrics);

  const getMetricDisplay = () => {
    switch (selectedChart) {
      case "arr":
        return {
          title: "Current Annual Recurring Revenue",
          value: metrics.arr,
          prefix: "$",
          suffix: "",
          color: "#05d9a7"
        };
      case "growth":
        return {
          title: "Current Subscribers",
          value: metrics.subscribers,
          prefix: "",
          suffix: " users",
          color: "#9b87f5"
        };
      case "ltv":
        return {
          title: "Current Lifetime Value",
          value: metrics.ltv,
          prefix: "$",
          suffix: "",
          color: "#05d9a7"
        };
      case "churn":
        return {
          title: "Current Churn Rate",
          value: metrics.churn,
          prefix: "",
          suffix: "%",
          color: "#ea384c"
        };
      default:
        return {
          title: "Current Annual Recurring Revenue",
          value: metrics.arr,
          prefix: "$",
          suffix: "",
          color: "#05d9a7"
        };
    }
  };

  const metricInfo = getMetricDisplay();

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <div className="mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-white/80 mb-1">{metricInfo.title}</h3>
        <div className="text-3xl md:text-4xl font-bold" style={{ color: metricInfo.color }}>
          <CountUp 
            end={metricInfo.value} 
            prefix={metricInfo.prefix} 
            suffix={metricInfo.suffix} 
            decimals={selectedChart === "ltv" || selectedChart === "churn" ? 2 : 0} 
          />
        </div>
      </div>
      <div>
        <div className="flex items-center bg-white/5 px-4 py-2 rounded-full">
          <div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
          <span className="text-white/80 text-sm">+7.04% from previous month</span>
        </div>
      </div>
    </div>
  );
};

export default RevenueHeader;
