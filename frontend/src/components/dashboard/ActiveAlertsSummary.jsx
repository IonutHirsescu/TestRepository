import PropTypes from "prop-types";
import { formatRelativeTime } from "../../utils/formatters";

const SEVERITY_STYLES = {
  critical: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-blue-100 text-blue-800 border-blue-200",
};

const SEVERITY_ICONS = {
  critical: "🚨",
  high: "⚠️",
  medium: "📢",
  low: "ℹ️",
};

function AlertItem({ alert }) {
  const msg = alert.message || alert.title || "Alert notification";
  const icon = SEVERITY_ICONS[alert.severity] || SEVERITY_ICONS.medium;
  const badgeClass = SEVERITY_STYLES[alert.severity] || SEVERITY_STYLES.medium;

  return (
    <div className="py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-3">
        <span className="text-lg mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 mb-1 line-clamp-2">{msg}</p>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs px-2 py-0.5 rounded-full border ${badgeClass}`}
            >
              {alert.severity}
            </span>
            <span className="text-xs text-gray-500">
              {formatRelativeTime(alert.timestamp)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

AlertItem.propTypes = {
  alert: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    title: PropTypes.string,
    severity: PropTypes.string,
    timestamp: PropTypes.string,
  }).isRequired,
};

function ActiveAlertsSummary({ alerts, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="py-3 border-b border-gray-100">
            <div className="flex gap-3">
              <div className="h-6 w-6 bg-gray-200 rounded" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const items = alerts?.slice(0, 5) || [];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔔</span>
          <h2 className="text-lg font-semibold text-gray-700">Active Alerts</h2>
        </div>
        {items.length > 0 && (
          <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
            {items.length} active
          </span>
        )}
      </div>

      {items.length ? (
        items.map((alert, idx) => (
          <AlertItem key={alert.id || idx} alert={alert} />
        ))
      ) : (
        <p className="text-gray-500 text-center py-4">No active alerts</p>
      )}
    </div>
  );
}

ActiveAlertsSummary.propTypes = {
  alerts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.string,
      title: PropTypes.string,
      severity: PropTypes.string,
      timestamp: PropTypes.string,
    }),
  ),
  loading: PropTypes.bool,
};

export default ActiveAlertsSummary;
