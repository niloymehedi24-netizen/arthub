"use client";

import { useEffect, useState } from "react";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import UsersTable from "@/components/dashboard/admin/UsersTable";

import { getUsers } from "@/lib/api/admin/data";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  return (
    <section className="space-y-8 p-8">
      <DashboardHeading
        title="Manage Users"
        subtitle="Manage every registered user."
      />

      <UsersTable users={users} reloadUsers={loadUsers} />
    </section>
  );
}
