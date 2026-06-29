"use client";

export default function TransactionsTable({ transactions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-default-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold">
                Transaction ID
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold">Type</th>

              <th className="px-6 py-4 text-left text-sm font-bold">
                User Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold">
                Artist Email
              </th>

              <th className="px-6 py-4 text-left text-sm font-bold">Amount</th>

              <th className="px-6 py-4 text-left text-sm font-bold">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-default-500">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction._id}
                  className="border-t border-default-200 hover:bg-default-50"
                >
                  <td className="px-6 py-4">
                    {transaction._id.toString().slice(-8)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        transaction.type === "Purchase"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                  </td>

                  <td className="px-6 py-4">{transaction.userEmail}</td>

                  <td className="px-6 py-4">{transaction.artistEmail}</td>

                  <td className="px-6 py-4 font-semibold">
                    ${transaction.amount}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(transaction.date).toLocaleDateString()}
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
