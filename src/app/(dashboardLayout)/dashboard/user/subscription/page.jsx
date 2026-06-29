"use client";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useSession } from "@/lib/auth-client";

import { subscribePlan } from "@/lib/api/subscription/action";

import { getSubscription } from "@/lib/api/subscription/data";
import { Button, Card, Chip, ProgressBar } from "@heroui/react";

const plans = [
  {
    name: "Free",
    price: 0,
    maxPurchases: 3,
    color: "default",
    features: ["3 Purchases", "Community Support", "Standard Quality"],
  },
  {
    name: "Pro",
    price: 9.99,
    maxPurchases: 9,
    color: "secondary",
    features: ["9 Purchases", "Priority Support", "Exclusive Artworks"],
  },
  {
    name: "Premium",
    price: 19.99,
    maxPurchases: -1,
    color: "success",
    features: [
      "Unlimited Purchases",
      "VIP Support",
      "Exclusive Collections",
      "Early Access",
    ],
  },
];

export default function SubscriptionPage() {
  const { data: session } = useSession();

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchData = async () => {
      const data = await getSubscription(session.user.email);

      setSubscription(data);
    };

    fetchData();
  }, [session]);

  const handleUpgrade = async (plan) => {
    try {
      await subscribePlan({
        userEmail: session.user.email,
        userName: session.user.name,
        plan: plan.name,
        price: plan.price,
        maxPurchases: plan.maxPurchases,
      });

      toast.success(`Welcome to ${plan.name}!`);

      const updated = await getSubscription(session.user.email);

      setSubscription(updated);
    } catch {
      toast.error("Upgrade failed");
    }
  };

  return (
    <section className="space-y-10 p-6">
      <div>
        <h1 className="text-4xl font-black">Subscription Plans</h1>

        <p className="text-default-500 mt-2">Upgrade your experience.</p>
      </div>

      <Card>
        <div>
          <h3 className="font-semibold">Current Plan</h3>

          <Chip color="secondary" size="lg">
            {subscription?.plan || "Free"}
          </Chip>
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name}>
            <div className="space-y-5">
              <h2 className="text-3xl font-black">{plan.name}</h2>

              <h1 className="text-5xl font-black">${plan.price}</h1>

              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature}>✓ {feature}</li>
                ))}
              </ul>

              <Button
                color={plan.color}
                isDisabled={subscription?.plan === plan.name}
                onPress={() => handleUpgrade(plan)}
              >
                {subscription?.plan === plan.name ? "Current Plan" : "Upgrade"}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <div>
          <h3 className="font-bold">Purchase Limit</h3>

          <ProgressBar value={65} color="secondary" />

          <p className="text-default-500 mt-2">
            Remaining purchases will be shown here.
          </p>
        </div>
      </Card>
    </section>
  );
}
