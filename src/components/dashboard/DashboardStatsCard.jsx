"use client";

export default function DashboardStatsCard({
  title,
  value,
  icon: Icon,
  description,
  color = "from-fuchsia-500 to-cyan-400",
}) {
  return (
    <div className="rounded-2xl border border-default-200 bg-background p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-default-500">{title}</p>

          <h2 className="mt-2 text-3xl font-black text-foreground">{value}</h2>

          {description && (
            <p className="mt-2 text-sm text-default-500">{description}</p>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br ${color} text-white`}
        >
          {Icon && <Icon className="h-7 w-7" />}
        </div>
      </div>
    </div>
  );
}
