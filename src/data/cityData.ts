
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
  { name: "Dallas", status: "Planned" },
  { name: "Los Angeles", status: "Planned" },
  { name: "San Francisco", status: "Planned" },
  { name: "Philadelphia", status: "Planned" },
  { name: "London", status: "Planned" },
];
