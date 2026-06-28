"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

import { uploadImage } from "@/utils/uploadImage";
import ArtworkForm from "@/components/dashboard/ArtWorkForm";
import { addArtwork } from "@/lib/api/artwork/action";
import { myArt } from "@/lib/api/artwork/data";

export default function AddWorksPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [myArtwork, setMyArtwork] = useState(null);

  useEffect(() => {
    const setArtData = async () => {
      if (!session?.user?.email) return;

      try {
        const art = await myArt(session.user.email);
        setMyArtwork(art);
      } catch (err) {
        console.error("Failed to load artwork", err);
      }
    };

    setArtData();
  }, [session]);

  const handleAddArtwork = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);

      const imageFile = formData.get("image");

      if (!imageFile || imageFile.size === 0) {
        toast.error("Please select an artwork image.");
        return;
      }

      // Upload image to imgBB
      const imageUrl = await uploadImage(imageFile);

      const artworkData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        image: imageUrl,
        artistName: session?.user?.name,
        artistEmail: session?.user?.email,
      };

      const result = await addArtwork(artworkData);

      if (result.insertedId) {
        toast.success("Artwork published successfully!");
        e.target.reset();
      } else {
        toast.error("Failed to publish artwork.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <DashboardHeading
        title="Add New Artwork"
        subtitle="Upload your artwork and showcase it to thousands of art lovers around the world."
      />

      <ArtworkForm
        loading={loading}
        submitText="Publish Artwork"
        onSubmit={handleAddArtwork}
      />
    </div>
  );
}
