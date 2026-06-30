"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import DashboardHeading from "@/components/dashboard/DashboardHeading";
import PaymentForm from "@/components/payment/PaymentForm";
import OrderSummary from "@/components/payment/OrderSummary";

import { getArtwork } from "@/lib/api/artworks/data";
import { createPaymentIntent } from "@/lib/api/payment/action";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

export default function CheckoutPage() {
  const { id } = useParams();

  const [artwork, setArtwork] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    async function loadPage() {
      const art = await getArtwork(id);

      setArtwork(art);

      const payment = await createPaymentIntent(art.price);

      setClientSecret(payment.clientSecret);
    }
    loadPage();
  }, [id]);

  if (!artwork || !clientSecret) {
    return <div className="py-40 text-center">Loading...</div>;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <DashboardHeading
        title="Secure Checkout"
        subtitle="Complete your purchase safely using Stripe."
      />

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
            }}
          >
            <PaymentForm artwork={artwork} />
          </Elements>
        </div>

        <div className="lg:col-span-2">
          <OrderSummary artwork={artwork} />
        </div>
      </div>
    </section>
  );
}
