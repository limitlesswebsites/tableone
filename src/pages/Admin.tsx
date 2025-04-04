
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MetricCard from '@/components/metrics/MetricCard';
import { useInvestorData } from '@/hooks/admin';
import InvestorTable from '@/components/admin/InvestorTable';
import InvestmentMetricsCard from '@/components/admin/InvestmentMetricsCard';
import { useAuth } from '@/context/AuthContext';
import { LogOut } from 'lucide-react';

const Admin = () => {
  // Authentication
  const { signOut, user } = useAuth();
  
  // Investment data states
  const targetAmount = 400000; // Target amount
  
  const {
    isLoading,
    sortField,
    sortOrder,
    sortedInvestors,
    totalInterestedAmount,
    totalCommittedAmount,
    totalInvestorCount,
    averageInvestmentAmount,
    userCount,
    handleSort,
    toggleEditMode,
    handleCheckboxChange,
    handleSaveNotes,
    handleNotesChange,
    handleNameChange,
    handleSaveName
  } = useInvestorData();

  // Calculate total amount (committed + interested)
  const totalAmount = totalCommittedAmount + totalInterestedAmount;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient-metallic">Fundraising Admin Dashboard</h1>
          <p className="text-white/60">Review all investment interest metrics and data.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-white/60 text-sm hidden md:inline-block">
            {user?.email}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="flex items-center gap-2 border-white/20 text-white hover:bg-white/10"
          >
            <LogOut size={16} />
            <span className="hidden md:inline">Sign out</span>
          </Button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4 text-white/60">Loading investment data...</p>
        </div>
      ) : (
        <>
          {/* Key metrics overview - updated to show just Total Investors and Total Users */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <MetricCard
              title="Total Investors"
              value={totalInvestorCount}
              description="Number of interested investors"
              delay={100}
            />
            
            <MetricCard
              title="Total Users"
              value={userCount}
              description="Number of committed investors"
              delay={200}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total Amount Box */}
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl p-6">
              <CardHeader>
                <CardTitle className="text-center text-gradient font-sfpro">Total Amount</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-gradient-metallic mb-2">
                  ${totalAmount.toLocaleString()}
                </div>
                <p className="text-white/70">Combined committed and interested capital</p>
                <div className="w-full mt-4 bg-white/10 h-2 rounded-full">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${Math.min((totalAmount / targetAmount) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-white/60 text-sm">
                  {((totalAmount / targetAmount) * 100).toFixed(1)}% of ${targetAmount.toLocaleString()} target
                </div>
              </CardContent>
            </Card>
            
            <InvestmentMetricsCard
              averageInvestmentAmount={averageInvestmentAmount}
              targetAmount={targetAmount}
              committedAmount={totalCommittedAmount}
              totalInterestedAmount={totalInterestedAmount}
              userCount={userCount}
            />
          </div>
          
          {/* Detailed investor table */}
          <InvestorTable 
            sortedInvestors={sortedInvestors}
            sortField={sortField}
            sortOrder={sortOrder}
            handleSort={handleSort}
            toggleEditMode={toggleEditMode}
            handleCheckboxChange={handleCheckboxChange}
            handleSaveNotes={handleSaveNotes}
            handleNotesChange={handleNotesChange}
            handleNameChange={handleNameChange}
            handleSaveName={handleSaveName}
          />
        </>
      )}
    </div>
  );
};

export default Admin;
