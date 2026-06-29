"use client";

import RecentBuyers from "@/components/dashboard/artist/RecentBuyers";
import SalesStats from "@/components/dashboard/artist/SalesStats";
import SalesTable from "@/components/dashboard/artist/SalesTable";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { getSales, getSalesStats } from "@/lib/api/sales/data";
import { useSession } from "@/lib/auth-client";

import { useEffect, useState } from "react";

export default function ArtistPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSales: 0,
    uniqueBuyers: 0,
  });

  const [sales, setSales] = useState([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.email) return;

    const load = async () => {
      const statsData = await getSalesStats(session.user.email);
      const salesData = await getSales(session.user.email);

      setStats(statsData);
      setSales(salesData);
    };

    load();
  }, [session]);

  return (
    <div className="space-y-8 p-4">
      <DashboardHeading
        title="Manage Your Art Gallery"
        subtitle="Create, edit, organize, and monitor your artworks while tracking sales and growing your audience on ArtHub."
      />

      <section className="space-y-10">
        <SalesStats stats={stats} />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SalesTable sales={sales} />
          </div>

          <RecentBuyers sales={sales} />
        </div>
      </section>
    </div>
  );
}
