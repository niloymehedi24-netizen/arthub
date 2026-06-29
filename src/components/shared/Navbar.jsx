"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppTheme } from "@/components/ThemeProvider";
import { useState, useRef, useEffect } from "react";

import { Avatar, Button } from "@heroui/react";
import {
  ArrowRightFromSquare,
  Bars,
  Brush,
  ChartColumn,
  LayoutHeaderCellsLarge,
  Palette,
  Person,
  ShoppingBag,
  Xmark,
} from "@gravity-ui/icons";

import { authClient, useSession } from "@/lib/auth-client";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useAppTheme();

  // Mobile drawer state
  const [open, setOpen] = useState(false);

  // Dropdown visibility toggle states
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  // References for outside click tracking
  const dashboardRef = useRef(null);
  const avatarRef = useRef(null);

  const { data: sessionData, isPending } = useSession();
  const user = sessionData?.user;
  const role = user?.role || "guest";

  const dashboardHref =
    role === "admin"
      ? "/dashboard/admin"
      : role === "artist"
        ? "/dashboard/artist"
        : "/dashboard/user";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Artworks", href: "/browse-artworks" },
  ];

  const dashboardLinks = {
    user: [
      {
        label: "Purchase History",
        href: "/dashboard/user",
        icon: <ShoppingBag />,
      },
      { label: "Profile", href: "/dashboard/user/profile", icon: <Person /> },
    ],
    artist: [
      {
        label: "Manage Artworks",
        href: "/dashboard/artist/add-works",
        icon: <Brush />,
      },
      {
        label: "Sales History",
        href: "/dashboard/artist/sales",
        icon: <ChartColumn />,
      },
      { label: "Profile", href: "/dashboard/artist/profile", icon: <Person /> },
    ],
    admin: [
      {
        label: "Admin Overview",
        href: "/dashboard/admin",
        icon: <ChartColumn />,
      },
      {
        label: "Manage Users",
        href: "/dashboard/admin/users",
        icon: <Person />,
      },
      {
        label: "Manage Artworks",
        href: "/dashboard/admin/artworks",
        icon: <Brush />,
      },
    ],
  };

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dashboardRef.current &&
        !dashboardRef.current.contains(event.target)
      ) {
        setDashboardOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await authClient.signOut();
    setOpen(false);
    setAvatarOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-default-200/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Brand Container */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-default-200 sm:hidden cursor-pointer text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <Xmark /> : <Bars />}
          </button>

          <Link href="/" className="flex items-center gap-3">
            <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-linear-to-br from-rose-500 via-fuchsia-500 to-cyan-400 shadow-lg shadow-fuchsia-500/25">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.85),transparent_28%)]" />
              <Palette className="relative h-6 w-6 text-white" />
            </div>

            <div className="leading-tight">
              <p className="text-xl font-black text-foreground">
                Art<span className="text-fuchsia-500">Hub</span>
              </p>
              <p className="hidden text-xs font-medium text-default-500 sm:block">
                Original art marketplace
              </p>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links */}
        <div className="hidden items-center gap-7 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition ${
                isActive(link.href)
                  ? "text-fuchsia-500"
                  : "text-default-600 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user && (
            <div className="relative" ref={dashboardRef}>
              <button
                onClick={() => setDashboardOpen(!dashboardOpen)}
                className={`flex items-center gap-1.5 h-10 px-3 rounded-xl text-sm font-semibold transition cursor-pointer select-none hover:bg-default-100 ${
                  pathname.startsWith("/dashboard")
                    ? "text-fuchsia-500"
                    : "text-default-600 hover:text-foreground"
                }`}
              >
                <LayoutHeaderCellsLarge className="h-4 w-4" />
                Dashboard
              </button>

              {/* Raw HTML/Tailwind Dropdown Panel */}
              {dashboardOpen && (
                <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-xl border border-default-200/60 bg-background p-1.5 shadow-xl ring-1 ring-black/5 focus:outline-hidden z-50">
                  {(dashboardLinks[role] || dashboardLinks.user).map(
                    (item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setDashboardOpen(false)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-default-700 transition hover:bg-default-100 hover:text-foreground"
                      >
                        <span className="text-default-500 h-4 w-4 flex items-center">
                          {item.icon}
                        </span>
                        {item.label}
                      </Link>
                    ),
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Action Menu Items */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
          </div>

          {!isPending && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  {/* User Profile Dropdown Anchor */}
                  <div className="relative" ref={avatarRef}>
                    <button
                      onClick={() => setAvatarOpen(!avatarOpen)}
                      className="flex items-center gap-2 rounded-full outline-hidden cursor-pointer select-none transition opacity-90 hover:opacity-100"
                    >
                      <Avatar
                        size="sm"
                        src={user.image || undefined}
                        name={user.name}
                        referrerPolicy="no-referrer"
                        className="ring-2 ring-fuchsia-400/40"
                      />
                      <span className="hidden text-sm font-semibold text-default-700 md:inline">
                        {user.name}
                      </span>
                    </button>

                    {/* Raw HTML Profile List */}
                    {avatarOpen && (
                      <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl border border-default-200/60 bg-background p-1.5 shadow-xl ring-1 ring-black/5 z-50">
                        <Link
                          href={dashboardHref}
                          onClick={() => setAvatarOpen(false)}
                          className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-default-700 transition hover:bg-default-100 hover:text-foreground"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href={`${dashboardHref}/profile`}
                          onClick={() => setAvatarOpen(false)}
                          className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-default-700 transition hover:bg-default-100 hover:text-foreground"
                        >
                          Profile
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Desktop Logout Button - Swapped onClick to onPress for HeroUI compatibility */}

                  <Button
                    variant="danger-soft"
                    size="lg"
                    className="hidden sm:flex font-bold text-xs px-3 h-8 rounded-xl"
                    startContent={
                      <ArrowRightFromSquare className="h-3.5 w-3.5" />
                    }
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={"/login"}>
                    <Button
                      variant="flat"
                      className="font-bold text-fuchsia-500"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href={"/register"}>
                    <Button className="bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </nav>

      {/* Responsive Mobile Tray Section */}
      {open && (
        <div className="border-t border-default-200 bg-background px-4 py-5 sm:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`text-lg font-semibold ${
                  isActive(link.href) ? "text-fuchsia-500" : "text-default-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {user && (
              <>
                <Link
                  href={dashboardHref}
                  onClick={() => setOpen(false)}
                  className="text-lg font-semibold text-default-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left text-lg font-semibold text-danger cursor-pointer"
                >
                  <ArrowRightFromSquare className="h-5 w-5" />
                  Logout
                </button>
              </>
            )}

            {!user && !isPending && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link href={"/login"} className="w-full">
                  <Button
                    variant="flat"
                    className="font-bold text-fuchsia-500 w-full"
                  >
                    Login
                  </Button>
                </Link>
                <Link href={"/register"} className="w-full">
                  <Button className="bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25 w-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
