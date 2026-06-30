"use client";

import Image from "next/image";

export default function OrderSummary({ artwork }) {
  return (
    <div className="sticky top-24 overflow-hidden rounded-3xl border border-default-200 bg-background shadow-xl">
      <Image
        src={artwork.image}
        width={700}
        height={500}
        alt={artwork.title}
        className="h-64 w-full object-cover"
      />

      <div className="space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-black">{artwork.title}</h2>

          <p className="mt-2 text-default-500">by {artwork.artistName}</p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Artwork</span>

            <span>${artwork.price}</span>
          </div>

          <div className="flex justify-between">
            <span>Processing Fee</span>

            <span>$0</span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-black">
            <span>Total</span>

            <span>${artwork.price}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-green-500/10 p-4">
          <p className="font-semibold text-green-600">🔒 Secured by Stripe</p>
        </div>
      </div>
    </div>
  );
}
