import { serverFetch } from "../server";

export const getSubscription = (email) =>
  serverFetch(`/api/subscriptions/${email}`);