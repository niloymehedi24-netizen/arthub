"use client";

import DashboardStats from "../DashboardStats";

import { Persons, Palette, ShoppingBag, CircleDollar } from "@gravity-ui/icons";

export default function AnalyticsCards({ analytics }) {
  const stats = [
    {
      title: "Users",
      value: analytics.totalUsers,
      description: "Registered users",
      icon: Persons,
      color: "from-blue-500 to-cyan-500",
    },

    {
      title: "Artists",
      value: analytics.totalArtists,
      description: "Active artists",
      icon: Palette,
      color: "from-fuchsia-500 to-pink-500",
    },

    {
      title: "Sold",
      value: analytics.totalSold,
      description: "Artworks sold",
      icon: ShoppingBag,
      color: "from-violet-500 to-indigo-500",
    },

    {
      title: "Revenue",
      value: `$${analytics.totalRevenue}`,
      description: "Platform revenue",
      icon: CircleDollar,
      color: "from-emerald-500 to-green-500",
    },
  ];

  return <DashboardStats stats={stats} />;
}
