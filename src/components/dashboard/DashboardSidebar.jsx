"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

import {
  ArrowRightFromSquare,
  Brush,
  ChartColumn,
  House,
  LayoutHeaderCellsLarge,
  Palette,
  Person,
  ShoppingBag,
} from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const user = session?.user;
  const role = user?.role || "user";

  const handleLogout = async () => {
    try {
      await authClient.signOut();

      toast.success("Logged out successfully");

      router.replace("/login");
      router.refresh();
    } catch {
      toast.error("Logout failed");
    }
  };

  const menus = {
    user: [
      {
        label: "Overview",
        href: "/dashboard/user",
        icon: LayoutHeaderCellsLarge,
      },
      {
        label: "Purchase History",
        href: "/dashboard/user/purchase-history",
        icon: ShoppingBag,
      },
      {
        label: "Bought Artworks",
        href: "/dashboard/user/bought-artworks",
        icon: Palette,
      },
      {
        label: "Subscription",
        href: "/dashboard/user/subscription",
        icon: ChartColumn,
      },
      {
        label: "Profile",
        href: "/dashboard/user/profile",
        icon: Person,
      },
    ],

    artist: [
      {
        label: "Overview",
        href: "/dashboard/artist",
        icon: LayoutHeaderCellsLarge,
      },
      {
        label: "Manage Artworks",
        href: "/dashboard/artist/artworks",
        icon: Brush,
      },
      {
        label: "Sales History",
        href: "/dashboard/artist/sales",
        icon: ShoppingBag,
      },
      {
        label: "Profile",
        href: "/dashboard/artist/profile",
        icon: Person,
      },
    ],

    admin: [
      {
        label: "Overview",
        href: "/dashboard/admin",
        icon: LayoutHeaderCellsLarge,
      },
      {
        label: "Manage Users",
        href: "/dashboard/admin/users",
        icon: Person,
      },
      {
        label: "Manage Artworks",
        href: "/dashboard/admin/artworks",
        icon: Brush,
      },
      {
        label: "Sales",
        href: "/dashboard/admin/sales",
        icon: ChartColumn,
      },
    ],
  };

  const menuItems = menus[role] || [];

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-default-200 bg-background">
      {/* User */}
      <div className="border-b border-default-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <Image
            src={user?.image || "https://ui-avatars.com/api/?name=User"}
            alt={user?.name || "User"}
            width={52}
            height={52}
            className="rounded-full ring-2 ring-fuchsia-400/40"
          />

          <div>
            <h3 className="font-bold">{user?.name}</h3>

            <p className="text-xs font-semibold uppercase text-fuchsia-500">
              {role}
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? "bg-fuchsia-500 text-white"
                  : "text-default-600 hover:bg-default-100 hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />

              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-default-200 p-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-default-600 transition hover:bg-default-100 hover:text-foreground"
        >
          <House className="h-5 w-5" />
          Back to Home
        </Link>

        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-semibold text-sm text-red-500 transition hover:bg-red-500/10"
        >
          <ArrowRightFromSquare className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
