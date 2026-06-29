"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import BoughtArtworkGrid from "@/components/dashboard/user/BoughtArtworkGrid";

import { getBoughtArtworks } from "@/lib/api/purchase/data";

export default function BoughtArtworksPage() {
  const { data: session } = useSession();

  const [artworks, setArtworks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchData = async () => {
      try {
        const data = await getBoughtArtworks(session.user.email);

        setArtworks(data);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  return (
    <section className="space-y-8">
      <DashboardHeading
        title="Bought Artworks"
        subtitle="All masterpieces you've collected."
      />

      <BoughtArtworkGrid artworks={artworks} loading={loading} />
    </section>
  );
}
