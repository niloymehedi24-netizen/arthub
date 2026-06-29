"use client";

import { useEffect, useState } from "react";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ArtworksTable from "@/components/dashboard/admin/ArtworksTable";

import { getAdminArtworks } from "@/lib/api/admin/data";

export default function AdminArtworksPage() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    loadArtworks();
  }, []);

  async function loadArtworks() {
    const data = await getAdminArtworks();
    setArtworks(data);
  }

  return (
    <section className="space-y-8 p-8">
      <DashboardHeading
        title="Manage Artworks"
        subtitle="Delete artworks uploaded by artists."
      />

      <ArtworksTable artworks={artworks} reloadArtworks={loadArtworks} />
    </section>
  );
}
