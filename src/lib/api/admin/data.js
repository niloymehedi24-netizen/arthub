import { serverFetch } from "../server";


export const getAnalytics = () =>
  serverFetch("/api/admin/analytics");

export const getUsers = () =>
  serverFetch("/api/admin/users");

export const getArtworks = () =>
  serverFetch("/api/admin/artworks");

export const getTransactions = () =>
  serverFetch("/api/admin/transactions");

export const getAdminArtworks = () =>
  serverFetch("/api/admin/artworks");