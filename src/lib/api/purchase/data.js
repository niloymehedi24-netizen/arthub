import { serverFetch } from "../server";

export const getPurchaseHistory = async (email) => {
  return await serverFetch(`/api/purchases/${email}`);
};

export const getPurchaseCount = async (email) => {
  return await serverFetch(`/api/purchases/count/${email}`);
};

export const getBoughtArtworks = async (email) => {
  return await serverFetch(`/api/purchases/gallery/${email}`);
};