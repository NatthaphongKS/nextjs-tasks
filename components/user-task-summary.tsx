"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpDown } from "lucide-react";

interface UserTaskSummary {
  userId: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

interface UserTaskSummaryTableProps {
  data: UserTaskSummary[];
  loading?: boolean;
}

export function UserTaskSummaryTable({ data, loading = false }: UserTaskSummaryTableProps) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading) {
    return (
      <Card className="border">
        <CardHeader>
          <CardTitle>สรุป Tasks ต่อผู้ใช้</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedData = [...data].sort((a, b) => {
    return sortOrder === 'asc' ? a.userId - b.userId : b.userId - a.userId;
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <Card className="border">
      <CardHeader>
        <CardTitle>สรุป Tasks ต่อผู้ใช้</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={toggleSort}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>User ID</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Tasks ทั้งหมด</TableHead>
              <TableHead className="text-right">เสร็จแล้ว</TableHead>
              <TableHead className="text-right">รอดำเนินการ</TableHead>
              <TableHead className="text-right">อัตราการเสร็จ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((user) => (
              <TableRow key={user.userId}>
                <TableCell className="font-medium">User {user.userId}</TableCell>
                <TableCell className="text-right">{user.totalTasks}</TableCell>
                <TableCell className="text-right">
                  <span className="text-green-600 font-medium">
                    {user.completedTasks}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-yellow-600 font-medium">
                    {user.pendingTasks}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          user.completionRate >= 80
                            ? "bg-green-500"
                            : user.completionRate >= 50
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${user.completionRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium min-w-[3rem] text-right">
                      {user.completionRate.toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
