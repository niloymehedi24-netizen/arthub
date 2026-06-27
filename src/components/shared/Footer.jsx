import Link from "next/link";
import { Button, Input } from "@heroui/react";
import { Envelope, Palette } from "@gravity-ui/icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-default-200 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-linear-to-br from-rose-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/25">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_28%)]" />
                <Palette className="relative h-6 w-6 text-white" />
              </div>

              <div className="leading-tight">
                <p className="text-xl font-black text-foreground">
                  Art<span className="text-fuchsia-500">Hub</span>
                </p>
                <p className="text-xs font-medium text-default-500">
                  Original art marketplace
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-default-500">
              Discover original artworks, support emerging artists, and bring
              meaningful creativity into your space.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <Button
                as="a"
                href="#"
                isIconOnly
                variant="flat"
                aria-label="Facebook"
              >
                <FaFacebookF className="h-4 w-4" />
              </Button>

              <Button
                as="a"
                href="#"
                isIconOnly
                variant="flat"
                aria-label="Instagram"
              >
                <FaInstagram className="h-5 w-5" />
              </Button>

              <Button as="a" href="#" isIconOnly variant="flat" aria-label="X">
                <FaXTwitter className="h-4 w-4" />
              </Button>

              <Button
                as="a"
                href="#"
                isIconOnly
                variant="flat"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Quick Links
            </h3>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/about"
                className="text-sm font-medium text-default-500 transition hover:text-fuchsia-500"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-default-500 transition hover:text-fuchsia-500"
              >
                Contact
              </Link>
              <Link
                href="/privacy-policy"
                className="text-sm font-medium text-default-500 transition hover:text-fuchsia-500"
              >
                Privacy Policy
              </Link>
              <Link
                href="/browse-artworks"
                className="text-sm font-medium text-default-500 transition hover:text-fuchsia-500"
              >
                Browse Artworks
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground">
              Newsletter
            </h3>

            <p className="mt-5 text-sm leading-6 text-default-500">
              Get updates about new artworks, featured artists, and marketplace
              news.
            </p>

            <form className="mt-5 flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <div className="relative w-full">
                <Envelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-default-400" />

                <Input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="w-full pl-10"
                />
              </div>

              <Button
                type="button"
                className="bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-default-200 pt-6 text-sm text-default-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} ArtHub. All rights reserved.</p>
          <p>Made for artists, collectors, and art lovers.</p>
        </div>
      </div>
    </footer>
  );
}
