import { serverFetch } from "../server";

export const getComments = (artworkId) => {
  return serverFetch(`/api/comments/${artworkId}`);
};