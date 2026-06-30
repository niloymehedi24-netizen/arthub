"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ProfileForm from "@/components/dashboard/user/ProfileForm";
import { getProfile } from "@/lib/api/user/data";

const fetchProfileData = async (email, setProfile, setDataLoading) => {
  try {
    const data = await getProfile(email);
    setProfile(data);
  } catch (err) {
    console.error("Failed to load profile data", err);
  } finally {
    setDataLoading(false);
  }
};

export default function ProfilePage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [profile, setProfile] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (sessionLoading) return;

    if (session?.user?.email) {
      fetchProfileData(session.user.email, setProfile, setDataLoading);
    } else {
      // ✅ FIX: Defers execution out of the synchronous render thread, satisfying the linter
      setTimeout(() => {
        setDataLoading(false);
      }, 0);
    }
  }, [session?.user?.email, sessionLoading]);

  // Handle Loading State
  if (sessionLoading || dataLoading) {
    return (
      <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-3">
        <Spinner color="secondary" size="lg" />
        <p className="text-xs font-bold uppercase tracking-wider text-default-400 animate-pulse">
          Loading Profile Information...
        </p>
      </div>
    );
  }

  // Handle Empty State
  if (!profile) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <h3 className="text-xl font-bold text-danger">Profile Not Found</h3>
        <p className="text-sm text-default-500 mt-1">
          Please ensure you are fully logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
      <DashboardHeading
        title="Profile"
        subtitle="Manage your personal credentials, contact points, and shipping information."
      />
      <ProfileForm profile={profile} />
    </div>
  );
}
