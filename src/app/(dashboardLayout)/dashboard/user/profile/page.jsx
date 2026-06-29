"use client";

import { useEffect, useState } from "react";

import { useSession } from "@/lib/auth-client";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ProfileForm from "@/components/dashboard/user/ProfileForm";

import { getProfile } from "@/lib/api/user/data";

export default function ProfilePage() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    getProfile(session.user.email).then(setProfile);
  }, [session]);

  if (!profile) return null;

  return (
    <>
      <DashboardHeading
        title="Profile"
        subtitle="Manage your personal information."
      />

      <ProfileForm profile={profile} />
    </>
  );
}
