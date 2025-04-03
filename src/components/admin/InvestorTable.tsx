
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp, Edit, Save } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SortField, SortOrder, CombinedInvestorData } from '@/types/admin';

interface InvestorTableProps {
  sortedInvestors: CombinedInvestorData[];
  sortField: SortField;
  sortOrder: SortOrder;
  handleSort: (field: SortField) => void;
  toggleEditMode: (email: string, field?: 'notes' | 'name') => void;
  handleCheckboxChange: (email: string, field: 'reached_out' | 'committed') => Promise<void>;
  handleSaveNotes: (email: string, notes: string) => Promise<void>;
  handleNotesChange: (email: string, notes: string) => void;
  handleNameChange: (email: string, name: string) => void;
  handleSaveName: (email: string, name: string) => Promise<void>;
}

const InvestorTable: React.FC<InvestorTableProps> = ({
  sortedInvestors,
  sortField,
  sortOrder,
  handleSort,
  toggleEditMode,
  handleCheckboxChange,
  handleSaveNotes,
  handleNotesChange,
  handleNameChange,
  handleSaveName,
}) => {
  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? <ChevronUp className="inline h-4 w-4 ml-1" /> : <ChevronDown className="inline h-4 w-4 ml-1" />;
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-white/10">
        <h2 className="text-xl font-semibold">Investor Details</h2>
        <div className="text-white/70 text-sm">
          {sortedInvestors.length} {sortedInvestors.length === 1 ? 'investor' : 'investors'} • Real-time updates enabled
        </div>
      </div>
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
              <TableHead className="text-white/70">
                Name
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
              <TableRow 
                key={investor.id}
                className={`border-white/10 ${index === 0 && investor.created_at && 
                  (Date.now() - new Date(investor.created_at).getTime() < 60000) ? 
                  'animate-highlight' : ''}`}
              >
                <TableCell className="font-medium">{investor.email}</TableCell>
                <TableCell>
                  {investor.isEditingName ? (
                    <div className="flex gap-2 items-center">
                      <Input 
                        value={investor.editedName || ''} 
                        onChange={(e) => handleNameChange(investor.email, e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="Enter investor name"
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleSaveName(investor.email, investor.editedName || '')}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span>{investor.status?.name || '—'}</span>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => toggleEditMode(investor.email, 'name')}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TableCell>
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
                  {investor.isEditingNotes ? (
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
                        onClick={() => toggleEditMode(investor.email, 'notes')}
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
        
        {sortedInvestors.length === 0 && (
          <div className="text-center py-10 text-white/60">
            No investor data available
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorTable;
