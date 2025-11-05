import { Outlet } from "react-router-dom";

export default function BaseLayout() {
  return (
    <div className="min-h-screen w-full bg-background">
      <Outlet />
    </div>
  );
}
