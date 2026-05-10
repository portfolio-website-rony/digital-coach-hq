import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAdmin } from "@/lib/admin/use-admin";
import { AdminShell } from "@/components/admin/AdminShell";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { loading, session, isAdmin } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      navigate({ to: "/admin/login" });
      return;
    }
    if (!isAdmin) {
      navigate({ to: "/admin/login" });
    }
  }, [loading, session, isAdmin, navigate]);

  if (loading || !session || !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary-glow" />
      </div>
    );
  }

  return (
    <AdminShell>
      <Outlet />
    </AdminShell>
  );
}
