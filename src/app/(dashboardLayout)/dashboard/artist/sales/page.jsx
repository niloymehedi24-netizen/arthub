"use client";

import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";
import { getArtistSales } from "@/lib/api/artist/data";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import SalesTable from "@/components/dashboard/artist/SalesTable";

export default function ArtistSalesPage() {
  const { data: session } = useSession();

  const [sales, setSales] = useState([]);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadSales() {
      const data = await getArtistSales(session.user.email);
      setSales(data);
    }

    loadSales();
  }, [session]);

  return (
    <section className="space-y-8 p-8">
      <DashboardHeading
        title="Sales History"
        subtitle="Track every artwork you've sold."
      />

      <SalesTable sales={sales} />
    </section>
  );
}
