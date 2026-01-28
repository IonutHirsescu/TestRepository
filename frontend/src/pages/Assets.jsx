import { useAssets } from "../hooks/useAssets";
import { AssetFilter, AssetsTable } from "../components/assets";

function Assets() {
  const { assets, loading, error, filter, setFilter } = useAssets();

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-2 text-red-800">
            <span className="text-xl">⚠️</span>
            <p className="font-medium">Error loading assets data</p>
          </div>
          <p className="text-red-600 mt-2 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
        <AssetFilter activeFilter={filter} onFilterChange={setFilter} />
      </div>

      <p className="text-sm text-gray-500">
        Showing {assets.length} asset{assets.length !== 1 ? "s" : ""}
      </p>

      <AssetsTable assets={assets} loading={loading} />
    </div>
  );
}

export default Assets;
