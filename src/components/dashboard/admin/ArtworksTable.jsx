"use client";

import toast from "react-hot-toast";
import { TrashBin } from "@gravity-ui/icons";

import { deleteArtwork } from "@/lib/api/admin/action";

export default function ArtworksTable({ artworks, reloadArtworks }) {
  async function handleDelete(id, title) {
    const confirmed = window.confirm(`Delete "${title}"?`);

    if (!confirmed) return;

    try {
      await deleteArtwork(id);

      toast.success("Artwork deleted");

      reloadArtworks();
    } catch (err) {
      console.error(err);

      toast.error("Delete failed");
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="px-6 py-4 text-left">Artwork</th>
              <th className="px-6 py-4 text-left">Artist</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {artworks.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-10 text-center">
                  No artworks found.
                </td>
              </tr>
            ) : (
              artworks.map((artwork) => (
                <tr key={artwork._id} className="border-t">
                  <td className="px-6 py-4 font-medium">{artwork.title}</td>

                  <td className="px-6 py-4">{artwork.artistName}</td>

                  <td className="px-6 py-4">${artwork.price}</td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(artwork._id, artwork.title)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
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
