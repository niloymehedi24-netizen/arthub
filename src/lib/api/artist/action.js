import { serverMutation } from "../server";

export const updateArtistProfile = (email, data) =>
  serverMutation(`/api/users/${email}`, "PATCH", data);