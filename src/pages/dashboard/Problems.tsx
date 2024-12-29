import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { problemService, Problem } from '@/services/problemService';

export default function Problems() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadProblems();
  }, []);

  const loadProblems = async () => {
    try {
      const response = await problemService.getAll();
      setProblems(response.data || []);
    } catch (error) {
      toast({
        title: "Error loading problems",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredProblems = problems.filter(problem => 
    problem.problemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    problem.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Problems</h2>
          <p className="text-muted-foreground">Manage medical problems and conditions</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Problem
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Problem Name</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProblems.map((problem) => (
              <TableRow key={problem._id}>
                <TableCell>
                  {problem.icons[0] && (
                    <img
                      src={problem.icons[0]}
                      alt={problem.problemName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{problem.problemName}</TableCell>
                <TableCell>{problem.displayName}</TableCell>
                <TableCell>${problem.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500">
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}