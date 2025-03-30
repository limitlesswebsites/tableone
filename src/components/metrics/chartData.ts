// Chart data for the metrics section
export const lifetimeValueData = [
  { month: 'Oct \'24', value: 47.37 },
  { month: 'Nov \'24', value: 44.44 },
  { month: 'Dec \'24', value: 51.93 },
  { month: 'Jan \'25', value: 57.69 },
  { month: 'Feb \'25', value: 60.41 },
  { month: 'Mar \'25', value: 74.49 },
];

export const churnRateData = [
  { month: 'Oct \'24', value: 13.2 },
  { month: 'Nov \'24', value: 16.8 },
  { month: 'Dec \'24', value: 14.0 },
  { month: 'Jan \'25', value: 12.4 },
  { month: 'Feb \'25', value: 12.1 },
  { month: 'Mar \'25', value: 9.4 },
];

// Updated with explicit "actual" | "forecast" type union
export const revenueData = [
  { name: 'Oct \'24', value: 59000, type: 'actual' as const },
  { name: 'Nov \'24', value: 81000, type: 'actual' as const },
  { name: 'Dec \'24', value: 108000, type: 'actual' as const },
  { name: 'Jan \'25', value: 124000, type: 'actual' as const },
  { name: 'Feb \'25', value: 142000, type: 'actual' as const },
  { name: 'Mar \'25', value: 152000, type: 'actual' as const },
];

// Updated with explicit "actual" | "forecast" type union
export const forecastData = [
  { name: 'Oct \'24', value: 35000, type: 'forecast' as const },
  { name: 'Nov \'24', value: 71000, type: 'forecast' as const },
  { name: 'Dec \'24', value: 107000, type: 'forecast' as const },
  { name: 'Jan \'25', value: 122000, type: 'forecast' as const },
  { name: 'Feb \'25', value: 141000, type: 'forecast' as const },
  { name: 'Mar \'25', value: 160000, type: 'forecast' as const },
  { name: 'Apr \'25', value: 191000, type: 'forecast' as const },
  { name: 'May \'25', value: 214000, type: 'forecast' as const },
  { name: 'Jun \'25', value: 263000, type: 'forecast' as const },
  { name: 'Jul \'25', value: 299000, type: 'forecast' as const },
  { name: 'Aug \'25', value: 331000, type: 'forecast' as const },
  { name: 'Sep \'25', value: 380000, type: 'forecast' as const },
  { name: 'Oct \'25', value: 424000, type: 'forecast' as const },
  { name: 'Nov \'25', value: 478000, type: 'forecast' as const },
  { name: 'Dec \'25', value: 514000, type: 'forecast' as const },
];
