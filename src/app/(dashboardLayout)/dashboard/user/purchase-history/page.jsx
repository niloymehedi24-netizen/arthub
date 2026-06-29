"use client";

import { useEffect, useState } from "react";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import PurchaseHistoryTable from "@/components/dashboard/user/PurchaseHistoryTable";

import { useSession } from "@/lib/auth-client";
import { getPurchaseHistory } from "@/lib/api/purchase/data";

import { Spinner } from "@heroui/react";

export default function PurchaseHistoryPage() {
  const { data: session } = useSession();

  const [purchases, setPurchases] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPurchases = async () => {
      if (!session?.user?.email) return;

      try {
        const data = await getPurchaseHistory(session.user.email);

        setPurchases(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadPurchases();
  }, [session]);

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <DashboardHeading
        title="Purchase History"
        subtitle="View every artwork you've purchased from ArtHub."
      />

      <PurchaseHistoryTable purchases={purchases} />
    </section>
  );
}
