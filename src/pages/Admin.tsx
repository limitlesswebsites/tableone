
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp } from 'lucide-react';
import MetricCard from '@/components/metrics/MetricCard';
import ChartPanel from '@/components/metrics/ChartPanel';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InvestorInterest {
  email: string;
  investment_amount: number;
  created_at: string;
}

type SortField = 'email' | 'investment_amount' | 'created_at';
type SortOrder = 'asc' | 'desc';

const Admin = () => {
  const [investorData, setInvestorData] = useState<InvestorInterest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Sorting states
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Investment data states
  const committedAmount = 55500; // Fixed committed amount
  const targetAmount = 400000; // Target amount
  
  // Monthly interest data for chart
  const [monthlyData, setMonthlyData] = useState<{ month: string, value: number }[]>([]);

  // Calculate metrics
  const totalInterestedAmount = investorData.reduce((sum, investor) => sum + investor.investment_amount, 0);
  const totalInvestorCount = investorData.length;
  const averageInvestmentAmount = totalInvestorCount > 0 ? totalInterestedAmount / totalInvestorCount : 0;
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Toggle order if clicking on the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Sort investors data
  const sortedInvestors = [...investorData].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'email') {
      comparison = a.email.localeCompare(b.email);
    } else if (sortField === 'investment_amount') {
      comparison = a.investment_amount - b.investment_amount;
    } else if (sortField === 'created_at') {
      comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Fetch investment interest data
  useEffect(() => {
    const fetchInvestmentInterests = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('investment_interests')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching investment interests:', error);
          throw error;
        }
        
        setInvestorData(data || []);
        
        // Process data for monthly chart
        const monthlyInterest = processMonthlyData(data || []);
        setMonthlyData(monthlyInterest);
        
      } catch (error) {
        console.error('Error in useEffect:', error);
        toast({
          title: "Failed to load investment data",
          description: "There was an issue retrieving the investment interests.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestmentInterests();
  }, [toast]);
  
  // Process data to show monthly interest totals
  const processMonthlyData = (data: InvestorInterest[]): { month: string, value: number }[] => {
    const monthlyTotals: Record<string, number> = {};
    
    data.forEach(item => {
      const date = new Date(item.created_at);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyTotals[monthYear]) {
        monthlyTotals[monthYear] = 0;
      }
      
      monthlyTotals[monthYear] += item.investment_amount;
    });
    
    // Convert to array format for chart
    return Object.entries(monthlyTotals)
      .map(([month, value]) => ({ month, value }))
      .sort((a, b) => {
        // Sort by date (assuming format is "MMM YYYY")
        const [monthA, yearA] = a.month.split(' ');
        const [monthB, yearB] = b.month.split(' ');
        
        if (yearA !== yearB) return Number(yearA) - Number(yearB);
        
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months.indexOf(monthA) - months.indexOf(monthB);
      });
  };

  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="inline h-4 w-4 ml-1" /> : <ChevronDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gradient-metallic">Fundraising Admin Dashboard</h1>
        <p className="text-white/60">Review all investment interest metrics and data.</p>
      </div>
      
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-white/60">Loading investment data...</p>
        </div>
      ) : (
        <>
          {/* Key metrics overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <MetricCard
              title="Total Investors"
              value={totalInvestorCount}
              description="Number of interested investors"
              delay={100}
            />
            
            <MetricCard
              title="Committed Amount"
              value={committedAmount}
              prefix="$"
              description="Total committed investment"
              delay={200}
            />
            
            <MetricCard
              title="Interest Amount"
              value={totalInterestedAmount}
              prefix="$"
              description="Total interested investment"
              delay={300}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ChartPanel
              title="Monthly Interest"
              description="Investment interest by month"
              data={monthlyData}
              valuePrefix="$"
              animationDelay={400}
            />
            
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10">
              <CardHeader>
                <CardTitle className="text-center text-gradient font-sfpro">Investment Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/70">Average Investment</span>
                    <span className="font-semibold">${averageInvestmentAmount.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/70">Target Amount</span>
                    <span className="font-semibold">${targetAmount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/70">Total Funding %</span>
                    <span className="font-semibold">
                      {((committedAmount + totalInterestedAmount) / targetAmount * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pb-2 border-b border-white/10">
                    <span className="text-white/70">Committed %</span>
                    <span className="font-semibold">
                      {(committedAmount / targetAmount * 100).toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Interest %</span>
                    <span className="font-semibold">
                      {(totalInterestedAmount / targetAmount * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Detailed investor table */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
            <h2 className="text-xl font-semibold p-6 border-b border-white/10">Investor Details</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10">
                    <TableHead 
                      className="text-white/70 cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('email')}
                    >
                      Email {renderSortIcon('email')}
                    </TableHead>
                    <TableHead 
                      className="text-white/70 text-right cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('investment_amount')}
                    >
                      Investment Amount {renderSortIcon('investment_amount')}
                    </TableHead>
                    <TableHead 
                      className="text-white/70 text-right cursor-pointer hover:text-white transition-colors"
                      onClick={() => handleSort('created_at')}
                    >
                      Date {renderSortIcon('created_at')}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedInvestors.map((investor, index) => (
                    <TableRow key={index} className="border-white/10">
                      <TableCell className="font-medium">{investor.email}</TableCell>
                      <TableCell className="text-right">${investor.investment_amount.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        {new Date(investor.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {investorData.length === 0 && (
                <div className="text-center py-10 text-white/60">
                  No investor data available
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
