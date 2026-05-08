"use client";

import { useState, useEffect, Suspense } from "react";
import { DashboardStats } from "@/components/dashboard-stats";
import { UserTaskSummaryTable } from "@/components/user-task-summary";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserTaskSummary {
  userId: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
}

function DashboardContent() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch todos and users in parallel
        const [todosResponse, usersResponse] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/todos"),
          fetch("https://jsonplaceholder.typicode.com/users"),
        ]);

        if (!todosResponse.ok || !usersResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const todosData = await todosResponse.json();
        const usersData = await usersResponse.json();

        setTodos(todosData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate statistics
  const totalUsers = users.length;
  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Calculate user task summaries
  const userTaskSummaries: UserTaskSummary[] = users
    .map((user) => {
      const userTodos = todos.filter((todo) => todo.userId === user.id);
      const completed = userTodos.filter((todo) => todo.completed).length;
      const pending = userTodos.length - completed;
      const completionRate =
        userTodos.length > 0 ? (completed / userTodos.length) * 100 : 0;

      return {
        userId: user.id,
        totalTasks: userTodos.length,
        completedTasks: completed,
        pendingTasks: pending,
        completionRate,
      };
    })
    .sort((a, b) => b.completionRate - a.completionRate); // Sort by completion rate

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          ภาพรวมข้อมูลผู้ใช้และ tasks ในระบบ
        </p>
      </div>

      {/* Statistics Cards */}
      <Suspense
        fallback={
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
        }
      >
        <DashboardStats
          totalUsers={totalUsers}
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          pendingTasks={pendingTasks}
          loading={loading}
        />
      </Suspense>

      {/* User Task Summary Table */}
      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
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
        }
      >
        <UserTaskSummaryTable data={userTaskSummaries} loading={loading} />
      </Suspense>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto p-6 space-y-6">
          <div>
            <Skeleton className="h-9 w-32 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>
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
          <div>
            
          </div>
          <Card className="border">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
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
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
