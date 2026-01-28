import PropTypes from "prop-types";
import { formatCurrency, formatPercentage } from "../../utils/formatters";

function AssetRow({ asset }) {
  const isUp = asset.changePercent >= 0;

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-600">
            {asset.symbol?.[0]}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{asset.symbol}</p>
          <p className="text-sm text-gray-500 truncate max-w-[120px]">
            {asset.name}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-gray-900">
          {formatCurrency(asset.currentPrice)}
        </p>
        <p
          className={`text-sm font-medium ${isUp ? "text-green-600" : "text-red-600"}`}
        >
          {isUp && "+"}
          {formatPercentage(asset.changePercent)}
        </p>
      </div>
    </div>
  );
}

AssetRow.propTypes = {
  asset: PropTypes.shape({
    symbol: PropTypes.string,
    name: PropTypes.string,
    currentPrice: PropTypes.number,
    changePercent: PropTypes.number,
  }).isRequired,
};

function TopMoversSection({ topGainers, topLosers, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md p-6 animate-pulse"
          >
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
            {[0, 1, 2].map((j) => (
              <div key={j} className="flex justify-between py-3">
                <div className="h-10 bg-gray-200 rounded w-1/3" />
                <div className="h-10 bg-gray-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  const gainers = topGainers?.slice(0, 3) || [];
  const losers = topLosers?.slice(0, 3) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gainers Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-500 text-xl">📈</span>
          <h2 className="text-lg font-semibold text-gray-700">Top Gainers</h2>
        </div>
        {gainers.length > 0 ? (
          gainers.map((asset) => <AssetRow key={asset.symbol} asset={asset} />)
        ) : (
          <p className="text-gray-500 text-center py-4">
            No gainers data available
          </p>
        )}
      </div>

      {/* Losers Card */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 text-xl">📉</span>
          <h2 className="text-lg font-semibold text-gray-700">Top Losers</h2>
        </div>
        {losers.length > 0 ? (
          losers.map((asset) => <AssetRow key={asset.symbol} asset={asset} />)
        ) : (
          <p className="text-gray-500 text-center py-4">
            No losers data available
          </p>
        )}
      </div>
    </div>
  );
}

TopMoversSection.propTypes = {
  topGainers: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string,
      name: PropTypes.string,
      currentPrice: PropTypes.number,
      changePercent: PropTypes.number,
    }),
  ),
  topLosers: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string,
      name: PropTypes.string,
      currentPrice: PropTypes.number,
      changePercent: PropTypes.number,
    }),
  ),
  loading: PropTypes.bool,
};

export default TopMoversSection;
