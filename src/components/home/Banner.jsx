"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette } from "@gravity-ui/icons";

const slides = [
  {
    title: "Discover & Buy Original Art",
    subtitle:
      "Explore expressive paintings, digital masterpieces, and rare creations from talented artists around the world.",
    image:
      "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1600&auto=format&fit=crop",
    tag: "Curated Marketplace",
  },
  {
    title: "Own Art That Speaks",
    subtitle:
      "Find pieces with emotion, story, and character. Bring home artwork that feels personal.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1600&auto=format&fit=crop",
    tag: "Original Collections",
  },
  {
    title: "Support Emerging Artists",
    subtitle:
      "Connect directly with creators, discover new styles, and help artists grow through every purchase.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1600&auto=format&fit=crop",
    tag: "Artist Powered",
  },
];

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const slide = slides[activeSlide];

  const goToPrevious = () => {
    setActiveSlide((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveSlide((current) => (current + 1) % slides.length);
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.image}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/25" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            key={`${activeSlide}-tag`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-xl backdrop-blur-md"
          >
            <Palette className="h-4 w-4 text-cyan-300" />
            {slide.tag}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] text-white sm:text-6xl lg:text-7xl">
                {slide.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={"/browse-artworks"}>
              <Button
                size="lg"
                className="bg-linear-to-r from-fuchsia-500 to-cyan-400 px-8 font-bold text-white shadow-2xl shadow-fuchsia-500/30"
              >
                Browse Artworks
              </Button>
            </Link>

            <Link href={"/register"}>
              <Button
                size="lg"
                variant="bordered"
                className="border-white/35 px-8 font-bold text-white backdrop-blur-md"
              >
                Join as Artist
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/20 pt-6">
            <div>
              <p className="text-2xl font-black text-white">2.5k+</p>
              <p className="mt-1 text-xs font-medium text-white/60">Artworks</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">850+</p>
              <p className="mt-1 text-xs font-medium text-white/60">Artists</p>
            </div>
            <div>
              <p className="text-2xl font-black text-white">40+</p>
              <p className="mt-1 text-xs font-medium text-white/60">
                Categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20 md:grid"
      >
        ‹
      </button>

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-white/10 text-2xl text-white backdrop-blur-md transition hover:bg-white/20 md:grid"
      >
        ›
      </button>

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              activeSlide === index
                ? "w-9 bg-white"
                : "w-2.5 bg-white/45 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
