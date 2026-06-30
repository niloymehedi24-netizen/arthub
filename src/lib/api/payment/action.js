import { serverMutation } from "../server";

export const createPaymentIntent = (amount) =>
  serverMutation("/api/create-payment-intent", "POST", {
    amount,
  });