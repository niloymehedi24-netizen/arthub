"use server"

import { serverMutation } from "../server";

export const addArtwork = async (data) => {
  return await serverMutation("/api/artworks", "POST", data);
};


export const updateArtwork = async (id, artworkData) => {
  return await serverMutation(`/api/artworks/${id}`, "PATCH", artworkData);
};

export const deleteArtwork = async (id) => {
  return await serverMutation(`/api/artworks/${id}`, "DELETE");
};