"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

export default function PaymentSuccessPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-lg rounded-3xl border border-default-200 bg-background p-10 text-center shadow-2xl">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 text-5xl">
          ✅
        </div>

        <h1 className="text-4xl font-black">Payment Successful</h1>

        <p className="mt-4 text-default-500 leading-7">
          Thank you for purchasing this artwork. Your transaction has been
          completed successfully.
        </p>

        <div className="mt-10 space-y-4">
          <Link href="/dashboard/user">
            <Button className="h-12 w-full bg-linear-to-r from-fuchsia-500 to-cyan-400 font-bold text-white">
              View Purchase History
            </Button>
          </Link>

          <Link href="/browse-artworks">
            <Button variant="bordered" className="h-12 w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
