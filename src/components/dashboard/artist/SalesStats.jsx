import DashboardStats from "../DashboardStats";

import { ShoppingBag, Persons, TagDollar } from "@gravity-ui/icons";

export default function SalesStats({ stats }) {
  const cards = [
    {
      title: "Revenue",
      value: `$${stats?.totalRevenue ?? 0}`,
      description: "Lifetime earnings",
      icon: TagDollar,
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Sales",
      value: stats?.totalSales ?? 0,
      description: "Completed purchases",
      icon: ShoppingBag,
      color: "from-fuchsia-500 to-cyan-500",
    },
    {
      title: "Buyers",
      value: stats?.uniqueBuyers ?? 0,
      description: "Unique customers",
      icon: Persons,
      color: "from-violet-500 to-indigo-500",
    },
  ];

  return <DashboardStats stats={cards} />;
}
