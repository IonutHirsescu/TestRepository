import PropTypes from "prop-types";
import { ASSET_FILTER } from "../../hooks/useAssets";

const FILTERS = [
  { value: ASSET_FILTER.ALL, label: "All Assets" },
  { value: ASSET_FILTER.STOCKS, label: "Stocks Only" },
  { value: ASSET_FILTER.CRYPTO, label: "Crypto Only" },
];

function AssetFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="flex items-center gap-2">
      {FILTERS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onFilterChange(opt.value)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${
              activeFilter === opt.value
                ? "bg-pulse-primary text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

AssetFilter.propTypes = {
  activeFilter: PropTypes.oneOf(Object.values(ASSET_FILTER)).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default AssetFilter;
