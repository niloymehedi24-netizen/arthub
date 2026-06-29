import { serverFetch } from "../server";

export const getSubscription = (email) => {
  return serverFetch(
    `/api/subscriptions/${email}`
  );
};