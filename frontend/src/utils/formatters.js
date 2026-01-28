export function formatCurrency(value, currency = "USD") {
  if (value == null) return "-";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value) {
  if (value == null) return "-";
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value, decimals = 2) {
  if (value == null) return "-";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatCompactNumber(value) {
  if (value == null) return "-";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

export function formatRelativeTime(timestamp) {
  if (!timestamp) return "-";

  const date = new Date(timestamp);
  const now = new Date();
  const diffSecs = Math.floor((now - date) / 1000);

  if (diffSecs < 60) return "Just now";

  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDateTime(timestamp) {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
