"use client";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import DashboardStats from "@/components/dashboard/DashboardStats";
import {
  Brush,
  CircleDollar,
  ShoppingBag,
  Eye,
  Plus,
  Pencil,
} from "@gravity-ui/icons";
import { Button, Card, Chip, CardBody } from "@heroui/react";
import Link from "next/link";

const stats = [
  {
    title: "Total Artworks",
    value: 18,
    description: "Published artworks",
    icon: Brush,
    color: "from-fuchsia-500 to-cyan-400",
  },
  {
    title: "Total Sales",
    value: "$2,480",
    description: "Lifetime revenue",
    icon: CircleDollar,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Orders",
    value: 32,
    description: "Completed purchases",
    icon: ShoppingBag,
    color: "from-violet-500 to-indigo-500",
  },
];

const recentArtworks = [
  {
    id: 1,
    title: "Dream Horizon",
    price: "$120",
    status: "Available",
  },
  {
    id: 2,
    title: "Golden Forest",
    price: "$180",
    status: "Sold",
  },
  {
    id: 3,
    title: "City Lights",
    price: "$240",
    status: "Available",
  },
];

const recentSales = [
  {
    id: 1,
    artwork: "Golden Forest",
    buyer: "John Smith",
    amount: "$180",
    date: "28 Jun 2026",
  },
  {
    id: 2,
    artwork: "Sunset Glow",
    buyer: "Emily",
    amount: "$220",
    date: "26 Jun 2026",
  },
  {
    id: 3,
    artwork: "Ocean Breeze",
    buyer: "Alex",
    amount: "$160",
    date: "24 Jun 2026",
  },
];

export default function ArtistPage() {
  return (
    <div className="space-y-8 p-4">
      <DashboardHeading
        title="Manage Your Art Gallery"
        subtitle="Create, edit, organize, and monitor your artworks while tracking sales and growing your audience on ArtHub."
      />

      <DashboardStats stats={stats} />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border border-default-200 lg:col-span-2">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Recent Artworks</h2>
                <p className="text-sm text-default-500">
                  Your latest uploaded artworks.
                </p>
              </div>

              <Link href="/dashboard/artist/add-works">
                <Button color="secondary" startContent={<Plus />}>
                  Add Artwork
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {recentArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="flex items-center justify-between rounded-2xl border border-default-200 p-4 transition hover:bg-default-100/30"
                >
                  <div>
                    <h3 className="font-semibold">{artwork.title}</h3>

                    <p className="text-sm text-default-500">{artwork.price}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Chip
                      color={
                        artwork.status === "Sold" ? "success" : "secondary"
                      }
                      variant="flat"
                    >
                      {artwork.status}
                    </Chip>

                    <Button isIconOnly variant="light">
                      <Pencil />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="border border-default-200">
          <div className="space-y-5">
            <div>
              <h2 className="text-xl font-bold">Quick Actions</h2>

              <p className="text-sm text-default-500">
                Frequently used shortcuts.
              </p>
            </div>

            <Link href="/dashboard/artist/add-works">
              <Button fullWidth color="secondary" startContent={<Plus />}>
                Upload Artwork
              </Button>
            </Link>

            <Link href="/dashboard/artist/manage-works">
              <Button fullWidth variant="bordered" startContent={<Brush />}>
                Manage Artworks
              </Button>
            </Link>

            <Link href="/dashboard/artist/sales">
              <Button
                fullWidth
                variant="bordered"
                startContent={<ShoppingBag />}
              >
                View Sales
              </Button>
            </Link>

            <Link href="/browse-artworks">
              <Button fullWidth variant="light" startContent={<Eye />}>
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <Card className="border border-default-200">
        <div>
          <div className="mb-5">
            <h2 className="text-xl font-bold">Recent Sales</h2>

            <p className="text-sm text-default-500">
              Latest purchases made by buyers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-default-200 text-left">
                <tr>
                  <th className="py-3">Artwork</th>
                  <th className="py-3">Buyer</th>
                  <th className="py-3">Date</th>
                  <th className="py-3 text-right">Amount</th>
                </tr>
              </thead>

              <tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id} className="border-b border-default-100">
                    <td className="py-4 font-medium">{sale.artwork}</td>

                    <td>{sale.buyer}</td>

                    <td>{sale.date}</td>

                    <td className="text-right font-bold text-emerald-500">
                      {sale.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <Card className="border border-default-200 bg-linear-to-r from-fuchsia-500/10 to-cyan-500/10 mb-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold">Artist Tip</h2>

            <p className="text-default-600">
              Artists with 10+ high-quality artworks and complete profiles
              generally receive more views and sales. Upload consistently and
              keep your portfolio updated.
            </p>
          </div>

          <Button color="secondary">Complete Profile</Button>
        </div>
      </Card>
    </div>
  );
}
