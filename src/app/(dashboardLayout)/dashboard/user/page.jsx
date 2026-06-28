"use client";

import DashboardStats from "@/components/dashboard/DashboardStats";
import { useSession } from "@/lib/auth-client";
import { ShoppingBag, ChartColumn, Star } from "@gravity-ui/icons";

export default function DashboardUserPage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-default-500">Loading dashboard...</p>
      </div>
    );
  }

  const user = session?.user;

  // Temporary static data
  // Replace these values with API data later
  const stats = [
    {
      title: "Purchased Artworks",
      value: 12,
      description: "Total purchased artworks",
      icon: ShoppingBag,
      color: "from-fuchsia-500 to-cyan-400",
    },
    {
      title: "Current Plan",
      value: "Pro",
      description: "9 purchases remaining",
      icon: Star,
      color: "from-violet-500 to-indigo-500",
    },
    {
      title: "Total Spent",
      value: "$540",
      description: "Lifetime purchases",
      icon: ChartColumn,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="space-y-8 p-10">
      {/* Welcome Section */}
      <div>
        <h1 className="text-4xl font-black text-foreground">
          Welcome back, {user?.name}! 👋
        </h1>

        <p className="mt-2 text-default-500">
          Here is an overview of your ArtHub account.
        </p>
      </div>

      {/* Stats */}
      <DashboardStats stats={stats} />
    </section>
  );
}
