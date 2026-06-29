"use client";

import { useEffect, useState } from "react";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import TransactionsTable from "@/components/dashboard/admin/TransactionsTable";

import { getTransactions } from "@/lib/api/admin/data";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadTransactions();
  }, []);

  return (
    <section className="space-y-8 p-8">
      <DashboardHeading
        title="Transactions"
        subtitle="All purchases and subscriptions."
      />

      <TransactionsTable transactions={transactions} />
    </section>
  );
}
