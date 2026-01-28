import PropTypes from "prop-types";
import {
  formatCurrency,
  formatPercentage,
  formatCompactNumber,
} from "../../utils/formatters";

function AssetsTable({ assets, loading }) {
  // loading skeleton
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="h-12 bg-gray-100 border-b" />
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 border-b border-gray-100 flex items-center px-6 gap-4"
          >
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-32" />
            <div className="h-4 bg-gray-200 rounded w-24" />
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        ))}
      </div>
    );
  }

  if (!assets?.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        <p className="text-gray-500">No assets found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Symbol
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                Type
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Change %
              </th>
              <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => {
              const isUp = asset.changePercent >= 0;
              const typeClass =
                asset.type === "stock"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-orange-100 text-orange-800";

              return (
                <tr
                  key={asset.symbol}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-xs font-bold text-gray-600">
                          {asset.symbol?.[0]}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {asset.symbol}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{asset.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${typeClass}`}
                    >
                      {asset.type === "stock" ? "Stock" : "Crypto"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900">
                    {formatCurrency(asset.currentPrice)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span
                      className={`font-semibold ${isUp ? "text-green-600" : "text-red-600"}`}
                    >
                      {isUp && "+"}
                      {formatPercentage(asset.changePercent)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {formatCompactNumber(asset.volume)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

AssetsTable.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.oneOf(["stock", "crypto"]),
      currentPrice: PropTypes.number,
      changePercent: PropTypes.number,
      volume: PropTypes.number,
    }),
  ),
  loading: PropTypes.bool,
};

export default AssetsTable;
