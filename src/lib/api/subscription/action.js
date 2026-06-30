import { serverMutation } from "../server";

export const subscribeUser = (data) =>
  serverMutation("/api/subscriptions", "POST", data);