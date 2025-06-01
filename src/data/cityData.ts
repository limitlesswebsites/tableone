
import { CityStatus } from '../components/CityBox';

export interface CityInfo {
  name: string;
  status: CityStatus;
}

export const cities: CityInfo[] = [
  { name: "New York", status: "Active" },
  { name: "Chicago", status: "Coming Soon" },
  { name: "Boston", status: "Coming Soon" },
  { name: "Washington DC", status: "Coming Soon" },
  { name: "Los Angeles", status: "Planned" },
  { name: "San Francisco", status: "Planned" },
  { name: "Philadelphia", status: "Planned" },
  { name: "London", status: "Planned" },
  { name: "Miami", status: "Planned" },
  { name: "Atlanta", status: "Planned" },
  { name: "Denver", status: "Planned" },
  { name: "Seattle", status: "Planned" },
  { name: "Austin", status: "Planned" },
  { name: "Portland", status: "Planned" },
  { name: "Toronto", status: "Planned" },
  { name: "Vancouver", status: "Planned" },
  { name: "Paris", status: "Planned" },
  { name: "Tokyo", status: "Planned" },
];
