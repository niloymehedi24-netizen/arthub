import { serverFetch } from "../server"

export const myArt = async (email) => {
    const result = await serverFetch(`/api/artworks/${email}`)
    return result
}

export const getAllArtworks = async (search = "", category = "", sort = "") => {
  const query = new URLSearchParams({ search, category, sort }).toString();
  return await serverFetch(`/api/artworks?${query}`);
};

export const getSingleArtwork = async (id) => {
  return await serverFetch(`/api/artworks/single/${id}`);
};

export const getArtwork = (id) =>
  serverFetch(`/api/artworks/single/${id}`);