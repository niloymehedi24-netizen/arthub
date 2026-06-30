import { serverMutation } from "../server";

export const createPaymentIntent = (amount) =>
  serverMutation("/api/create-payment-intent", "POST", {
    amount,
  });

export const savePurchase = (purchase) =>
  serverMutation("/api/purchases", "POST", purchase);