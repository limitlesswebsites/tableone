
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CombinedInvestorData, SortField, SortOrder } from '@/types/admin';
import { Edit, Save, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

import { cn, formatDate } from '@/lib/utils';

interface InvestorTableProps {
  sortedInvestors: CombinedInvestorData[];
  sortField: SortField;
  sortOrder: SortOrder;
  handleSort: (field: SortField) => void;
  toggleEditMode: (email: string, field: 'notes' | 'name') => void;
  handleCheckboxChange: (email: string, field: 'reached_out' | 'committed') => void;
  handleSaveNotes: (email: string, notes: string) => Promise<void>;
  handleNotesChange: (email: string, notes: string) => void;
  handleNameChange: (email: string, name: string) => void;
  handleSaveName: (email: string, name: string) => Promise<void>;
  handleValidToggle: (email: string, valid: boolean) => void;
  handleDeleteInvestor: (email: string) => void;
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
  handleValidToggle,
  handleDeleteInvestor
}) => {
  // Render sort icon
  const renderSortIcon = (field: SortField) => {
    if (field === sortField) {
      return sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
    }
    return null;
  };

  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl shadow-xl overflow-hidden mb-8">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 bg-white/5">
              <TableHead 
                className="text-white font-medium cursor-pointer"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center gap-1">
                  Email {renderSortIcon('email')}
                </div>
              </TableHead>
              <TableHead className="text-white font-medium">Name</TableHead>
              <TableHead 
                className="text-white font-medium cursor-pointer"
                onClick={() => handleSort('investment_amount')}
              >
                <div className="flex items-center gap-1">
                  Amount {renderSortIcon('investment_amount')}
                </div>
              </TableHead>
              <TableHead 
                className="text-white font-medium cursor-pointer"
                onClick={() => handleSort('created_at')}
              >
                <div className="flex items-center gap-1">
                  Date {renderSortIcon('created_at')}
                </div>
              </TableHead>
              <TableHead className="text-white font-medium">IP Address</TableHead>
              <TableHead className="text-white font-medium">Valid</TableHead>
              <TableHead className="text-white font-medium">Reached Out</TableHead>
              <TableHead className="text-white font-medium">Committed</TableHead>
              <TableHead className="text-white font-medium">Notes</TableHead>
              <TableHead className="text-white font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvestors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center text-white/60 py-10">
                  No investors found
                </TableCell>
              </TableRow>
            ) : (
              sortedInvestors.map(investor => (
                <TableRow key={investor.id} className="border-white/10 hover:bg-white/5">
                  <TableCell className="text-white/90">{investor.email}</TableCell>
                  <TableCell>
                    {investor.isEditingName ? (
                      <div className="flex items-center gap-2">
                        <Input 
                          value={investor.editedName || ''} 
                          onChange={(e) => handleNameChange(investor.email, e.target.value)}
                          className="h-8 text-sm bg-white/5 border-white/20 text-white"
                        />
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-950/30"
                          onClick={() => handleSaveName(investor.email)}
                        >
                          <Save size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-white/90">
                          {investor.status?.name || '—'}
                        </span>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="h-6 w-6 p-0 text-white/50 hover:text-white hover:bg-white/10"
                          onClick={() => toggleEditMode(investor.email, 'name')}
                        >
                          <Edit size={14} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-white/90">${investor.investment_amount.toLocaleString()}</TableCell>
                  <TableCell className="text-white/70 whitespace-nowrap">
                    {formatDate(investor.created_at)}
                  </TableCell>
                  <TableCell className="text-white/70">
                    {investor.ip_address || '—'}
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={investor.valid}
                      onCheckedChange={() => handleValidToggle(investor.email, !investor.valid)}
                      className="bg-white/5 text-indigo-500 border-white/30 data-[state=checked]:bg-indigo-500"
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={investor.status?.reached_out || false}
                      onCheckedChange={() => handleCheckboxChange(investor.email, 'reached_out')}
                      className="bg-white/5 text-indigo-500 border-white/30 data-[state=checked]:bg-indigo-500"
                    />
                  </TableCell>
                  <TableCell>
                    <Checkbox
                      checked={investor.status?.committed || false}
                      onCheckedChange={() => handleCheckboxChange(investor.email, 'committed')}
                      className="bg-white/5 text-indigo-500 border-white/30 data-[state=checked]:bg-indigo-500"
                    />
                  </TableCell>
                  <TableCell className="max-w-[200px]">
                    {investor.isEditingNotes ? (
                      <div className="flex items-start gap-2">
                        <Textarea 
                          value={investor.editedNotes || ''} 
                          onChange={(e) => handleNotesChange(investor.email, e.target.value)} 
                          className="h-20 text-sm bg-white/5 border-white/20 text-white"
                        />
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="h-8 w-8 p-0 text-green-400 hover:text-green-300 hover:bg-green-950/30"
                          onClick={() => handleSaveNotes(investor.email)}
                        >
                          <Save size={16} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <div className="text-white/80 text-sm line-clamp-2">
                          {investor.status?.notes || '—'}
                        </div>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="h-6 w-6 p-0 text-white/50 hover:text-white hover:bg-white/10"
                          onClick={() => toggleEditMode(investor.email, 'notes')}
                        >
                          <Edit size={14} />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          size="icon" 
                          variant="ghost"
                          className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-950/30"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="backdrop-blur-xl bg-black/90 border border-white/10 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this investor?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove {investor.email} from the database.
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-white/10 text-white">Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            className="bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleDeleteInvestor(investor.email)}
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvestorTable;
