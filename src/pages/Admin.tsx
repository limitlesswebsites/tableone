
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MetricCard from '@/components/metrics/MetricCard';
import ChartPanel from '@/components/metrics/ChartPanel';
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
    monthlyData,
    totalInterestedAmount,
    totalInvestorCount,
    averageInvestmentAmount,
    handleSort,
    toggleEditMode,
    handleCheckboxChange,
    handleSaveNotes,
    handleNotesChange
  } = useInvestorData();

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
          />
        </>
      )}
    </div>
  );
};

export default Admin;
