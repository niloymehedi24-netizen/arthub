"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "@gravity-ui/icons";
import Image from "next/image";

const artists = [
  {
    name: "Maya Rahman",
    specialty: "Abstract Painting",
    sales: 128,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Ayan Chowdhury",
    specialty: "Digital Illustration",
    sales: 104,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Nora Ahmed",
    specialty: "Sculpture & Mixed Media",
    sales: 91,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
  },
];

export default function TopArtists() {
  return (
    <section className="bg-default-50 py-20 dark:bg-default-100/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-500">
              Top Artists
            </p>
            <h2 className="mt-3 text-4xl font-black text-foreground">
              Artists collectors love most
            </h2>
          </div>

          <Link href={"/browse-artworks"}>
            <Button
              variant="flat"
              className="font-bold text-fuchsia-500"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              View Artworks
            </Button>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-default-200 bg-background p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-3 ring-fuchsia-400/30">
                  <Image
                    src={artist.avatar}
                    alt={artist.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-black text-foreground">
                    {artist.name}
                  </h3>
                  <p className="truncate text-sm text-default-500">
                    {artist.specialty}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-linear-to-r from-fuchsia-500/10 to-cyan-400/10 p-4">
                <p className="text-3xl font-black text-foreground">
                  {artist.sales}
                </p>
                <p className="mt-1 text-sm font-medium text-default-500">
                  successful artwork sales
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
