import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Plus, FolderPlus } from "lucide-react";
import { CreateWorkspaceDialog } from "./dialogs/CreateWorkspaceDialog";
import { CreateProjectDialog } from "./dialogs/CreateProjectDialog";

export function TopBar() {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>My Workspace</span>
          <span>/</span>
          <span className="text-foreground font-medium">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => setWorkspaceOpen(true)}
        >
          <FolderPlus className="w-4 h-4" />
          <span className="hidden sm:inline">New Workspace</span>
        </Button>
        <Button 
          size="sm" 
          className="gap-2"
          onClick={() => setProjectOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Project</span>
        </Button>
      </div>

      <CreateWorkspaceDialog open={workspaceOpen} onOpenChange={setWorkspaceOpen} />
      <CreateProjectDialog open={projectOpen} onOpenChange={setProjectOpen} />
    </header>
  );
}
