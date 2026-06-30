"use client";

import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ProfileForm from "@/components/dashboard/artist/ProfileForm";

import { getArtistProfile } from "@/lib/api/artist/data";

export default function ArtistProfilePage() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    async function loadProfile() {
      const data = await getArtistProfile(session.user.email);
      setProfile(data);
    }

    loadProfile();
  }, [session]);

  if (!profile) return null;

  return (
    <section className="space-y-8 p-8">
      <DashboardHeading
        title="Profile Management"
        subtitle="Manage your public profile."
      />

      <ProfileForm profile={profile} />
    </section>
  );
}
