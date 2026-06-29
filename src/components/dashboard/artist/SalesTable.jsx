"use client";

import Link from "next/link";

export default function SalesTable({ sales = [] }) {
  return (
    <div className="rounded-3xl border border-default-200 bg-white shadow-sm">
      <div className="border-b border-default-200 p-6">
        <h2 className="text-2xl font-bold">Recent Sales</h2>
        <p className="text-sm text-default-500">
          Monitor all completed purchases.
        </p>
      </div>

      {sales.length === 0 ? (
        <div className="py-20 text-center">
          <h3 className="text-xl font-bold">No Sales Yet</h3>
          <p className="mt-2 text-default-500">
            Your sales will appear here after customers purchase your artworks.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-default-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Buyer
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Artwork
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">
                  Date
                </th>

                <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr
                  key={sale._id}
                  className="border-t border-default-200 transition hover:bg-default-50"
                >
                  <td className="px-6 py-5 font-semibold">{sale.buyerName}</td>

                  <td className="px-6 py-5">{sale.artworkTitle}</td>

                  <td className="px-6 py-5 font-bold text-emerald-500">
                    ${sale.amount}
                  </td>

                  <td className="px-6 py-5 text-default-500">
                    {new Date(sale.purchasedAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 text-center">
                    <Link
                      href={`/browse-artworks/${sale.artworkId}`}
                      className="rounded-xl bg-fuchsia-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-fuchsia-600"
                    >
                      View Artwork
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
