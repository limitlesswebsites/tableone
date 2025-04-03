
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp, Edit, Save } from 'lucide-react';
import MetricCard from '@/components/metrics/MetricCard';
import ChartPanel from '@/components/metrics/ChartPanel';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { InvestorStatusRow } from '@/integrations/supabase/types-extension';

interface InvestorInterest {
  email: string;
  investment_amount: number;
  created_at: string;
  id: string;
}

interface InvestorStatus {
  id: string;
  investor_email: string;
  reached_out: boolean;
  committed: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

type CombinedInvestorData = InvestorInterest & {
  status?: InvestorStatus;
  isEditing?: boolean;
  editedNotes?: string;
};

type SortField = 'email' | 'investment_amount' | 'created_at';
type SortOrder = 'asc' | 'desc';

const Admin = () => {
  const [investorData, setInvestorData] = useState<InvestorInterest[]>([]);
  const [investorStatusData, setInvestorStatusData] = useState<InvestorStatus[]>([]);
  const [combinedData, setCombinedData] = useState<CombinedInvestorData[]>([]);
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

  // Toggle edit mode for a specific investor
  const toggleEditMode = (email: string) => {
    setCombinedData(prevData => 
      prevData.map(investor => 
        investor.email === email 
          ? { 
              ...investor, 
              isEditing: !investor.isEditing,
              editedNotes: investor.status?.notes || ''
            } 
          : investor
      )
    );
  };

  // Handle checkbox change for reached_out and committed
  const handleCheckboxChange = async (email: string, field: 'reached_out' | 'committed') => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      const currentValue = investorToUpdate.status?.[field] || false;
      const newValue = !currentValue;
      
      // Update local state first for responsive UI
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                status: { 
                  ...investor.status as InvestorStatus,
                  [field]: newValue 
                } 
              } 
            : investor
        )
      );
      
      // Check if we need to create a new record or update existing one
      if (!investorToUpdate.status) {
        // Create a new record
        const { error } = await supabase
          .from('investor_status')
          .insert({ 
            investor_email: email, 
            [field]: newValue,
            notes: null,
            reached_out: field === 'reached_out' ? newValue : false,
            committed: field === 'committed' ? newValue : false
          });
          
        if (error) throw error;
      } else {
        // Update existing record
        const { error } = await supabase
          .from('investor_status')
          .update({ [field]: newValue })
          .eq('investor_email', email);
          
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: `Investor ${field.replace('_', ' ')} status updated successfully`,
      });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      toast({
        title: `Failed to update ${field.replace('_', ' ')} status`,
        description: "There was an error updating the status.",
        variant: "destructive"
      });
      
      // Revert local state on error
      await fetchInvestorData();
    }
  };
  
  // Handle saving notes
  const handleSaveNotes = async (email: string, notes: string) => {
    try {
      const investorToUpdate = combinedData.find(i => i.email === email);
      
      if (!investorToUpdate) return;
      
      // Update local state first for responsive UI
      setCombinedData(prevData => 
        prevData.map(investor => 
          investor.email === email 
            ? { 
                ...investor, 
                isEditing: false,
                status: { 
                  ...investor.status as InvestorStatus,
                  notes 
                } 
              } 
            : investor
        )
      );
      
      // Check if we need to create a new record or update existing one
      if (!investorToUpdate.status) {
        // Create a new record
        const { error } = await supabase
          .from('investor_status')
          .insert({ 
            investor_email: email, 
            notes,
            reached_out: false,
            committed: false
          });
          
        if (error) throw error;
      } else {
        // Update existing record
        const { error } = await supabase
          .from('investor_status')
          .update({ notes })
          .eq('investor_email', email);
          
        if (error) throw error;
      }
      
      toast({
        title: "Success",
        description: "Investor notes updated successfully",
      });
    } catch (error) {
      console.error("Error updating notes:", error);
      toast({
        title: "Failed to update notes",
        description: "There was an error updating the notes.",
        variant: "destructive"
      });
      
      // Revert local state on error
      await fetchInvestorData();
    }
  };
  
  // Handle notes input change
  const handleNotesChange = (email: string, notes: string) => {
    setCombinedData(prevData => 
      prevData.map(investor => 
        investor.email === email 
          ? { ...investor, editedNotes: notes } 
          : investor
      )
    );
  };

  // Sort investors data
  const sortedInvestors = [...combinedData].sort((a, b) => {
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

  // Fetch investment interest data and status data
  const fetchInvestorData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch investment interests
      const { data: interestsData, error: interestsError } = await supabase
        .from('investment_interests')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (interestsError) {
        console.error('Error fetching investment interests:', interestsError);
        throw interestsError;
      }
      
      // Set investor interest data
      setInvestorData(interestsData || []);
      
      try {
        // Fetch investor status data
        const { data: statusData, error: statusError } = await supabase
          .from('investor_status')
          .select('*');
          
        if (statusError) {
          console.error('Error fetching investor status:', statusError);
          // Don't throw here, just set empty array to continue
          setInvestorStatusData([]);
        } else {
          // Set investor status data
          setInvestorStatusData(statusData as InvestorStatus[] || []);
          
          // Combine the data
          const combined = (interestsData || []).map(interest => {
            const status = (statusData || []).find(s => s.investor_email === interest.email);
            return {
              ...interest,
              status: status as InvestorStatus | undefined,
              isEditing: false,
              editedNotes: status?.notes || ''
            };
          });
          
          setCombinedData(combined);
        }
      } catch (statusError) {
        console.error('Error handling status data:', statusError);
        // Continue with just the investment data
        const combined = (interestsData || []).map(interest => ({
          ...interest,
          isEditing: false,
          editedNotes: ''
        }));
        setCombinedData(combined);
      }
      
      // Process data for monthly chart
      const monthlyInterest = processMonthlyData(interestsData || []);
      setMonthlyData(monthlyInterest);
      
    } catch (error) {
      console.error('Error in fetchInvestorData:', error);
      toast({
        title: "Failed to load investment data",
        description: "There was an issue retrieving the investment interests.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchInvestorData();
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
                    <TableHead className="text-white/70 text-center">
                      Reached Out
                    </TableHead>
                    <TableHead className="text-white/70 text-center">
                      Committed
                    </TableHead>
                    <TableHead className="text-white/70">
                      Notes
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
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox 
                            checked={investor.status?.reached_out || false}
                            onCheckedChange={() => handleCheckboxChange(investor.email, 'reached_out')}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex justify-center">
                          <Checkbox 
                            checked={investor.status?.committed || false}
                            onCheckedChange={() => handleCheckboxChange(investor.email, 'committed')}
                            className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[250px]">
                        {investor.isEditing ? (
                          <div className="flex flex-col gap-2">
                            <Textarea 
                              value={investor.editedNotes || ''} 
                              onChange={(e) => handleNotesChange(investor.email, e.target.value)}
                              className="min-h-[80px] bg-white/10 border-white/20 text-white"
                              placeholder="Add notes about this investor..."
                            />
                            <div className="flex gap-2 justify-end">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => toggleEditMode(investor.email)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleSaveNotes(investor.email, investor.editedNotes || '')}
                              >
                                <Save className="mr-1 h-4 w-4" />
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-between items-start gap-2">
                            <div className="text-sm text-white/80 line-clamp-2">
                              {investor.status?.notes || 
                                <span className="text-white/40 italic">No notes</span>
                              }
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={() => toggleEditMode(investor.email)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
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
