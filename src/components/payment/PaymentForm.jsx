"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { Button } from "@heroui/react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import { savePurchase } from "@/lib/api/payment/action";

export default function PaymentForm({ artwork }) {
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  const { data: session } = authClient.useSession();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      await savePurchase({
        artworkId: artwork._id,
        artworkTitle: artwork.title,

        buyerEmail: session.user.email,
        buyerName: session.user.name,

        artistEmail: artwork.artistEmail,
        artistName: artwork.artistName,

        price: artwork.price,

        transactionId: paymentIntent.id,
      });

      toast.success("Payment Successful!");

      router.push("/dashboard/user");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-default-200 bg-background p-8 shadow-xl"
    >
      <h2 className="mb-2 text-3xl font-black">Payment Details</h2>

      <p className="mb-8 text-default-500">
        Your payment is encrypted and securely processed by Stripe.
      </p>

      <PaymentElement />

      <Button
        type="submit"
        isLoading={loading}
        isDisabled={!stripe}
        className="mt-8 h-14 w-full rounded-2xl bg-linear-to-r from-fuchsia-500 to-cyan-400 text-lg font-bold text-white"
      >
        {loading ? "Processing..." : `Pay $${artwork.price}`}
      </Button>
    </form>
  );
}
