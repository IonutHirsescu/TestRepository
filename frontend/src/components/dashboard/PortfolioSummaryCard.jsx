import PropTypes from "prop-types";
import { formatCurrency, formatPercentage } from "../../utils/formatters";

function PortfolioSummaryCard({ portfolio, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/4" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <p className="text-gray-500">No portfolio data available</p>
      </div>
    );
  }

  const isUp = portfolio.totalChangePercent >= 0;
  const changeColor = isUp ? "text-green-600" : "text-red-600";

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Portfolio Summary
        </h2>
        <span className="text-xs px-2 py-1 bg-pulse-light text-pulse-primary rounded-full">
          Live
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Total Portfolio Value</p>
          <p className="text-3xl font-bold text-gray-900">
            {formatCurrency(portfolio.totalValue)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Change</p>
            <p className={`text-xl font-semibold ${changeColor}`}>
              {isUp && "+"}
              {formatCurrency(portfolio.totalChange)}
            </p>
          </div>
          <div className="border-l border-gray-200 pl-4">
            <p className="text-sm text-gray-500 mb-1">Change %</p>
            <div className="flex items-center gap-1">
              <span className={`text-xl font-semibold ${changeColor}`}>
                {isUp && "+"}
                {formatPercentage(portfolio.totalChangePercent)}
              </span>
              <span className={`text-lg ${changeColor}`}>
                {isUp ? "↑" : "↓"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PortfolioSummaryCard.propTypes = {
  portfolio: PropTypes.shape({
    totalValue: PropTypes.number,
    totalChange: PropTypes.number,
    totalChangePercent: PropTypes.number,
  }),
  loading: PropTypes.bool,
};

export default PortfolioSummaryCard;
