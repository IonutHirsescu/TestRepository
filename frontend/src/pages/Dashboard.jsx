import { useDashboard, usePortfolio } from "../hooks/useDashboard";
import {
  PortfolioSummaryCard,
  TopMoversSection,
  RecentNewsFeed,
  ActiveAlertsSummary,
} from "../components/dashboard";

function Dashboard() {
  const {
    dashboardData,
    loading: loadingDashboard,
    error: dashErr,
  } = useDashboard();
  const {
    portfolio,
    loading: loadingPortfolio,
    error: portfolioErr,
  } = usePortfolio();

  const error = dashErr || portfolioErr;

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-2 text-red-800">
            <span className="text-xl">⚠️</span>
            <p className="font-medium">Error loading dashboard data</p>
          </div>
          <p className="text-red-600 mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      <PortfolioSummaryCard portfolio={portfolio} loading={loadingPortfolio} />

      <TopMoversSection
        topGainers={dashboardData?.topGainers}
        topLosers={dashboardData?.topLosers}
        loading={loadingDashboard}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentNewsFeed
          news={dashboardData?.recentNews}
          loading={loadingDashboard}
        />
        <ActiveAlertsSummary
          alerts={dashboardData?.activeAlerts}
          loading={loadingDashboard}
        />
      </div>
    </div>
  );
}

export default Dashboard;
