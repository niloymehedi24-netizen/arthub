import { serverMutation } from "../server";

export const updateProfile = (email, data) => {
  return serverMutation(`/api/users/${email}`,"PATCH",data);
};