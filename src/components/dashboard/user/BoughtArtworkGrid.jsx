"use client";

import Link from "next/link";
import Image from "next/image";

import { Card, Skeleton, Button } from "@heroui/react";

export default function BoughtArtworkGrid({ artworks, loading }) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-64 rounded-xl" />

            <div className="space-y-3">
              <Skeleton className="h-5 w-2/3 rounded-lg" />
              <Skeleton className="h-4 w-1/2 rounded-lg" />
              <Skeleton className="h-4 w-1/3 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!artworks.length) {
    return (
      <div className="rounded-3xl border border-dashed border-default-300 p-20 text-center">
        <h2 className="text-3xl font-bold">No Purchased Artworks</h2>

        <p className="mt-3 text-default-500">
          Start exploring and purchase your first masterpiece.
        </p>

        <Button
          as={Link}
          href="/browse-artworks"
          color="secondary"
          className="mt-6"
        >
          Browse Artworks
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {artworks.map((art) => (
        <Card
          key={art._id}
          className="group overflow-hidden transition hover:-translate-y-2 hover:shadow-xl"
        >
          <div className="relative h-64">
            <Image
              src={art.artworkImage}
              alt={art.artworkTitle}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
            />
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-bold">{art.artworkTitle}</h3>

            <p className="text-default-500">{art.artistName}</p>

            <div className="flex justify-between">
              <span>{art.category}</span>

              <span className="font-bold text-fuchsia-500">${art.price}</span>
            </div>

            <p className="text-xs text-default-400">
              Purchased on {new Date(art.purchasedAt).toLocaleDateString()}
            </p>

            <Button
              as={Link}
              href={`/browse-artworks/${art.artworkId}`}
              color="secondary"
              fullWidth
            >
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
