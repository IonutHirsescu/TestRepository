import PropTypes from "prop-types";
import { formatRelativeTime } from "../../utils/formatters";

const CATEGORY_COLORS = {
  macro: "bg-blue-100 text-blue-800",
  technology: "bg-purple-100 text-purple-800",
  crypto: "bg-orange-100 text-orange-800",
  earnings: "bg-green-100 text-green-800",
  regulatory: "bg-red-100 text-red-800",
  market: "bg-gray-100 text-gray-800",
};

function NewsItem({ item }) {
  const categoryClass =
    CATEGORY_COLORS[item.category] || CATEGORY_COLORS.market;

  return (
    <div className="py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
            {item.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-500">{item.source}</span>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {formatRelativeTime(item.timestamp)}
            </span>
          </div>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${categoryClass}`}
        >
          {item.category}
        </span>
      </div>
    </div>
  );
}

NewsItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    source: PropTypes.string,
    timestamp: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
};

function RecentNewsFeed({ news, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="py-4 border-b border-gray-100">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  const items = news?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">📰</span>
        <h2 className="text-lg font-semibold text-gray-700">Recent News</h2>
      </div>

      {items.length ? (
        items.map((item) => <NewsItem key={item.id} item={item} />)
      ) : (
        <p className="text-gray-500 text-center py-4">
          No recent news available
        </p>
      )}
    </div>
  );
}

RecentNewsFeed.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      source: PropTypes.string,
      timestamp: PropTypes.string,
      category: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
};

export default RecentNewsFeed;
