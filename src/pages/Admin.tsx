
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MetricCard from '@/components/metrics/MetricCard';
import { useInvestorData } from '@/hooks/admin/useInvestorData';
import InvestorTable from '@/components/admin/InvestorTable';
import InvestmentMetricsCard from '@/components/admin/InvestmentMetricsCard';

const Admin = () => {
  // Investment data states
  const committedAmount = 55500; // Fixed committed amount
  const targetAmount = 400000; // Target amount
  
  const {
    isLoading,
    sortField,
    sortOrder,
    sortedInvestors,
    totalInterestedAmount,
    totalInvestorCount,
    averageInvestmentAmount,
    handleSort,
    toggleEditMode,
    handleCheckboxChange,
    handleSaveNotes,
    handleNotesChange,
    handleNameChange,
    handleSaveName
  } = useInvestorData();

  // Calculate total amount (committed + interested)
  const totalAmount = committedAmount + totalInterestedAmount;

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
              committedAmount={committedAmount}
              totalInterestedAmount={totalInterestedAmount}
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
