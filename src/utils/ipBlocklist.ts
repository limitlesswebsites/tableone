
// List of IP addresses to block
export const blockedIPs: string[] = [
  // Add your IP addresses here
  "192.0.2.1",    // Example IP 1
  "192.0.2.2",    // Example IP 2
  "203.0.113.1",  // Example IP 3
];

// Function to check if an IP is in the blocklist
export const isIPBlocked = (ip: string | null): boolean => {
  if (!ip) return false;
  return blockedIPs.includes(ip);
};
