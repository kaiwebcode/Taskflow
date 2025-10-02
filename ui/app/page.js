"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Database, LayoutDashboard, Lock, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useNavigate } from "react-router-dom";
import { Toaster } from "sonner";

export default function HomePage() {
  const router = useRouter();
  // const navigate = useNavigate();

  const features = [
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "JWT Authentication",
      description:
        "Secure login and signup with token-based authentication and password hashing",
    },
    {
      icon: <Database className="h-6 w-6 text-blue-600" />,
      title: "Database Integration",
      description:
        "Mongodb database with Row Level Security for data protection",
    },
    {
      icon: <LayoutDashboard className="h-6 w-6 text-blue-600" />,
      title: "Interactive Dashboard",
      description: "Full CRUD operations with search and filter functionality",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Scalable Architecture",
      description:
        "Server backend with automatic scaling and performance optimization",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Navbar */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-10 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">TaskFlow</h1>
            <Button
              onClick={() => router.push("/login")}
              size="sm"
              className="cursor-pointer bg-blue-600"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Modern Web Application
              <span className="block text-blue-600">
                with Authentication
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A scalable web application featuring JWT authentication, secure
              database integration, and a comprehensive dashboard for task
              management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                onClick={() => router.push("/login")}
                size="xl"
                className="text-lg px-8 cursor-pointer bg-blue-600"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={() => router.push("/login")}
                size="lg"
                variant="outline"
                className="text-lg px-8 cursor-pointer"
              >
                View Demo
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies and best practices for security and
            scalability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 hover:border-blue-400 transition-colors"
            >
              <CardHeader>
                <div className="mb-2">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Technical Stack</CardTitle>
            <CardDescription className="text-base">
              Modern, production-ready technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  Frontend
                </h3>
                <ul className="space-y-2 ml-7 text-muted-foreground">
                  <li>• React + Next.js</li>
                  <li>• TailwindCSS for styling</li>
                  <li>• Form validation (Zod)</li>
                  <li>• Protected routes</li>
                  <li>• Responsive design</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  Backend & Security
                </h3>
                <ul className="space-y-2 ml-7 text-muted-foreground">
                  <li>• JWT authentication</li>
                  <li>• Mongodb database</li>
                  <li>• Row Level Security (RLS)</li>
                  <li>• Password hashing</li>
                  <li>• Server functions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with React, Next.js, Shadcn</p>
          <p className="mt-2 text-sm">Secure • Scalable • Modern</p>
        </div>
      </footer>

      {/* ✅ Toaster (global notifications if needed later) */}
      <Toaster position="top-right" richColors />
    </div>
  );
}
