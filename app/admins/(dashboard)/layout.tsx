import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-zinc-950">
      <AdminSidebar />
      <div className="flex-1 bg-gray-50 min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  );
}
