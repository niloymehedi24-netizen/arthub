"use client";

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SalesChart({ data }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">Monthly Sales</h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <Tooltip />

          <Area type="monotone" dataKey="sales" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
