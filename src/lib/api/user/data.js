import { serverFetch } from "../server";

export const getProfile = (email) => {
  return serverFetch(`/api/users/${email}`);
};