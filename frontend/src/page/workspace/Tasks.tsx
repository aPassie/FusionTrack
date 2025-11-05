import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Circle,
  Timer,
  Eye,
  CheckCircle2,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreateTaskDialog } from "@/components/dialogs/CreateTaskDialog";
import { EditTaskDialog } from "@/components/dialogs/EditTaskDialog";
import { DeleteDialog } from "@/components/dialogs/DeleteDialog";

type TaskStatus = "BACKLOG" | "TODO" | "IN_PROGRESS" | "IN_REVIEW" | "DONE";
type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

const mockTasks = [
  {
    id: "TSK-001",
    title: "Design landing page mockups",
    status: "IN_PROGRESS" as TaskStatus,
    priority: "HIGH" as TaskPriority,
    project: "Product Launch",
    assignedTo: "Sarah Wilson",
    dueDate: "2025-01-20",
  },
  {
    id: "TSK-002",
    title: "Implement user authentication",
    status: "IN_REVIEW" as TaskStatus,
    priority: "HIGH" as TaskPriority,
    project: "Mobile App Redesign",
    assignedTo: "Tom Brown",
    dueDate: "2025-01-18",
  },
  {
    id: "TSK-003",
    title: "Write API documentation",
    status: "TODO" as TaskStatus,
    priority: "MEDIUM" as TaskPriority,
    project: "Backend Optimization",
    assignedTo: "Emily Davis",
    dueDate: "2025-01-25",
  },
  {
    id: "TSK-004",
    title: "Set up CI/CD pipeline",
    status: "DONE" as TaskStatus,
    priority: "HIGH" as TaskPriority,
    project: "Backend Optimization",
    assignedTo: "Mike Johnson",
    dueDate: "2025-01-15",
  },
  {
    id: "TSK-005",
    title: "User research interviews",
    status: "BACKLOG" as TaskStatus,
    priority: "LOW" as TaskPriority,
    project: "Product Launch",
    assignedTo: "Jane Smith",
    dueDate: "2025-02-01",
  },
];

const statusIcons = {
  BACKLOG: Circle,
  TODO: Circle,
  IN_PROGRESS: Timer,
  IN_REVIEW: Eye,
  DONE: CheckCircle2,
};

const priorityIcons = {
  LOW: ArrowDown,
  MEDIUM: ArrowRight,
  HIGH: ArrowUp,
};

const statusColors = {
  BACKLOG: "bg-muted text-muted-foreground",
  TODO: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  IN_PROGRESS: "bg-accent/20 text-accent-foreground",
  IN_REVIEW: "bg-secondary/20 text-secondary",
  DONE: "bg-secondary/20 text-secondary",
};

const priorityColors = {
  LOW: "text-secondary",
  MEDIUM: "text-accent-foreground",
  HIGH: "text-destructive",
};

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [editTaskOpen, setEditTaskOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<typeof mockTasks[0] | null>(null);

  const handleEdit = (task: typeof mockTasks[0]) => {
    setSelectedTask(task);
    setEditTaskOpen(true);
  };

  const handleDelete = (task: typeof mockTasks[0]) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Deleting task:", selectedTask?.id);
    setDeleteDialogOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all tasks across projects
          </p>
        </div>
        <Button size="lg" className="gap-2" onClick={() => setCreateTaskOpen(true)}>
          <Plus className="w-4 h-4" />
          Create Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="BACKLOG">Backlog</SelectItem>
            <SelectItem value="TODO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="IN_REVIEW">In Review</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks Table */}
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTasks.map((task) => {
              const StatusIcon = statusIcons[task.status];
              const PriorityIcon = priorityIcons[task.priority];

              return (
                <TableRow key={task.id}>
                  <TableCell className="font-mono text-sm text-muted-foreground">
                    {task.id}
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`gap-1 ${statusColors[task.status]}`}
                    >
                      <StatusIcon className="w-3 h-3" />
                      {task.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`flex items-center gap-1 ${priorityColors[task.priority]}`}>
                      <PriorityIcon className="w-4 h-4" />
                      <span className="text-sm font-medium">{task.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{task.project}</TableCell>
                  <TableCell className="text-sm">{task.assignedTo}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(task)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(task)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium">1-5</span> of{" "}
          <span className="font-medium">5</span> tasks
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <CreateTaskDialog open={createTaskOpen} onOpenChange={setCreateTaskOpen} />
      <EditTaskDialog 
        open={editTaskOpen} 
        onOpenChange={setEditTaskOpen}
        task={selectedTask ? {
          id: selectedTask.id,
          title: selectedTask.title,
          description: "",
          project: selectedTask.project,
          priority: selectedTask.priority,
          status: selectedTask.status,
          assignedTo: selectedTask.assignedTo,
          dueDate: selectedTask.dueDate,
        } : undefined}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="Delete Task"
        description={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
