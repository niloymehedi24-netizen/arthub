import { baseUrl } from "./baseUrl";

export const serverMutation = async (path, method, data) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  // Read response as plain text first to safely inspect it
  const text = await res.text();
  return text ? JSON.parse(text) : { success: true };
};

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  // Read response as plain text first to prevent crashing on empty tables/data
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};