"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Input, Card, Skeleton } from "@heroui/react";
import { Magnifier } from "@gravity-ui/icons";
import { getAllArtworks } from "@/lib/api/artwork/data";
import EmptyState from "@/components/EmptyState";

const categories = [
  "all",
  "Painting",
  "Digital Art",
  "Photography",
  "Sculpture",
  "Abstract",
  "Portrait",
  "Landscape",
  "Illustration",
];

export default function BrowseArtworksPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArt = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getAllArtworks(search, category, sort);

        setArtworks(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Unable to load artworks.");
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      fetchArt();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, sort]);

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="rounded-2xl border border-danger-200 bg-danger-50 p-8 text-center">
          <h2 className="text-xl font-bold text-danger">
            Oops! Something went wrong.
          </h2>
          <p className="mt-2 text-danger-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black text-foreground">
          Explore Masterpieces
        </h1>
        <p className="mt-2 text-default-500">
          Discover and buy original artworks from creators globally.
        </p>
      </div>

      {/* Controls: Search & Filter bar */}
      <div className="mb-8 grid gap-4 sm:flex sm:items-center sm:justify-between">
        {/* FIXED: Removed onValueChange, added native onChange, and fixed isClearable attribute syntax */}
        <Input
          isclearable="true"
          className="w-full sm:max-w-xs"
          placeholder="Search title or artist..."
          startcontent={<Magnifier className="h-4 w-4 text-default-400" />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-10 rounded-xl border border-default-200 bg-background px-3 text-sm outline-hidden focus:border-fuchsia-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-xl border border-default-200 bg-background px-3 text-sm outline-hidden focus:border-fuchsia-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Artworks Grid */}
      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="space-y-5 p-4" radius="lg">
              <Skeleton className="rounded-lg">
                <div className="h-48 rounded-lg bg-default-300" />
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/4 rounded-lg">
                  <div className="h-3 rounded-lg bg-default-200" />
                </Skeleton>
                <Skeleton className="w-2/3 rounded-lg">
                  <div className="h-3 rounded-lg bg-default-200" />
                </Skeleton>
              </div>
            </Card>
          ))}
        </div>
      ) : artworks.length === 0 ? (
        <EmptyState
          title="No Artworks Found"
          description="We couldn't find any artworks matching your search or selected filters."
          buttonText="Clear Filters"
          onButtonClick={() => {
            setSearch("");
            setCategory("all");
            setSort("newest");
          }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {artworks.map((art) => (
            <Link key={art._id} href={`/browse-artworks/${art._id}`}>
              <Card
                ispressable="true"
                className="group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-fuchsia-500/10"
              >
                {/* FIXED: Replaced raw img with fixed layout Next.js Image attributes */}
                <div className="p-0 overflow-hidden relative">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={art.image || "/placeholder-art.jpg"}
                      alt={art.title}
                      height={500}
                      width={500}
                      className="object-cover transition duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      priority={false}
                    />
                  </div>
                  <div className="p-4 space-y-1.5 text-left">
                    <h3 className="font-bold text-base text-foreground line-clamp-1">
                      {art.title}
                    </h3>
                    <p className="text-xs font-medium text-default-500">
                      By {art.artistName}
                    </p>
                    <p className="text-sm font-black text-fuchsia-500">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(art.price)}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
