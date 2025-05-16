
// List of IP addresses to block
export const blockedIPs: string[] = [
  // Add your IP addresses here
  "103.158.95.98",    // Example IP 1
];

// Function to check if an IP is in the blocklist
export const isIPBlocked = (ip: string | null): boolean => {
  if (!ip) return false;
  return blockedIPs.includes(ip);
};
