export default function RecentBuyers({ sales }) {
  return (
    <div className="rounded-2xl border p-6">
      <h2 className="mb-5 text-xl font-bold">Recent Buyers</h2>

      <div className="space-y-4">
        {sales.slice(0, 5).map((buyer) => (
          <div key={buyer._id} className="flex justify-between">
            <div>
              <p className="font-semibold">{buyer.userName}</p>

              <p className="text-sm text-default-500">{buyer.artworkTitle}</p>
            </div>

            <p className="font-bold text-success">${buyer.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
