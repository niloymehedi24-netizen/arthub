"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brush,
  Camera,
  Cube,
  Palette,
  Picture,
  Sparkles,
} from "@gravity-ui/icons";

const categories = [
  {
    name: "Painting",
    href: "/browse-artworks?category=Painting",
    icon: Palette,
    color: "from-rose-500 to-fuchsia-500",
  },
  {
    name: "Digital",
    href: "/browse-artworks?category=Digital",
    icon: Sparkles,
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Sculpture",
    href: "/browse-artworks?category=Sculpture",
    icon: Cube,
    color: "from-amber-400 to-orange-500",
  },
  {
    name: "Photography",
    href: "/browse-artworks?category=Photography",
    icon: Camera,
    color: "from-emerald-400 to-teal-500",
  },
  {
    name: "Illustration",
    href: "/browse-artworks?category=Illustration",
    icon: Brush,
    color: "from-violet-500 to-indigo-500",
  },
  {
    name: "Mixed Media",
    href: "/browse-artworks?category=Mixed%20Media",
    icon: Picture,
    color: "from-pink-500 to-red-500",
  },
];

export default function ArtCategories() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-500">
            Art Categories
          </p>
          <h2 className="mt-3 text-4xl font-black text-foreground">
            Browse by creative style
          </h2>
          <p className="mt-4 text-default-500">
            Jump into the kind of art that fits your taste, space, and mood.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
              >
                <Link
                  href={category.href}
                  className="group block rounded-2xl border border-default-200 bg-default-50 p-5 transition hover:-translate-y-1 hover:border-fuchsia-400/60 hover:bg-background hover:shadow-xl dark:bg-default-100/5"
                >
                  <div
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br ${category.color} text-white shadow-lg`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-base font-black text-foreground">
                    {category.name}
                  </h3>
                  <p className="mt-2 text-sm text-default-500">
                    Explore collection
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
