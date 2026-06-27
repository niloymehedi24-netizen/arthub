"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import {
  ArrowRightFromSquare,
  Bars,
  Brush,
  ChartColumn,
  LayoutHeaderCellsLarge,
  Moon,
  Palette,
  Person,
  ShoppingBag,
  Sun,
  Xmark,
} from "@gravity-ui/icons";

export default function Navbar({ user, onLogout }) {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useAppTheme();
  const [open, setOpen] = useState(false);

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
        icon: <ShoppingBag></ShoppingBag>,
      },
      {
        label: "Profile",
        href: "/dashboard/user/profile",
        icon: <Person></Person>,
      },
    ],
    artist: [
      {
        label: "Manage Artworks",
        href: "/dashboard/artist",
        icon: <Brush></Brush>,
      },
      {
        label: "Sales History",
        href: "/dashboard/artist/sales",
        icon: <ChartColumn></ChartColumn>,
      },
      {
        label: "Profile",
        href: "/dashboard/artist/profile",
        icon: <Person></Person>,
      },
    ],
    admin: [
      {
        label: "Admin Overview",
        href: "/dashboard/admin",
        icon: <ChartColumn></ChartColumn>,
      },
      {
        label: "Manage Users",
        href: "/dashboard/admin/users",
        icon: <Person></Person>,
      },
      {
        label: "Manage Artworks",
        href: "/dashboard/admin/artworks",
        icon: <Brush></Brush>,
      },
    ],
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-default-200/70 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-default-200 sm:hidden"
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
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="light"
                  startContent={<LayoutHeaderCellsLarge className="h-4 w-4" />}
                  className={
                    pathname.startsWith("/dashboard")
                      ? "font-semibold text-fuchsia-500"
                      : "font-semibold text-default-600"
                  }
                >
                  Dashboard
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Dashboard menu">
                {(dashboardLinks[role] || dashboardLinks.user).map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownItem
                      key={item.href}
                      as={Link}
                      href={item.href}
                      startContent={<Icon className="h-4 w-4" />}
                    >
                      {item.label}
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            isIconOnly
            variant="flat"
            aria-label="Toggle theme"
            onPress={toggleTheme}
          >
            <span suppressHydrationWarning>
              {resolvedTheme === "dark" ? <Sun /> : <Moon />}
            </span>
          </Button>

          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="flex items-center gap-2 rounded-full outline-none">
                  <Avatar
                    size="sm"
                    src={user.image}
                    name={user.name}
                    className="ring-2 ring-fuchsia-400/40"
                  />
                  <span className="hidden text-sm font-semibold text-default-700 md:inline">
                    {user.name}
                  </span>
                </button>
              </DropdownTrigger>

              <DropdownMenu aria-label="User menu">
                <DropdownItem key="dashboard" as={Link} href={dashboardHref}>
                  Dashboard
                </DropdownItem>
                <DropdownItem
                  key="profile"
                  as={Link}
                  href={`${dashboardHref}/profile`}
                >
                  Profile
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={<ArrowRightFromSquare className="h-4 w-4" />}
                  onPress={onLogout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex items-center gap-2">
              <Link href={"/login"}>
                <Button variant="flat" className="font-bold text-fuchsia-500">
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
        </div>
      </nav>

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
              <Link
                href={dashboardHref}
                onClick={() => setOpen(false)}
                className="text-lg font-semibold text-default-700"
              >
                Dashboard
              </Link>
            )}

            {!user && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link href={"/login"}>
                  <Button variant="flat" className="font-bold text-fuchsia-500">
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
          </div>
        </div>
      )}
    </header>
  );
}
