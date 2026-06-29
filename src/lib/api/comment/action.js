import { serverMutation } from "../server";

export const createComment = (data) => {
  return serverMutation("/api/comments", "POST", data);
};