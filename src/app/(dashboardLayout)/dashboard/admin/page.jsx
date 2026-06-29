"use client";

import { useEffect, useState } from "react";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import AnalyticsCards from "@/components/dashboard/admin/AnalyticsCards";
import SalesChart from "@/components/dashboard/admin/SalesChart";
import CategoryChart from "@/components/dashboard/admin/CategoryChart";

import { getAnalytics } from "@/lib/api/admin/data";

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    async function loadAnalytics() {
      const data = await getAnalytics();
      setAnalytics(data);
    }

    loadAnalytics();
  }, []);

  if (!analytics) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <section className="space-y-8 p-8">
      <DashboardHeading
        title="Admin Dashboard"
        subtitle="Manage users, artworks, sales and platform analytics."
      />

      <AnalyticsCards analytics={analytics} />

      <div className="grid gap-8 lg:grid-cols-2">
        <SalesChart data={analytics.salesPerMonth} />

        <CategoryChart data={analytics.categoryData} />
      </div>
    </section>
  );
}
