"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { Envelope, Lock, Palette } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

function getRedirectPath(role) {
  if (role === "admin") return "/dashboard/admin";
  if (role === "artist") return "/dashboard/artist";
  return "/";
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message || "Login failed");
      }

      const role = data?.user?.role || "user";

      toast.success("Login successful");
      router.replace(getRedirectPath(role));
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-default-50 px-4 py-14 dark:bg-default-100/5 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-default-200 bg-background shadow-2xl lg:grid-cols-2">
        <div className="relative hidden min-h-160 overflow-hidden bg-black lg:block">
          <Image
            width={900}
            height={900}
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1200&auto=format&fit=crop"
            alt="Art gallery"
            className="h-full w-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/10" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Palette className="h-4 w-4 text-cyan-300" />
              Welcome Back
            </div>

            <h1 className="text-5xl font-black leading-tight">
              Continue your ArtHub journey.
            </h1>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Sign in to buy original artworks, manage your collection, or grow
              your artist dashboard.
            </p>
          </div>
        </div>

        <div className="flex items-center px-5 py-10 sm:px-10 lg:px-12">
          <div className="w-full">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-500">
                Login
              </p>

              <h2 className="mt-2 text-4xl font-black text-foreground">
                Sign in to ArtHub
              </h2>

              <p className="mt-3 text-sm text-default-500">
                New here?{" "}
                <Link
                  href="/register"
                  className="font-bold text-fuchsia-500 hover:text-fuchsia-600"
                >
                  Create an account
                </Link>
              </p>
            </div>

            <Button
              type="button"
              variant="bordered"
              className="h-12 w-full font-bold"
              onPress={handleGoogleLogin}
            >
              <span className="flex items-center justify-center gap-2">
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </span>
            </Button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-default-200" />
              <span className="text-xs font-bold uppercase text-default-400">
                Or login with email
              </span>
              <div className="h-px flex-1 bg-default-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">
                  Email
                </label>
                <div className="relative">
                  <Envelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-default-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-xl border border-default-200 bg-background px-10 text-sm outline-none transition placeholder:text-default-400 focus:border-fuchsia-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-foreground">
                  Password
                </label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-default-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-xl border border-default-200 bg-background px-10 text-sm outline-none transition placeholder:text-default-400 focus:border-fuchsia-400"
                  />
                </div>
              </div>

              <Button
                type="submit"
                isLoading={loading}
                className="h-12 w-full bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25"
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
