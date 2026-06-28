"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button, Skeleton } from "@heroui/react";

import { useSession } from "@/lib/auth-client";
import { getSingleArtwork } from "@/lib/api/artwork/data";
import { deleteArtwork } from "@/lib/api/artwork/action";
import Image from "next/image";
import { Pencil, ShoppingBag, TrashBin } from "@gravity-ui/icons";

export default function ArtworkDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getSingleArtwork(id);
        setArtwork(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this artwork?",
    );

    if (!confirmed) return;

    try {
      setDeleteLoading(true);

      await deleteArtwork(id);

      toast.success("Artwork deleted successfully!");

      router.replace("/browse-artworks");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete artwork.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handlePurchase = () => {
    if (!session?.user) {
      toast.error("Please log in to purchase artworks");
      router.push("/login");
      return;
    }
    const toastId = toast.loading("Redirecting to checkout...");

    toast.dismiss(toastId);
  };

  const canPurchase =
    session?.user && session.user.email !== artwork?.artistEmail;

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-2">
        <Skeleton className="rounded-3xl h-120 w-full" />
        <div className="space-y-6">
          <Skeleton className="w-1/3 h-6 rounded-lg" />
          <Skeleton className="w-3/4 h-12 rounded-lg" />
          <Skeleton className="w-1/2 h-6 rounded-lg" />
          <Skeleton className="w-full h-32 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-black text-danger">Artwork Not Found</h2>
        <p className="mt-2 text-default-500">
          The collection node requested does not exist or has been unlisted.
        </p>
        <Link
          href="/browse-artworks"
          className="mt-6 inline-block font-bold text-fuchsia-500"
        >
          ← Return to Gallery
        </Link>
      </div>
    );
  }

  const isOwner = session?.user?.email === artwork.artistEmail;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/browse-artworks"
        className="inline-flex items-center gap-2 text-default-500 hover:text-fuchsia-500"
      >
        ← Back to Gallery
      </Link>
      <div className="grid gap-10 lg:grid-cols-2 items-start">
        {/* Left Side: High-Res Image Display */}
        <div className="rounded-3xl border border-default-200 bg-white p-5 shadow-xl">
          <Image
            src={artwork.image}
            alt={artwork.title}
            height={600}
            width={600}
            className="rounded-2xl object-contain transition duration-500 hover:scale-105"
          />
        </div>

        {/* Right Side: Metadata Description Information Block */}
        <div className="space-y-6">
          <div>
            <span className="inline-block rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-bold text-fuchsia-500 uppercase tracking-wider">
              {artwork.category}
            </span>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-foreground">
              {artwork.title}
            </h1>
            <p className="mt-2 text-sm text-default-500">
              Published on{" "}
              {new Date(artwork.createdAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-default-50 border border-default-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-default-400 font-medium">Artist</p>
              <Link
                href={`/browse-artworks?search=${encodeURIComponent(artwork.artistName)}`}
                className="text-base font-bold text-foreground hover:text-fuchsia-500 transition"
              >
                {artwork.artistName}
              </Link>
            </div>
            <div className="text-right">
              <p className="text-xs text-default-400 font-medium">Price Tag</p>
              <p className="text-2xl font-black text-fuchsia-500">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(artwork.price)}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-default-200 bg-default-50 p-5">
            <h3 className="font-bold text-sm text-default-700">Description</h3>
            <p className="text-sm leading-relaxed text-default-500 whitespace-pre-line">
              {artwork.description}
            </p>
          </div>

          {/* Action Decision Buttons Layer */}
          <div className="pt-4 border-t border-default-200">
            {isOwner ? (
              <div className="flex gap-4">
                <Link href={`/dashboard/artist/add-works/${artwork._id}`}>
                  <Button
                    className="flex-1 bg-default-100 font-bold"
                    startContent={<Pencil className="h-4 w-4" />}
                  >
                    Edit Artwork
                  </Button>
                </Link>

                <Button
                  color="danger"
                  variant="danger-soft"
                  className="font-bold"
                  isLoading={deleteLoading}
                  onPress={handleDelete}
                  startContent={<TrashBin className="h-4 w-4" />}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <Button
                isDisabled={!canPurchase}
                onPress={handlePurchase}
                className="w-full h-14 rounded-2xl bg-linear-to-r from-fuchsia-500 via-pink-500 to-cyan-400 text-base font-black text-white shadow-xl shadow-fuchsia-500/20"
                startContent={<ShoppingBag className="h-5 w-5" />}
              >
                {isOwner ? "You Own This Artwork" : "Buy Artwork"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
