"use client";

import { useState } from "react";

import { Input, Button, Card, CardBody } from "@heroui/react";

import toast from "react-hot-toast";

import { updateArtistProfile } from "@/lib/api/artist/action";

export default function ProfileForm({ profile }) {
  const [form, setForm] = useState(profile);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateArtistProfile(profile.email, form);

      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-3xl rounded-3xl shadow-xl">
      <div className="space-y-6 p-8">
        <Input
          label="Full Name"
          value={form.name || ""}
          onValueChange={(v) =>
            setForm({
              ...form,
              name: v,
            })
          }
        />

        <Input label="Email" value={form.email} isReadOnly />

        <Input
          label="Profile Image URL"
          value={form.image || ""}
          onValueChange={(v) =>
            setForm({
              ...form,
              image: v,
            })
          }
        />

        <Input
          label="Phone"
          value={form.phone || ""}
          onValueChange={(v) =>
            setForm({
              ...form,
              phone: v,
            })
          }
        />

        <Input
          label="Address"
          value={form.address || ""}
          onValueChange={(v) =>
            setForm({
              ...form,
              address: v,
            })
          }
        />

        <Button
          color="secondary"
          size="lg"
          isLoading={loading}
          onPress={handleSubmit}
        >
          Save Changes
        </Button>
      </div>
    </Card>
  );
}
