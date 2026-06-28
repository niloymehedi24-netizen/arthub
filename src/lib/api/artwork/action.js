import { serverMutation } from "../server";

export const addArtwork = async (data) => {
  return await serverMutation("/api/artworks", "POST", data);
};