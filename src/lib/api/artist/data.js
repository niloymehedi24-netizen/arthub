import { serverFetch } from "../server";

export const getArtistSales = (email) =>
  serverFetch(`/api/sales/${email}`);

export const getArtistProfile = (email) =>
  serverFetch(`/api/users/${email}`);