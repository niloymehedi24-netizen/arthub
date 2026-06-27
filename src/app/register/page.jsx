"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "@heroui/react";
import { Envelope, Lock, Person, Palette } from "@gravity-ui/icons";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fullName = formData.get("fullName")?.trim();
    const email = formData.get("email")?.trim();
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        role,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Registration failed");
      }

      toast.success("Account created successfully");
      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-default-50 px-4 py-14 dark:bg-default-100/5 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-default-200 bg-background shadow-2xl lg:grid-cols-2">
        <div className="relative hidden min-h-180 overflow-hidden bg-black lg:block">
          <Image
            width={500}
            height={300}
            src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1200&auto=format&fit=crop"
            alt="Colorful artwork gallery"
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />

          <div className="absolute bottom-10 left-10 right-10 text-white">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-md">
              <Palette className="h-4 w-4 text-cyan-300" />
              Join ArtHub
            </div>

            <h1 className="text-5xl font-black leading-tight">
              Start collecting or selling original art.
            </h1>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/75">
              Create your account as a buyer or artist and become part of a
              creative marketplace built for discovery.
            </p>
          </div>
        </div>

        <div className="flex items-center px-5 py-10 sm:px-10 lg:px-12">
          <div className="w-full">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wide text-fuchsia-500">
                Create Account
              </p>
              <h2 className="mt-2 text-4xl font-black text-foreground">
                Sign up to ArtHub
              </h2>
              <p className="mt-3 text-sm text-default-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-fuchsia-500 hover:text-fuchsia-600"
                >
                  Login
                </Link>
              </p>
            </div>

            <Button
              type="button"
              variant="bordered"
              className="h-12 w-full font-bold"
              startContent={<FcGoogle className="h-5 w-5" />}
              onClick={handleGoogleRegister}
            >
              <span className="flex items-center justify-center gap-2">
                <FcGoogle className="h-5 w-5" />
                Continue with Google
              </span>
            </Button>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-default-200" />
              <span className="text-xs font-bold uppercase text-default-400">
                Or register with email
              </span>
              <div className="h-px flex-1 bg-default-200" />
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <Input
                name="fullName"
                label="Full Name"
                placeholder="Enter your full name"
                variant="bordered"
                required
                startcontent={<Person className="h-4 w-4 text-default-400" />}
              />

              <Input
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                required
                startcontent={<Envelope className="h-4 w-4 text-default-400" />}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Create password"
                  variant="bordered"
                  required
                  startcontent={<Lock className="h-4 w-4 text-default-400" />}
                />

                <Input
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm password"
                  variant="bordered"
                  required
                  startcontent={<Lock className="h-4 w-4 text-default-400" />}
                />
              </div>

              <div>
                <p className="mb-3 text-sm font-bold text-foreground">
                  Register as
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant={role === "user" ? "flat" : "bordered"}
                    onClick={() => setRole("user")}
                    className={`min-h-28 w-full rounded-2xl border px-4 py-4 ${
                      role === "user"
                        ? "border-fuchsia-400 bg-fuchsia-500/10"
                        : "border-default-200 bg-default-50 hover:border-fuchsia-300 dark:bg-default-100/5"
                    }`}
                  >
                    <div className="flex w-full flex-col items-start whitespace-normal text-left">
                      <p className="font-black text-foreground">User / Buyer</p>
                      <p className="mt-1 text-sm font-normal leading-5 text-default-500">
                        Browse, buy, and comment on artworks.
                      </p>
                    </div>
                  </Button>

                  <Button
                    type="button"
                    variant={role === "artist" ? "flat" : "bordered"}
                    onClick={() => setRole("artist")}
                    className={`min-h-28 w-full rounded-2xl border px-4 py-4 ${
                      role === "artist"
                        ? "border-fuchsia-400 bg-fuchsia-500/10"
                        : "border-default-200 bg-default-50 hover:border-fuchsia-300 dark:bg-default-100/5"
                    }`}
                  >
                    <div className="flex w-full flex-col items-start whitespace-normal text-left">
                      <p className="font-black text-foreground">Artist</p>
                      <p className="mt-1 text-sm font-normal leading-5 text-default-500">
                        Upload, manage, and sell original art.
                      </p>
                    </div>
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 w-full rounded-xl bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white shadow-lg shadow-fuchsia-500/25 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
