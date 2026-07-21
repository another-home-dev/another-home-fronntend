import { useEffect, useState } from "react";
import { getDashboardOverviewUseCase } from "@features/dashboard/application/getDashboardOverviewUseCase";
import { getDashboardInsightsUseCase } from "@features/dashboard/application/getDashboardInsightsUseCase";
import { getBuildingOccupancySummaryUseCase } from "@features/dashboard/application/getBuildingOccupancySummaryUseCase";

export function useDashboardData() {
  const [metrics, setMetrics] = useState(null);
  const [insights, setInsights] = useState(null);
  const [buildingOccupancy, setBuildingOccupancy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const [metricsResult, insightsResult, buildingResult] = await Promise.all([
          getDashboardOverviewUseCase(),
          getDashboardInsightsUseCase(),
          getBuildingOccupancySummaryUseCase(),
        ]);

        if (!isMounted) return;
        setMetrics(metricsResult);
        setInsights(insightsResult);
        setBuildingOccupancy(buildingResult);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return { metrics, insights, buildingOccupancy, isLoading, error };
}
