"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Home, TriangleExclamation, Compass } from "@gravity-ui/icons";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-default-50 px-4 dark:bg-default-100/5 sm:px-6 lg:px-8">
      <div className="relative w-full max-w-xl text-center">
        {/* --- EYE-CATCHY ABSTRACT ART ILLUSTRATION --- */}
        <div className="relative mx-auto mb-10 flex h-64 w-64 items-center justify-center">
          {/* Decorative glowing brand rings */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-fuchsia-500/20 animation-duration-[20s]" />
          <div className="absolute inset-4 animate-spin rounded-full border border-dotted border-cyan-400/30 animation-duration-[10s] direction-[reverse]" />

          {/* Subtle gradient glowing backdrops */}
          <div className="absolute h-48 w-48 rounded-full bg-linear-to-tr from-fuchsia-500/10 to-cyan-400/10 blur-2xl" />

          {/* Main Illustration Canvas */}
          <div className="relative flex h-44 w-44 items-center justify-center rounded-3xl border border-default-200/60 bg-background/80 shadow-2xl backdrop-blur-md transition-transform duration-500 hover:scale-105">
            <span className="text-7xl font-black tracking-tighter text-linear-to-tr from-fuchsia-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent select-none">
              404
            </span>

            {/* Float floating floating utility items */}
            <div className="absolute -right-3 -top-3 animate-bounce rounded-2xl bg-background p-3 shadow-lg border border-default-100 animation-duration-[3s]">
              <Compass className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce rounded-2xl bg-background p-2.5 shadow-md border border-default-100 animation-duration-[4s] [animation-delay:1s]">
              <TriangleExclamation className="h-5 w-5 text-fuchsia-500" />
            </div>
          </div>
        </div>

        {/* --- ERROR MESSAGE CONTROLS --- */}
        <div className="space-y-4">
          <p className="text-sm font-black uppercase tracking-widest text-fuchsia-500">
            Lost in the Gallery
          </p>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Page Not Found
          </h1>
          <p className="mx-auto max-w-md text-base leading-7 text-default-500">
            The creative masterpiece or destination layout you are looking for
            does not exist, has expired, or has been curated into another
            private collection.
          </p>
        </div>

        {/* --- CALL TO ACTION BUTTON --- */}
        <div className="mt-10 flex justify-center">
          <Button
            as={Link}
            href="/"
            size="lg"
            className="h-13 px-8 rounded-xl bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-xl shadow-fuchsia-500/25 transition-all hover:scale-[1.02] hover:shadow-fuchsia-500/40"
            startContent={<Home className="h-4 w-4" />}
          >
            Back to ArtHub Gallery
          </Button>
        </div>
      </div>
    </section>
  );
}
