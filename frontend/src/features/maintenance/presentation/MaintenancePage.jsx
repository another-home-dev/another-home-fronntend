import { useState } from "react";
import { ClipboardList, Clock, Loader2, CheckCircle2, RefreshCw, Download, SearchX } from "lucide-react";
import PageHeader from "@shared/components/PageHeader";
import { Card } from "@shared/components/Card";
import StatCard from "@shared/components/StatCard";
import Button from "@shared/components/Button";
import EmptyState from "@shared/components/EmptyState";
import { useComplaintsData } from "@features/maintenance/presentation/hooks/useComplaintsData";
import ComplaintFilters from "@features/maintenance/presentation/components/ComplaintFilters";
import ComplaintsTable from "@features/maintenance/presentation/components/ComplaintsTable";
import ComplaintsTableSkeleton from "@features/maintenance/presentation/components/ComplaintsTableSkeleton";
import Pagination from "@/shared/components/Pagination";
import ComplaintDetailsModal from "@features/maintenance/presentation/components/ComplaintDetailsModal";

export default function MaintenancePage() {
  const { filters, updateFilters, resetFilters, page, setPage, result, stats, isLoading, refresh } = useComplaintsData();
  const [viewingComplaint, setViewingComplaint] = useState(null);

  const hasResults = result.data.length > 0;

  return (
    <div>
      <PageHeader
        title="Maintenance Complaints"
        subtitle="Monitor and manage all maintenance requests submitted by students."
        action={
          <div className="flex gap-2.5">
            <Button variant="outline" icon={RefreshCw} onClick={refresh} loading={isLoading}>
              Refresh
            </Button>
            <Button variant="secondary" icon={Download}>
              Export
            </Button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Complaints" value={stats.total} icon={ClipboardList} tone="primary" />
        <StatCard label="Pending" value={stats.pending} icon={Clock} tone="warning" />
        <StatCard label="In Progress" value={stats.inProgress} icon={Loader2} tone="info" />
        <StatCard label="Resolved" value={stats.resolved} icon={CheckCircle2} tone="success" />
      </div>

      <ComplaintFilters filters={filters} onChange={updateFilters} onReset={resetFilters} />

      <Card>
        {isLoading ? (
          <ComplaintsTableSkeleton />
        ) : !hasResults ? (
          <EmptyState
            icon={SearchX}
            message="No maintenance complaints found."
            description="Try adjusting your search or filters."
            action={
              <Button variant="outline" onClick={resetFilters} className="mt-2">
                Reset Filters
              </Button>
            }
          />
        ) : (
          <>
            <ComplaintsTable complaints={result.data} onView={setViewingComplaint} />
            <Pagination
              currentPage={result.currentPage}
              totalPages={result.totalPages}
              totalRecords={result.totalRecords}
              pageSize={result.pageSize}
              onPageChange={setPage}
              label="complaints"
            />
          </>
        )}
      </Card>

      <ComplaintDetailsModal open={Boolean(viewingComplaint)} complaint={viewingComplaint} onClose={() => setViewingComplaint(null)} />
    </div>
  );
}
