"use client";

import { Card, CardBody, Input, Button, Avatar } from "@heroui/react";

import { useState } from "react";

import toast from "react-hot-toast";

import { updateProfile } from "@/lib/api/user/action";

export default function ProfileForm({ profile }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = new FormData(e.currentTarget);

    const data = {
      name: form.get("name"),
      image: form.get("image"),
      phone: form.get("phone"),
      address: form.get("address"),
    };

    try {
      await updateProfile(profile.email, data);

      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Update failed.");
    }

    setLoading(false);
  };

  return (
    <Card className="max-w-3xl mt-8">
      <div className="space-y-6">
        <div className="flex justify-center">
          <Avatar src={profile.image} className="h-24 w-24" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Name" name="name" defaultValue={profile.name} />

          <Input label="Image URL" name="image" defaultValue={profile.image} />

          <Input label="Phone" name="phone" defaultValue={profile.phone} />

          <Input
            label="Address"
            name="address"
            defaultValue={profile.address}
          />

          <Input label="Email" value={profile.email} isReadOnly />

          <Button type="submit" color="secondary" fullWidth isLoading={loading}>
            Save Changes
          </Button>
        </form>
      </div>
    </Card>
  );
}
