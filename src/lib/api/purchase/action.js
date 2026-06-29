import { serverMutation } from "../server";

export const purchaseArtwork = async (data) => {
  return await serverMutation("/api/purchases","POST",data);
};