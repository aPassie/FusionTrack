import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, CheckCircle2, Clock, AlertCircle, FolderKanban } from "lucide-react";

const Dashboard = () => {
  // Mock data
  const stats = {
    totalTasks: 48,
    overdueTasks: 5,
    completedTasks: 23,
    activeProjects: 7,
  };

  const recentProjects = [
    {
      id: "1",
      emoji: "🚀",
      name: "Product Launch",
      description: "Launch new product features for Q1",
      createdBy: "John Doe",
      createdAt: "2025-01-15",
    },
    {
      id: "2",
      emoji: "📱",
      name: "Mobile App Redesign",
      description: "Redesign mobile app UI/UX",
      createdBy: "Jane Smith",
      createdAt: "2025-01-10",
    },
    {
      id: "3",
      emoji: "🔧",
      name: "Backend Optimization",
      description: "Improve API performance and scalability",
      createdBy: "Mike Johnson",
      createdAt: "2025-01-05",
    },
  ];

  const recentTasks = [
    {
      id: "TSK-001",
      title: "Design landing page mockups",
      status: "IN_PROGRESS",
      priority: "HIGH",
      project: "Product Launch",
      assignedTo: "Sarah Wilson",
      dueDate: "2025-01-20",
    },
    {
      id: "TSK-002",
      title: "Implement user authentication",
      status: "IN_REVIEW",
      priority: "HIGH",
      project: "Mobile App Redesign",
      assignedTo: "Tom Brown",
      dueDate: "2025-01-18",
    },
    {
      id: "TSK-003",
      title: "Write API documentation",
      status: "TODO",
      priority: "MEDIUM",
      project: "Backend Optimization",
      assignedTo: "Emily Davis",
      dueDate: "2025-01-25",
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspace Overview</h1>
          <p className="text-muted-foreground mt-1">
            Track your team's progress and productivity
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          New Project
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all projects
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats.overdueTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{stats.completedTasks}</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-accent-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeProjects}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Recent Projects</TabsTrigger>
          <TabsTrigger value="tasks">Recent Tasks</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentProjects.map((project) => (
              <Card key={project.id} className="border-border hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-3xl mb-2">{project.emoji}</div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <span className="sr-only">Edit</span>
                        ✏️
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <span className="sr-only">Delete</span>
                        🗑️
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {project.createdBy}</span>
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Tasks</CardTitle>
              <CardDescription>Latest tasks across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {task.id}
                        </span>
                        <h4 className="font-medium">{task.title}</h4>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{task.project}</span>
                        <span>•</span>
                        <span>{task.assignedTo}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          task.priority === "HIGH"
                            ? "bg-destructive/10 text-destructive"
                            : task.priority === "MEDIUM"
                            ? "bg-accent/10 text-accent-foreground"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        {task.priority}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>People working in this workspace</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Team members list will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
