"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useParams } from "next/navigation";

import { useSession } from "@/lib/auth-client";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

import { uploadImage } from "@/utils/uploadImage";
import ArtworkForm from "@/components/dashboard/ArtWorkForm";
import { addArtwork, updateArtwork } from "@/lib/api/artwork/action";
import { myArt } from "@/lib/api/artwork/data";

export default function AddWorksPage() {
  const router = useRouter();
  const { id } = useParams();
  const isEditMode = !!id;

  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [myArtwork, setMyArtwork] = useState(null);
  const [editInitialData, setEditInitialData] = useState(null);

  useEffect(() => {
    const setArtData = async () => {
      if (!session?.user?.email) return;

      try {
        const art = await myArt(session.user.email);
        setMyArtwork(art);

        if (isEditMode && Array.isArray(art)) {
          const targetedArt = art.find((item) => item._id === id);
          if (targetedArt) {
            setEditInitialData(targetedArt);
          }
        }
      } catch (err) {
        console.error("Failed to load artwork", err);
      }
    };

    setArtData();
  }, [session, id, isEditMode]);

  const handleSaveArtwork = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const imageFile = formData.get("image");
      let imageUrl = editInitialData?.image || "";

      if (!isEditMode && (!imageFile || imageFile.size === 0)) {
        toast.error("Please select an artwork image.");
        return;
      }

      if (imageFile && imageFile.size > 0) {
        imageUrl = await uploadImage(imageFile);
      }

      const artworkData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category: formData.get("category"),
        price: Number(formData.get("price")),
        image: imageUrl,
        artistName: session?.user?.name,
        artistEmail: session?.user?.email,
      };

      if (isEditMode) {
        const result = await updateArtwork(id, artworkData);
        if (result.success) {
          toast.success("Artwork updated successfully!");
          router.push("/dashboard/artist");
          router.refresh();
        } else {
          toast.error("Failed to update artwork.");
        }
      } else {
        const result = await addArtwork(artworkData);
        if (result.insertedId) {
          toast.success("Artwork published successfully!");
          e.target.reset();
        } else {
          toast.error("Failed to publish artwork.");
        }
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
        title={isEditMode ? "Edit Artwork" : "Add New Artwork"}
        subtitle={
          isEditMode
            ? "Update the details, pricing, or visibility configurations of your listed masterpiece."
            : "Upload your artwork and showcase it to thousands of art lovers around the world."
        }
      />

      <ArtworkForm
        loading={loading}
        defaultValues={editInitialData || {}}
        submitText={isEditMode ? "Save Changes" : "Publish Artwork"}
        onSubmit={handleSaveArtwork}
      />
    </div>
  );
}
