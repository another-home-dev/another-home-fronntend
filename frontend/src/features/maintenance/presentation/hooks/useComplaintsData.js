import { useCallback, useEffect, useState } from "react";
import { getComplaintsUseCase } from "@features/maintenance/application/getComplaintsUseCase";
import { getComplaintStatsUseCase } from "@features/maintenance/application/getComplaintStatsUseCase";

const DEFAULT_FILTERS = { search: "", status: "All", priority: "All", category: "All" };
const PAGE_SIZE = 10;

export function useComplaintsData() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [result, setResult] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0, pageSize: PAGE_SIZE, data: [] });
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, resolved: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(() => {
    setIsLoading(true);
    Promise.all([
      getComplaintsUseCase({ page, pageSize: PAGE_SIZE, ...filters }),
      getComplaintStatsUseCase(),
    ]).then(([complaintsResult, statsResult]) => {
      setResult(complaintsResult);
      setStats(statsResult);
      setIsLoading(false);
    });
  }, [page, filters]);

  useEffect(() => {
    load();
  }, [load]);

  const updateFilters = useCallback((partial) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    setPage(1);
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
    page,
    setPage,
    result,
    stats,
    isLoading,
    refresh: load,
  };
}
