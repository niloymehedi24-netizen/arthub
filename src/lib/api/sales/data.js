import { serverFetch } from "../server";

export const getSales = (email) => {
  return serverFetch(`/api/sales/${email}`);
};

export const getSalesStats = (email) => {
  return serverFetch(`/api/sales/stats/${email}`);
};