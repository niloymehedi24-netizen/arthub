"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function CategoryChart({ data }) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow">
      <h2 className="mb-5 text-xl font-bold">Artworks by Category</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="category"
            outerRadius={120}
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
