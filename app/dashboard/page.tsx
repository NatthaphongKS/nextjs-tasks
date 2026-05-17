"use client";

import { useState, useEffect } from "react";
import { DashboardStats } from "@/components/dashboard-stats";
import { UserTaskSummaryTable } from "@/components/user-task-summary";

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

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 3000));

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

      <DashboardStats
        totalUsers={totalUsers}
        totalTasks={totalTasks}
        completedTasks={completedTasks}
        pendingTasks={pendingTasks}
        loading={loading}
      />

      {/* User Task Summary Table */}

      <UserTaskSummaryTable data={userTaskSummaries} loading={loading} />
    </div>
  )
}
