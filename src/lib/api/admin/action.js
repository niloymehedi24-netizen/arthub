import { serverMutation } from "../server";


export const changeRole = (id, role) =>
  serverMutation(`/api/admin/users/${id}`, "PATCH",{ role }
  );

export const deleteArtwork = (id) =>
  serverMutation(`/api/admin/artworks/${id}`, "DELETE"
  );