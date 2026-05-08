import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 relative">
 
            <h1 className="text-4xl font-bold text-foreground">Welcome</h1>
            <Link href="/dashboard">
                <Button size="lg">Go to Dashboard</Button>
            </Link>
            <Link href="/tasks">
                <Button variant="outline">Go to Tasks</Button>
            </Link>
            <Link href="/users">
                <Button variant="secondary">Go to Users</Button>
            </Link>
        </div>
    );
}