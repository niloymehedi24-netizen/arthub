import { serverMutation } from "../server";

export const subscribePlan = (data) => {
  return serverMutation("/api/subscriptions", "POST", data);
};