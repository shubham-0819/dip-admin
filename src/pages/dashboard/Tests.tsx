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
import { testService, Test } from '@/services/testService';

export default function Tests() {
  const [tests, setTests] = useState<Test[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      const response = await testService.getAll();
      setTests(response.data || []);
    } catch (error) {
      toast({
        title: "Error loading tests",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const filteredTests = tests.filter(test => 
    test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tests</h2>
          <p className="text-muted-foreground">Manage medical tests and procedures</p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-[250px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Test
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Icon</TableHead>
              <TableHead>Test Name</TableHead>
              <TableHead>Display Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTests.map((test) => (
              <TableRow key={test._id}>
                <TableCell>
                  {test.icons[0] && (
                    <img
                      src={test.icons[0]}
                      alt={test.testName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{test.testName}</TableCell>
                <TableCell>{test.displayName}</TableCell>
                <TableCell className="max-w-xs truncate">{test.description}</TableCell>
                <TableCell>${test.price}</TableCell>
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