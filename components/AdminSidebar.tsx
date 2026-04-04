"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Images, Video, LogOut, ChevronRight, MessageSquare, UserCircle } from "lucide-react";

const NAV = [
  { href: "/admins", label: "Dashboard", icon: LayoutGrid, exact: true },
  { href: "/admins/galleries", label: "Galleries", icon: Images, exact: false },
  { href: "/admins/videos", label: "Videos", icon: Video, exact: false },
  { href: "/admins/contacts", label: "Contacts", icon: MessageSquare, exact: false },
  { href: "/admins/profile", label: "Profile", icon: UserCircle, exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-zinc-900 border-r border-zinc-800">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-zinc-800">
        <span className="text-white text-xs tracking-[0.25em] uppercase font-medium">
          VTT Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4">
        {NAV.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href) && !(exact && pathname !== href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
              {active && <ChevronRight size={12} className="ml-auto opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-zinc-800">
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-white transition-colors w-full px-1 py-1"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </form>
      </div>
    </aside>
  );
}
