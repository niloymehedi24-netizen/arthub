import { serverFetch } from "../server";

export const checkPurchased = (artworkId, email) =>
  serverFetch(`/api/purchases/check/${artworkId}/${email}`);