import { serverMutation } from "../server";

export const createComment = (data) => {
  return serverMutation("/api/comments", "POST", data);
};

export const deleteComment = (id) => {
  return serverMutation(`/api/comments/${id}`, "DELETE");
};