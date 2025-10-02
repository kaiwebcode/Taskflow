"use client";

import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <header className="border-b bg-white/70 backdrop-blur-md sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        </div>
        <Button
          onClick={handleLogout}
          size="sm"
          className="bg-red-500 hover:bg-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
