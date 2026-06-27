"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";
import { ArrowRight, Palette } from "@gravity-ui/icons";
import Image from "next/image";

export default function FeaturedMotion() {
  return (
    <section className="overflow-hidden bg-background py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10 px-4 py-2 text-sm font-bold text-fuchsia-500"
          >
            <Palette className="h-4 w-4" />
            Animated Discovery
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.6 }}
            className="mt-5 max-w-xl text-4xl font-black leading-tight text-foreground sm:text-5xl"
          >
            Explore art with motion, mood, and meaning.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16, duration: 0.6 }}
            className="mt-5 max-w-xl text-base leading-8 text-default-500"
          >
            ArtHub brings artworks to life with smooth browsing, expressive
            visuals, and a gallery-like digital experience built for collectors,
            buyers, and artists.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-8"
          >
            <Button
              as={Link}
              href="/browse-artworks"
              className="bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25"
              endContent={<ArrowRight className="h-4 w-4" />}
            >
              Start Exploring
            </Button>
          </motion.div>
        </div>

        <div className="relative min-h-105">
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 top-10 h-72 w-56 overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=900&auto=format&fit=crop"
              alt="Colorful painting"
              height={400}
              width={600}
              className="h-full w-full object-cover"
            ></Image>
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -2, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-0 h-80 w-64 overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=900&auto=format&fit=crop"
              alt="Gallery artwork"
              height={400}
              width={600}
              className="h-full w-full object-cover"
            ></Image>
          </motion.div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-28 h-64 w-72 overflow-hidden rounded-[2rem] shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=900&auto=format&fit=crop"
              alt="Artist painting"
              height={400}
              width={600}
              className="h-full w-full object-cover"
            ></Image>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
