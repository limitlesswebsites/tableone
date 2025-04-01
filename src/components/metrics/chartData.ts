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
  { name: 'Oct \'24', value: 54716, type: 'actual' as const },
  { name: 'Nov \'24', value: 87176, type: 'actual' as const },
  { name: 'Dec \'24', value: 104043, type: 'actual' as const },
  { name: 'Jan \'25', value: 120016, type: 'actual' as const },
  { name: 'Feb \'25', value: 127278, type: 'actual' as const },
  { name: 'Mar \'25', value: 152000, type: 'actual' as const },
];

// Updated with explicit "actual" | "forecast" type union
export const forecastData = [
  { name: 'Oct \'24', value: 62754, type: 'forecast' as const },
  { name: 'Nov \'24', value: 80718, type: 'forecast' as const },
  { name: 'Dec \'24', value: 98103, type: 'forecast' as const },
  { name: 'Jan \'25', value: 116067, type: 'forecast' as const },
  { name: 'Feb \'25', value: 134032, type: 'forecast' as const },
  { name: 'Mar \'25', value: 150257, type: 'forecast' as const },
  { name: 'Apr \'25', value: 168222, type: 'forecast' as const },
  { name: 'May \'25', value: 185606, type: 'forecast' as const },
  { name: 'Jun \'25', value: 203571, type: 'forecast' as const },
  { name: 'Jul \'25', value: 220955, type: 'forecast' as const },
  { name: 'Aug \'25', value: 238920, type: 'forecast' as const },
  { name: 'Sep \'25', value: 256884, type: 'forecast' as const },
  { name: 'Oct \'25', value: 274269, type: 'forecast' as const },
  { name: 'Nov \'25', value: 292233, type: 'forecast' as const },
  { name: 'Dec \'25', value: 309618, type: 'forecast' as const },
];
