
import React, { useEffect } from 'react';
import CountUp from '../CountUp';

interface RevenueHeaderProps {
	selectedChart: string;
}

const RevenueHeader: React.FC<RevenueHeaderProps> = ({ selectedChart }) => {
	console.log("Selected chart:", selectedChart);

	const getMetricDisplay = () => {
		switch (selectedChart) {
			case "arr":
				return {
					title: "Current Annual Recurring Revenue",
					value: "152,000",
					prefix: "$",
					suffix: "",
					decimals: 0,
					color: "#05d9a7",
					change: "+7.04%"
				};
			case "growth":
				return {
					title: "Current Subscribers",
					value: "2,031",
					prefix: "",
					suffix: "",
					decimals: 0,
					color: "#9b87f5",
					change: "+21.1%"
				};
			case "ltv":
				return {
					title: "Current Lifetime Value",
					value: 74.49,
					prefix: "$",
					suffix: "",
					decimals: 2,
					color: "#05d9a7",
					change: "+23.3%"
				};
			case "churn":
				return {
					title: "Current Churn Rate",
					value: "9.4",
					prefix: "",
					suffix: "%",
					decimals: 1,
					color: "#ea384c",
					change: "-22.3%"
				};
			default:
				return {
					title: "Current Annual Recurring Revenue",
					value: "152,000",
					prefix: "$",
					suffix: "",
					decimals: 0,
					color: "#05d9a7",
					change: "+7.04%"
				};
		}
	};

	const metricInfo = getMetricDisplay();

	return (
		<div className="flex flex-col md:flex-row justify-between items-start mb-6">
			<div className="mb-4 md:mb-0 text-left">
				<h3 className="text-lg font-normal text-[#8E8E93] mb-1 font-sfpro text-left">{metricInfo.title}</h3>
				<div className="text-3xl md:text-4xl font-medium font-sfpro text-gradient-metallic text-left" style={{ letterSpacing: '-0.5px' }}>
				<span className="inline-block">
				{metricInfo.prefix}{metricInfo.value}{metricInfo.suffix}
				</span>
				</div>
			</div>
			<div>
				<div className="flex items-center bg-white/5 px-4 py-2 rounded-full">
					<div className="w-3 h-3 rounded-full bg-green-400 mr-2"></div>
					<span className="text-white/80 text-sm font-sfpro">{metricInfo.change} from previous month</span>
				</div>
			</div>
		</div>
	);
};

export default RevenueHeader;
