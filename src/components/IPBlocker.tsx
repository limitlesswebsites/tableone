
import React, { useEffect, useState } from 'react';
import { isIPBlocked } from '@/utils/ipBlocklist';

const IPBlocker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);
  const [ipAddress, setIpAddress] = useState<string | null>(null);

  useEffect(() => {
    const checkIP = async () => {
      try {
        // Fetch the user's IP address
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        setIpAddress(ip);
        
        // Check if IP is blocked
        if (isIPBlocked(ip)) {
          setBlocked(true);
          // We never set loading to false for blocked IPs
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching IP:', error);
        // In case of error, we allow access
        setLoading(false);
      }
    };
    
    checkIP();
  }, []);

  if (blocked || (loading && ipAddress && isIPBlocked(ipAddress))) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  }

  return loading ? (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  ) : (
    <>{children}</>
  );
};

export default IPBlocker;
