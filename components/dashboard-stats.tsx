"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CheckCircle, Clock, ListTodo } from "lucide-react";

interface DashboardStatsProps {
  totalUsers: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  loading?: boolean;
}

export function DashboardStats({ 
  totalUsers, 
  totalTasks, 
  completedTasks, 
  pendingTasks, 
  loading = false 
}: DashboardStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = [
    {
      title: "ผู้ใช้ทั้งหมด",
      value: totalUsers.toLocaleString(),
      description: "จำนวนผู้ใช้ในระบบ",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Tasks ทั้งหมด",
      value: totalTasks.toLocaleString(),
      description: "จำนวน tasks ทั้งหมด",
      icon: ListTodo,
      color: "text-purple-600",
    },
    {
      title: "Tasks ที่เสร็จแล้ว",
      value: completedTasks.toLocaleString(),
      description: `${((completedTasks / totalTasks) * 100).toFixed(1)}% ของทั้งหมด`,
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Tasks ที่รอดำเนินการ",
      value: pendingTasks.toLocaleString(),
      description: `${((pendingTasks / totalTasks) * 100).toFixed(1)}% ของทั้งหมด`,
      icon: Clock,
      color: "text-yellow-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <IconComponent className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
