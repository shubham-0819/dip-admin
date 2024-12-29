import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, X } from 'lucide-react'
import { fetchLogs } from '@/services/logService'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const Logs: React.FC = () => {
  const [lineLimit, setLineLimit] = useState<number>(100);
  const [searchText, setSearchText] = useState<string>('');
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const getLogs = async () => {
    const data = await fetchLogs(lineLimit);
    if (data?.logs) {
      setLogs(data.logs.filter((log: string) => log.length > 0));
    }
  };

  useEffect(() => {
    // Initial fetch
    getLogs();
  }, [lineLimit]); // Re-run effect when lineLimit changes

  const parseLogEntry = (log: string) => {
    const parts = log.split(' - ');
    if (parts.length < 7) return null;

    const [remoteAddr, method, timestamp, url, status, contentLength, responseTime] = parts;
    
    // Convert GMT to IST (add 5 hours and 30 minutes)
    const date = new Date(timestamp);
    const formattedTime = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).format(date);

    const statusCode = parseInt(status);
    const time = parseFloat(responseTime);
    
    let level: 'success' | 'warning' | 'error';
    if (statusCode >= 500) level = 'error';
    else if (statusCode >= 400) level = 'warning';
    else level = 'success';

    let responseLevel: 'normal' | 'slow' | 'very-slow';
    if (time < 200) responseLevel = 'normal';
    else if (time < 1000) responseLevel = 'slow';
    else responseLevel = 'very-slow';

    return {
      remoteAddr,
      method,
      timestamp: formattedTime,
      url,
      status: statusCode,
      contentLength,
      responseTime: time,
      level,
      responseLevel,
      rawLog: log
    };
  };

  const getBadgeVariant = (level: string) => {
    switch (level) {
      case 'success': return 'success';
      case 'error': return 'destructive';
      case 'warning': return 'warning';
      default: return 'secondary';
    }
  };

  const filteredLogs = logs
    .map(parseLogEntry)
    .filter((log): log is NonNullable<typeof log> => {
      if (!log) return false;
      const searchLower = searchText.toLowerCase();
      return searchText === '' || 
        log.method.toLowerCase().includes(searchLower) ||
        log.url.toLowerCase().includes(searchLower) ||
        log.status.toString().includes(searchLower) ||
        log.level.toLowerCase().includes(searchLower) ||
        log.remoteAddr.toLowerCase().includes(searchLower);
    })
    .reverse();

  return (
    <div className="space-y-6 h-full flex flex-col overflow-hidden">
      <div className="flex-none">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
            <p className="text-muted-foreground">View and search system logs.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by method, URL, status..."
                className="pl-10 w-full bg-background"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && (
                <button
                  onClick={() => setSearchText('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <Select
              defaultValue="100"
              onValueChange={(value) => setLineLimit(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select line limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="50">Last 50 lines</SelectItem>
                <SelectItem value="100">Last 100 lines</SelectItem>
                <SelectItem value="500">Last 500 lines</SelectItem>
                <SelectItem value="1000">Last 1000 lines</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Timestamp</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Request</TableHead>
            <TableHead>Response Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log, index) => (
            <TableRow 
              key={index} 
              className="font-mono text-xs hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
              onClick={() => setSelectedLog(log)}
            >
              <TableCell>{log.timestamp}</TableCell>
              <TableCell>
                <Badge variant={getBadgeVariant(log.level)}>
                  {log.level.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>{`${log.method} ${log.url} (${log.status})`}</TableCell>
              <TableCell>
                <span className={`font-medium ${
                  log.responseLevel === 'normal' ? 'text-green-600' :
                  log.responseLevel === 'slow' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {log.responseTime}ms
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="font-semibold">Remote Address:</div>
                <div className="break-words">{selectedLog.remoteAddr}</div>
                
                <div className="font-semibold">Method:</div>
                <div>{selectedLog.method}</div>
                
                <div className="font-semibold">Timestamp:</div>
                <div>{selectedLog.timestamp}</div>
                
                <div className="font-semibold">URL:</div>
                <div className="break-all">{selectedLog.url}</div>
                
                <div className="font-semibold">Status:</div>
                <div>
                  <Badge variant={getBadgeVariant(selectedLog.level)}>
                    {selectedLog.status}
                  </Badge>
                </div>
                
                <div className="font-semibold">Content Length:</div>
                <div>{selectedLog.contentLength} bytes</div>
                
                <div className="font-semibold">Response Time:</div>
                <div>{selectedLog.responseTime}ms</div>
              </div>
              
              <div className="mt-4">
                <div className="font-semibold mb-2">Raw Log:</div>
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap">
                  {selectedLog.rawLog}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Logs;