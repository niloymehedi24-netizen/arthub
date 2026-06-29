"use client";

import toast from "react-hot-toast";
import { TrashBin } from "@gravity-ui/icons";

import { changeRole, deleteUser } from "@/lib/api/admin/action";

export default function UsersTable({ users, reloadUsers }) {
  const handleRoleChange = async (id, role) => {
    try {
      await changeRole(id, role);

      toast.success("Role updated successfully");

      reloadUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(
      `Delete ${name}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteUser(id);

      toast.success("User deleted");

      reloadUsers();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">Name</th>

              <th className="px-6 py-4 text-left text-sm font-bold">Email</th>

              <th className="px-6 py-4 text-left text-sm font-bold">Role</th>

              <th className="px-6 py-4 text-center text-sm font-bold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center text-default-500">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-default-200 hover:bg-default-50"
                >
                  <td className="px-6 py-4 font-medium">{user.name}</td>

                  <td className="px-6 py-4">{user.email}</td>

                  <td className="px-6 py-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="rounded-lg border border-default-300 px-3 py-2 outline-none focus:border-fuchsia-500"
                    >
                      <option value="user">User</option>
                      <option value="artist">Artist</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(user._id, user.name)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      <TrashBin className="h-4 w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
