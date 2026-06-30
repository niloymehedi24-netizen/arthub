"use client";

import { useState } from "react";
import { Card, Input, Button, Avatar } from "@heroui/react";

import toast from "react-hot-toast";
import { updateProfile } from "@/lib/api/user/action";
import { Envelope, Handset, House, Person, Picture } from "@gravity-ui/icons";

export default function ProfileForm({ profile }) {
  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(profile?.image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const data = {
      name: form.get("name")?.trim(),
      image: form.get("image")?.trim(),
      phone: form.get("phone")?.trim(),
      address: form.get("address")?.trim(),
    };

    try {
      await updateProfile(profile.email, data);
      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mt-8 max-w-3xl border border-default-200/60 bg-background shadow-xl rounded-3xl">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center gap-4 border-b border-default-100 pb-6">
          <Avatar
            src={avatarUrl}
            className="h-28 w-28 text-large ring-4 ring-fuchsia-500/20 shadow-md"
            isBordered
            color="secondary"
          />
          <div className="text-center">
            <h3 className="text-xl font-black text-foreground">
              {profile?.name || "ArtHub User"}
            </h3>
            <p className="text-xs font-medium text-default-400 capitalize bg-default-100 px-3 py-1 rounded-full mt-1 inline-block">
              {profile?.role || "User"} Account
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              variant="bordered"
              defaultValue={profile?.name}
              placeholder="Your full name"
              labelPlacement="outside"
              className="font-medium"
              startcontent={<Person className="h-4 w-4 text-default-400" />}
            />

            <Input
              label="Phone Number"
              name="phone"
              variant="bordered"
              defaultValue={profile?.phone}
              placeholder="Enter phone number"
              labelPlacement="outside"
              className="font-medium"
              startcontent={<Handset className="h-4 w-4 text-default-400" />}
            />
          </div>

          <Input
            label="Email Address"
            value={profile?.email}
            variant="flat"
            isReadOnly
            labelPlacement="outside"
            className="font-medium opacity-80"
            startcontent={<Envelope className="h-4 w-4 text-default-400" />}
          />

          <Input
            label="Avatar Image URL"
            name="image"
            variant="bordered"
            defaultValue={profile?.image}
            placeholder="https://example.com/avatar.jpg"
            labelPlacement="outside"
            className="font-medium"
            onChange={(e) => setAvatarUrl(e.target.value)}
            startcontent={<Picture className="h-4 w-4 text-default-400" />}
          />

          <Input
            label="Shipping Address"
            name="address"
            variant="bordered"
            defaultValue={profile?.address}
            placeholder="Enter full physical address"
            labelPlacement="outside"
            className="font-medium"
            startcontent={<House className="h-4 w-4 text-default-400" />}
          />

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={loading}
              className="h-12 w-full rounded-xl bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25"
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}
